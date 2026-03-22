import { useState, useEffect } from "react";
import { ShieldAlert, Users, Loader2, CheckCircle2, UserCog, Key, User, Activity, Clock, Settings2, X, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// ── PERMISSION DEFINITION ────────────────────────────────────────────────
const PERMISSION_MODULES = [
  {
    key: "intel",
    label: "Intel & Vault",
    icon: "🧠",
    perms: [
      { key: "read_global",   label: "Read Global Notes" },
      { key: "create",        label: "Create Notes" },
      { key: "edit_global",   label: "Edit Global Notes" },
      { key: "delete_global", label: "Delete Global Notes" },
    ],
  },
  {
    key: "web_content",
    label: "Web Content",
    icon: "🌐",
    perms: [
      { key: "view",    label: "View Module" },
      { key: "publish", label: "Publish" },
      { key: "edit",    label: "Edit" },
      { key: "delete",  label: "Delete" },
    ],
  },
  {
    key: "directory",
    label: "Directory",
    icon: "📂",
    perms: [
      { key: "view",   label: "View" },
      { key: "add",    label: "Add" },
      { key: "edit",   label: "Edit" },
      { key: "delete", label: "Delete" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: "⚙️",
    perms: [
      { key: "view_audit_logs", label: "View Audit Logs" },
      { key: "manage_users",    label: "Manage Users" },
    ],
  },
];

interface TeamProfile {
  id: string;
  email: string;
  role: "operator" | "director" | "super_admin";
  is_approved: boolean;
  created_at: string;
  permissions: Record<string, Record<string, boolean>> | null;
}

type Tab = "profile" | "team_matrix" | "activity_logs";

// ── PERMISSIONS MATRIX MODAL ─────────────────────────────────────────────
function PermissionsMatrixModal({
  profile,
  onClose,
  onSave,
}: {
  profile: TeamProfile;
  onClose: () => void;
  onSave: (updated: TeamProfile) => void;
}) {
  const [perms, setPerms] = useState<Record<string, Record<string, boolean>>>(
    profile.permissions ?? {}
  );
  const [saving, setSaving] = useState(false);

  const toggle = (module: string, perm: string) => {
    setPerms(prev => ({
      ...prev,
      [module]: {
        ...(prev[module] ?? {}),
        [perm]: !(prev[module]?.[perm] ?? false),
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("team_profiles")
      .update({ permissions: perms })
      .eq("id", profile.id);

    if (error) {
      toast.error(`Matrix save failed: ${error.message}`);
    } else {
      toast.success("Permissions matrix updated.");
      onSave({ ...profile, permissions: perms });
      onClose();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-10 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-cyan-400 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Permissions Matrix
            </h2>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate max-w-xs">{profile.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-[500px] overflow-y-auto custom-scrollbar space-y-5">
          {PERMISSION_MODULES.map(mod => (
            <div key={mod.key} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-300 mb-3">
                {mod.icon} {mod.label}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {mod.perms.map(p => {
                  const checked = perms[mod.key]?.[p.key] ?? false;
                  return (
                    <label
                      key={p.key}
                      onClick={() => toggle(mod.key, p.key)}
                      className={`flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-lg border transition-colors select-none ${
                        checked
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                          : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-none transition-colors ${
                          checked ? "bg-cyan-500 border-cyan-400" : "bg-transparent border-slate-600"
                        }`}
                      >
                        {checked && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[11px] font-mono tracking-wider">{p.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 flex justify-end gap-3">
          <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors px-4 py-2 border border-white/10 rounded-lg hover:border-white/20">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            Save Matrix
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function SettingsHub() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profiles, setProfiles] = useState<TeamProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  // Profile tab state
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  // Activity logs tab state
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // Matrix modal state
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<TeamProfile | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      const { data: profileRow } = await supabase
        .from("team_profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();
      if (profileRow?.full_name) setFullName(profileRow.full_name);
      if (profileRow?.role) {
        setCurrentUserRole(profileRow.role);
        fetchLogs(profileRow.role, user.id);
      }
    }

    const { data, error } = await supabase
      .from("team_profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .order("full_name", { ascending: true });

    if (error) {
      if (error.code === '42P01') {
        toast.info("team_profiles table missing. Initializing secure mock environment.");
        setProfiles([
          { id: "mock-1", email: "director@spirecrest.local", role: "super_admin", is_approved: true, created_at: new Date().toISOString(), permissions: null },
          { id: "mock-2", email: "newhire@spirecrest.local", role: "operator", is_approved: false, created_at: new Date().toISOString(), permissions: null }
        ]);
      } else {
        toast.error(`Fetch error: ${error.message}`);
      }
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  // ── PERSONALIZED LOGS ─────────────────────────────────────────────────
  const fetchLogs = async (role: string, uid: string) => {
    setLogsLoading(true);
    let query = supabase
      .from('vanguard_activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (role === 'super_admin') {
      // Overlord sees all — no filter
    } else {
      // Directors and operators see only their own timeline
      query = query.eq('user_id', uid);
    }

    const { data, error } = await query;
    if (!error && data) setLogs(data);
    setLogsLoading(false);
  };

  const handleRefreshLogs = () => {
    if (currentUserRole && currentUserId) fetchLogs(currentUserRole, currentUserId);
  };

  const updateProfileStatus = async (id: string, isApproved: boolean) => {
    const toastId = toast.loading(isApproved ? "Authorizing operative..." : "Revoking clearance...");
    const { error } = await supabase.from("team_profiles").update({ is_approved: isApproved }).eq("id", id);
    if (error) { toast.error(`Clearance operation failed: ${error.message}`, { id: toastId }); return; }
    toast.success("Security clearance updated.", { id: toastId });
    setProfiles(profiles.map(p => p.id === id ? { ...p, is_approved: isApproved } : p));
  };

  const updateProfileRole = async (id: string, newRole: "operator" | "director" | "super_admin") => {
    const toastId = toast.loading("Reassigning tactical role...");
    const { error } = await supabase.from("team_profiles").update({ role: newRole }).eq("id", id);
    if (error) { toast.error(`Reassignment failed: ${error.message}`, { id: toastId }); return; }
    toast.success(`Role reassigned to ${newRole.toUpperCase()}.`, { id: toastId });
    setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match. Please re-enter.");
    setIsUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) toast.error(`Password update failed: ${error.message}`);
    else { toast.success("Password updated successfully."); setNewPassword(""); setConfirmPassword(""); }
    setIsUpdating(false);
  };

  const handleUpdateName = async () => {
    if (!currentUserId || !fullName.trim()) return toast.error("Name cannot be empty.");
    setIsUpdatingName(true);
    const toastId = toast.loading("Updating operative profile...");
    const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName.trim() } });
    if (authError) { setIsUpdatingName(false); return toast.error(`Auth update failed: ${authError.message}`, { id: toastId }); }
    const { error: dbError } = await supabase.from('team_profiles').update({ full_name: fullName.trim() }).eq('id', currentUserId);
    setIsUpdatingName(false);
    if (dbError) toast.error(`Public profile update failed: ${dbError.message}`, { id: toastId });
    else toast.success("Operative profile updated successfully.", { id: toastId });
  };

  // ── TAB DEFINITIONS ───────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { id: "profile",       label: "Profile Settings", icon: <User className="w-3.5 h-3.5" /> },
    { id: "team_matrix",   label: "Team Matrix",      icon: <Shield className="w-3.5 h-3.5" />, adminOnly: true },
    { id: "activity_logs", label: "Activity Logs",    icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  const visibleTabs = tabs.filter(t => !t.adminOnly || currentUserRole === 'super_admin');

  // ── LOG ACTION COLOR ─────────────────────────────────────────────────
  const actionColor = (action: string) =>
    action === 'DELETED' ? 'text-red-400 border-red-500/20 bg-red-500/[0.04]'
    : action === 'CREATED' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.04]'
    : action === 'UPDATED' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.04]'
    : 'text-slate-400 border-white/10 bg-white/[0.02]';

  return (
    <div className="w-full h-full flex flex-col text-white font-mono bg-slate-900 overflow-hidden">

      {/* Matrix Modal */}
      {matrixOpen && editingProfile && (
        <PermissionsMatrixModal
          profile={editingProfile}
          onClose={() => { setMatrixOpen(false); setEditingProfile(null); }}
          onSave={(updated) => setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p))}
        />
      )}

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <div className="flex-none px-6 pt-6 pb-0 border-b border-white/10">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-widest text-slate-100 font-sans uppercase">Security & Settings</h1>
          <p className="text-slate-500 font-mono text-xs tracking-widest uppercase mt-1">Vanguard RBAC & Clearances Engine</p>
        </div>

        {/* ── TABS ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">

        {/* ════════════════════════════════════════ PROFILE TAB ════════ */}
        {activeTab === "profile" && (
          <div className="max-w-2xl space-y-6">
            {/* Full Name */}
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400 mb-5">
                <User className="w-4 h-4" /> Operative Identity
              </h2>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Display Name</label>
                <div className="flex gap-2">
                  <input
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Your display name"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600"
                  />
                  <button
                    onClick={handleUpdateName}
                    disabled={isUpdatingName || !fullName.trim()}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-40 whitespace-nowrap"
                  >
                    {isUpdatingName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCog className="w-3.5 h-3.5" />}
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400 mb-5">
                <Key className="w-4 h-4" /> Authentication Key
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600"
                  />
                </div>
                <div>
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
                      className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors disabled:opacity-40 whitespace-nowrap"
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

            {/* Role Badge */}
            {currentUserRole && (
              <div className="bg-slate-800/50 border border-white/5 rounded-xl px-5 py-4 flex items-center gap-3">
                <Shield className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Clearance Level</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-200 mt-0.5">
                    {currentUserRole === 'super_admin' ? '★ Overlord / Super Admin' : currentUserRole === 'director' ? 'Director' : 'Operator'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════ TEAM MATRIX TAB ═════ */}
        {activeTab === "team_matrix" && currentUserRole === 'super_admin' && (
          <div className="flex flex-col bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400">
                <UserCog className="w-5 h-5" /> Access Management Log
              </h2>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Authorize or lock down structural access to the Vanguard OS instance.</p>
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
                <div className="min-w-[900px]">
                  <div className="grid grid-cols-12 gap-4 pb-3 border-b border-white/10 mb-4 px-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                    <div className="col-span-3">Operative Identity</div>
                    <div className="col-span-2">Assigned Role</div>
                    <div className="col-span-2">Matrix</div>
                    <div className="col-span-3">Clearance Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  <div className="space-y-3">
                    {profiles.map(profile => {
                      const isFounder = profile.email === 'spirecrestindia@gmail.com';
                      return (
                        <div key={profile.id} className={`grid grid-cols-12 gap-4 border transition-colors rounded-xl p-4 items-center shadow-lg group ${isFounder ? 'bg-amber-500/[0.03] border-amber-500/20' : 'bg-[#020617] border-white/5 hover:border-cyan-500/30'}`}>
                          <div className="col-span-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-none">
                              <Users className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="truncate pr-2">
                              <span className="text-sm font-semibold text-slate-200 block truncate">{profile.email}</span>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {isFounder ? '★ Overlord — Immutable' : `ID: ${profile.id.substring(0, 8)}...`}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <select
                              disabled={profile.id === currentUserId || isFounder}
                              value={profile.role}
                              onChange={(e) => updateProfileRole(profile.id, e.target.value as any)}
                              className="appearance-none bg-white/[0.03] border border-white/10 text-white focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs font-bold tracking-widest uppercase outline-none cursor-pointer hover:bg-white/[0.05] transition-colors w-full focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <option value="operator" className="bg-[#0f172a]">Operator</option>
                              <option value="director" className="bg-[#0f172a]">Director</option>
                              <option value="super_admin" className="bg-[#0f172a] text-amber-500">Super Admin</option>
                            </select>
                          </div>

                          <div className="col-span-2">
                            {!isFounder ? (
                              <button
                                onClick={() => { setEditingProfile(profile); setMatrixOpen(true); }}
                                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-colors px-3 py-1.5 rounded-lg w-full justify-center"
                              >
                                <Settings2 className="w-3 h-3" /> Matrix
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-600 font-mono">—</span>
                            )}
                          </div>

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

                          <div className="col-span-2 flex justify-end">
                            {isFounder ? (
                              <span className="text-[10px] text-amber-500/60 font-bold uppercase tracking-widest border border-amber-500/20 py-1 px-2.5 rounded">Immutable</span>
                            ) : profile.id === currentUserId ? (
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════ ACTIVITY LOGS TAB ════ */}
        {activeTab === "activity_logs" && (
          <div className="flex flex-col bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 text-cyan-400">
                  <Activity className="w-5 h-5" />
                  {currentUserRole === 'super_admin' ? 'Global Activity Audit' : 'My Activity Timeline'}
                </h2>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">
                  {currentUserRole === 'super_admin'
                    ? 'System-wide event trail — last 100 events'
                    : 'Your personal Vanguard action history'}
                </p>
              </div>
              <button
                onClick={handleRefreshLogs}
                className="text-[10px] font-bold tracking-widest border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors uppercase py-1.5 px-3 rounded"
              >
                Refresh
              </button>
            </div>

            <div className="p-4 overflow-x-auto custom-scrollbar max-h-[calc(100vh-350px)] overflow-y-auto">
              {logsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/5 rounded-xl">
                  <Activity className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">No activity records found.</p>
                </div>
              ) : (
                <div className="space-y-1.5 min-w-[700px]">
                  {logs.map((log, i) => (
                    <div key={i} className={`grid grid-cols-12 gap-3 px-4 py-2.5 rounded-lg border font-mono text-[11px] items-center ${actionColor(log.action)}`}>
                      <div className="col-span-2 flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {log.created_at ? new Date(log.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}
                        </span>
                      </div>
                      {currentUserRole === 'super_admin' && (
                        <div className="col-span-3 truncate text-slate-300">{log.user_email ?? '—'}</div>
                      )}
                      <div className={`${currentUserRole === 'super_admin' ? 'col-span-1' : 'col-span-2'} font-bold uppercase tracking-widest`}>{log.action}</div>
                      <div className={`${currentUserRole === 'super_admin' ? 'col-span-2' : 'col-span-3'} text-slate-400 uppercase tracking-wider`}>{log.module}</div>
                      <div className={`${currentUserRole === 'super_admin' ? 'col-span-4' : 'col-span-5'} text-slate-500 truncate`} title={log.details}>{log.details}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
