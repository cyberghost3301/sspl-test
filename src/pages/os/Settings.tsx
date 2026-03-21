import { useState, useEffect } from "react";
import { ShieldAlert, Users, Loader2, CheckCircle2, UserCog, Key, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface TeamProfile {
  id: string; // The user's UUID from auth.users
  email: string;
  role: "operator" | "director" | "super_admin";
  is_approved: boolean;
  created_at: string;
}

export default function SettingsHub() {
  const [profiles, setProfiles] = useState<TeamProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Profile section state
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      // Pre-populate full name from team_profiles for the current user
      const { data: profileRow } = await supabase
        .from("team_profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      if (profileRow?.full_name) setFullName(profileRow.full_name);
    }

    const { data, error } = await supabase
      .from("team_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
       // Graceful UI fallback if run before migrations
       if (error.code === '42P01') {
           toast.info("team_profiles table missing. Initializing secure mock environment.");
           setProfiles([
              { id: "mock-1", email: "director@spirecrest.local", role: "super_admin", is_approved: true, created_at: new Date().toISOString() },
              { id: "mock-2", email: "newhire@spirecrest.local", role: "operator", is_approved: false, created_at: new Date().toISOString() }
           ]);
       } else {
           toast.error(`Fetch error: ${error.message}`);
       }
    } else {
       setProfiles(data || []);
    }
    setLoading(false);
  };

  const updateProfileStatus = async (id: string, isApproved: boolean) => {
    const toastId = toast.loading(isApproved ? "Authorizing operative..." : "Revoking clearance...");
    const { error } = await supabase
      .from("team_profiles")
      .update({ is_approved: isApproved })
      .eq("id", id);
      
    if (error) {
       toast.error(`Clearance operation failed: ${error.message}`, { id: toastId });
       return;
    }
    
    toast.success("Security clearance verified and updated.", { id: toastId });
    setProfiles(profiles.map(p => p.id === id ? { ...p, is_approved: isApproved } : p));
  };

  const updateProfileRole = async (id: string, newRole: "operator" | "director" | "super_admin") => {
    const toastId = toast.loading("Reassigning tactical role...");
    const { error } = await supabase
      .from("team_profiles")
      .update({ role: newRole })
      .eq("id", id);
      
    if (error) {
       toast.error(`Reassignment failed: ${error.message}`, { id: toastId });
       return;
    }
    
    toast.success(`Role reassigned to ${newRole.toUpperCase()}.`, { id: toastId });
    setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match. Please re-enter.");
    setIsUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(`Password update failed: ${error.message}`);
    else {
      toast.success("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsUpdating(false);
  };

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col text-white font-mono overflow-y-auto custom-scrollbar bg-slate-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-widest text-slate-100 font-sans">
          SECURITY &amp; SETTINGS HUB
        </h1>
        <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
          Vanguard RBAC &amp; Clearances Engine
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 mb-6 max-w-5xl">
        <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400 mb-5">
          <User className="w-4 h-4" /> Profile &amp; Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Full Name</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your display name"
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600 mb-2"
            />
            <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Confirm New Password</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className={`flex-1 bg-slate-900 border rounded-lg px-4 py-2.5 text-white focus:outline-none text-sm font-mono placeholder:text-slate-600 transition-colors ${
                  confirmPassword && confirmPassword !== newPassword
                    ? 'border-red-500/50 focus:border-red-500/70'
                    : confirmPassword && confirmPassword === newPassword
                    ? 'border-emerald-500/50'
                    : 'border-white/10 focus:border-cyan-500'
                }`}
              />
              <button
                onClick={handleUpdatePassword}
                disabled={isUpdating || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                Update
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-[11px] text-red-400 font-mono mt-1">Passwords do not match.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex-1 max-w-5xl">
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
           <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400">
             <UserCog className="w-5 h-5" /> Access Management Log
           </h2>
           <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Authorize or lock down structural access to the Vanguard OS instance.</p>
        </div>
        
        <div className="flex-1 overflow-x-auto p-6 custom-scrollbar">
           {loading ? (
              <div className="flex items-center justify-center h-48">
                 <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
              </div>
           ) : profiles.length === 0 ? (
              <div className="text-center p-10 py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
                 <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">No intelligence operatives found in sector.</p>
              </div>
           ) : (
              <div className="min-w-[800px]">
                 <div className="grid grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-4 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                    <div className="col-span-4">Operative Identity</div>
                    <div className="col-span-3">Assigned Role</div>
                    <div className="col-span-3">Clearance Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                 </div>
                 
                 <div className="space-y-3">
                    {profiles.map(profile => (
                       <div key={profile.id} className="grid grid-cols-12 gap-4 bg-[#020617] border border-white/5 hover:border-cyan-500/30 transition-colors rounded-xl p-4 items-center shadow-lg group">
                          {/* Identity */}
                          <div className="col-span-4 flex items-center gap-3">
                             <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-none">
                                <Users className="w-4 h-4 text-slate-400" />
                             </div>
                             <div className="truncate pr-2">
                                <span className="text-sm font-semibold text-slate-200 block truncate">{profile.email}</span>
                                <span className="text-[10px] text-slate-500 block truncate">ID: {profile.id.substring(0, 8)}...</span>
                             </div>
                          </div>
                          
                          {/* Role Selector */}
                          <div className="col-span-3">
                             <select
                                disabled={profile.id === currentUserId}
                                value={profile.role}
                                onChange={(e) => updateProfileRole(profile.id, e.target.value as any)}
                                className="appearance-none bg-white/[0.03] border border-white/10 text-white focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs font-bold tracking-widest uppercase outline-none cursor-pointer hover:bg-white/[0.05] transition-colors w-full focus:ring-1 focus:ring-cyan-500"
                              >
                                <option value="operator" className="bg-[#0f172a]">Operator</option>
                                <option value="director" className="bg-[#0f172a]">Director</option>
                                <option value="super_admin" className="bg-[#0f172a] text-amber-500">Super Admin</option>
                              </select>
                          </div>
                          
                          {/* Clearance Status Label */}
                          <div className="col-span-3 flex items-center gap-2">
                             {profile.is_approved ? (
                                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase rounded flex items-center gap-1.5">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Authorized
                                </span>
                             ) : (
                                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                   <ShieldAlert className="w-3 h-3" /> Pending Review
                                </span>
                             )}
                          </div>
                          
                          {/* Actions */}
                          <div className="col-span-2 flex justify-end">
                             {profile.id === currentUserId ? (
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest border border-slate-700/50 py-1 px-2.5 rounded">Active User</span>
                             ) : profile.is_approved ? (
                                <button
                                   onClick={() => updateProfileStatus(profile.id, false)}
                                   className="text-[10px] font-bold tracking-widest border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors uppercase py-1.5 px-3 rounded"
                                >
                                   Revoke Access
                                </button>
                             ) : (
                                <button
                                   onClick={() => updateProfileStatus(profile.id, true)}
                                   className="text-[10px] font-bold tracking-widest bg-cyan-600 border border-cyan-400 text-white transition-colors uppercase py-1.5 px-3 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:bg-cyan-500 flex items-center gap-1.5"
                                >
                                   <CheckCircle2 className="w-3 h-3" /> Execute Approval
                                </button>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
