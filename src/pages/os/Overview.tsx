import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Server, FolderLock, BookOpen, Loader2 } from "lucide-react";

export default function Overview() {
  const [email, setEmail] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({ leads: 0, vault: 0, intel: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Get User
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? null);
      }

      // Fetch Metrics in parallel
      try {
        // Vault requires recursive listing if folders are deep, but for dashboard a flat approximation is fine.
        // Or we could list root and folders.
        // Actually .list without arguments only lists root, but that's fine for an overview.
        const [
          { count: leadsCount },
          { data: vaultData },
          { count: intelCount }
        ] = await Promise.all([
          supabase.from("kanban_cards").select("*", { count: "exact", head: true }),
          supabase.storage.from("vanguard-vault").list(),
          supabase.from("vanguard_notes").select("*", { count: "exact", head: true })
        ]);

        const validFiles = (vaultData || []).filter(
          (f) => f.name !== ".emptyFolderPlaceholder" && f.name !== ".keep"
        );

        setMetrics({
          leads: leadsCount || 0,
          vault: validFiles.length || 0,
          intel: intelCount || 0
        });
      } catch (error) {
        console.error("Failed to load metrics", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getDisplayName = () => {
    if (!email) return "Operator";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col text-white">
      <header className="mb-10 flex-none">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-2">
          Overview
        </h1>
        <p className="text-slate-400 font-mono text-sm max-w-xl uppercase tracking-widest">
          Welcome back, <span className="text-cyan-400 font-bold">{getDisplayName()}</span>. 
          System parameters are nominal. All core routines operational.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 auto-rows-max">
        {/* Box 1: CRM Leads */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-colors shadow-lg">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-cyan-500">
            <Server className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-cyan-500" />
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Active CRM Leads
              </h2>
            </div>
            <div className="mt-8 mb-2">
              {loading ? (
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
              ) : (
                <div className="text-6xl font-bold text-white tracking-widest">{metrics.leads}</div>
              )}
            </div>
            <p className="text-sm text-slate-500 font-mono tracking-widest uppercase mt-auto">
              Live Pipeline Sync
            </p>
          </div>
        </div>

        {/* Box 2: Vault */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-colors shadow-lg">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-500">
            <FolderLock className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <FolderLock className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Vault Documents Secured
              </h2>
            </div>
            <div className="mt-8 mb-2">
              {loading ? (
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              ) : (
                <div className="text-6xl font-bold text-white tracking-widest">{metrics.vault}</div>
              )}
            </div>
            <p className="text-sm text-slate-500 font-mono tracking-widest uppercase mt-auto">
              AES-256 Encrypted
            </p>
          </div>
        </div>

        {/* Box 3: Intel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-colors shadow-lg">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-amber-500">
            <BookOpen className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Vanguard Intel Entries
              </h2>
            </div>
            <div className="mt-8 mb-2">
              {loading ? (
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
              ) : (
                <div className="text-6xl font-bold text-white tracking-widest">{metrics.intel}</div>
              )}
            </div>
            <p className="text-sm text-slate-500 font-mono tracking-widest uppercase mt-auto">
              Global & Private Strategies
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
