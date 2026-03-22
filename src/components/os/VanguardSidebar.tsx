import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Kanban, FolderLock, Users, Settings, BookOpen, LogOut, PanelLeftClose, PanelLeftOpen, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────
type Permissions = Record<string, Record<string, boolean>> | null;

// ── Nav item definitions (no minRole — Matrix is the sole gatekeeper) ─────
const BASE_NAV = [
  { name: "Overview",        path: "/vanguard/overview",     icon: LayoutDashboard },
  { name: "Kanban Boards",   path: "/vanguard/boards",       icon: Kanban          },
  { name: "The Vault",       path: "/vanguard/vault",        icon: FolderLock      },
  { name: "Vanguard Intel",  path: "/vanguard/intel",        icon: BookOpen        },
  { name: "Directory",       path: "/vanguard/directory",    icon: Users           },
  // Matrix-gated routes:
  { name: "Web Content",     path: "/vanguard/web-content",  icon: Globe,   matrixKey: "web_content",  matrixPerm: "view"          },
  { name: "Settings",        path: "/vanguard/settings",     icon: Settings, matrixKey: "settings",    matrixPerm: "manage_users"  },
];

// Helper: returns true if a nav item should be shown for this user
function canSeeItem(
  item: typeof BASE_NAV[number],
  role: string,
  permissions: Permissions
): boolean {
  // super_admin sees everything — no Matrix check needed
  if (role === "super_admin") return true;

  // Items without a matrixKey are always visible (base modules)
  if (!("matrixKey" in item) || !item.matrixKey) return true;

  // Matrix-gated: check the explicit permission flag
  const perm = (item as any).matrixPerm as string;
  return permissions?.[item.matrixKey]?.[perm] === true;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function VanguardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string>("operator");
  const [permissions, setPermissions] = useState<Permissions>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("team_profiles")
        .select("role, permissions")
        .eq("id", user.id)
        .single();
      if (data?.role) setUserRole(data.role);
      if (data?.permissions) setPermissions(data.permissions as Permissions);
    };
    fetchProfile();
  }, []);

  // The Matrix is the single source of truth for which nav links appear
  const navItems = BASE_NAV.filter((item) => canSeeItem(item, userRole, permissions));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Session terminated securely.");
    navigate("/");
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-white/10 bg-slate-800 h-full flex flex-col transition-all duration-300 relative z-50`}>
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Core Systems
          </h2>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-500 hover:text-cyan-400 transition-colors bg-white/[0.02] rounded-lg p-1.5 border border-white/5 hover:border-cyan-500/30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      <div className={`px-4 flex-1 ${isCollapsed ? 'items-center' : ''}`}>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center rounded-lg transition-all font-mono text-sm ${
                  isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                } ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCollapsed ? 'flex-none' : ''}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`p-4 border-t border-white/5 space-y-3 mt-auto ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        {/* Connection Status */}
        <div className={`flex items-center rounded-lg bg-white/[0.02] border border-white/5 ${
          isCollapsed ? 'justify-center p-3' : 'gap-3 p-3'
        }`}>
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse flex-none" />
          {!isCollapsed && <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase truncate">Online</span>}
        </div>

        {/* Secure Exit */}
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Secure Exit" : undefined}
          className={`w-full flex items-center rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors font-mono text-sm border border-transparent hover:border-red-400/10 ${
            isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
          }`}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? 'flex-none' : ''}`} />
          {!isCollapsed && <span className="truncate">Secure Exit</span>}
        </button>
      </div>
    </aside>
  );
}
