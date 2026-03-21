import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import VanguardSidebar from "./VanguardSidebar";
import { Menu, X } from "lucide-react";

export default function VanguardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-slate-900 text-slate-300 font-mono flex flex-col overflow-hidden relative">
      
      {/* Mobile-only Top Navigation */}
      <div className="md:hidden flex-none z-40 w-full border-b border-white/10 bg-slate-900 h-14 flex items-center justify-between px-4 shadow-sm shadow-black/50">
        <Link to="/vanguard/overview" className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <div className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" />
          </div>
          <span className="font-bold text-white tracking-widest text-xs uppercase">
            Vanguard
          </span>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Top Bar - Hidden on Mobile */}
      <header className="hidden md:flex flex-none z-30 w-full border-b border-white/10 bg-slate-900 shadow-sm shadow-black/50">
        <div className="px-6 h-14 w-full flex items-center justify-between">
          <Link to="/vanguard/overview" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <div className="w-3 h-3 rounded-sm bg-cyan-400 animate-pulse" />
            </div>
            <span className="font-bold text-white tracking-widest text-sm uppercase">
              Vanguard
            </span>
          </Link>
          
          {/* Header right section placeholder – Command Locked banner removed */}
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Sliding Sidebar Container */}
          <div className="relative w-64 h-full bg-slate-900 shadow-[20px_0_50px_rgba(0,0,0,0.5)] border-r border-white/10 flex flex-col pointer-events-auto transform transition-transform animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors z-50"
            >
              <X className="w-4 h-4" />
            </button>
            <VanguardSidebar />
          </div>
        </div>
      )}
      
      {/* Main Content Area - Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block flex-none z-20">
          <VanguardSidebar />
        </div>
        
        {/* Independently Scrolling Content */}
        <main className="flex-1 w-full h-full overflow-hidden flex flex-col bg-slate-900 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
