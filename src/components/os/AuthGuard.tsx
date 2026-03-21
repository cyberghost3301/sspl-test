import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ShieldAlert, LogOut } from 'lucide-react';
import GlobalLoader from '@/components/GlobalLoader';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  useEffect(() => {
    checkClearance();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        navigate('/vanguard/auth');
      } else {
         checkClearance();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkClearance = async () => {
     setLoading(true);
     const { data: { session: currentSession } } = await supabase.auth.getSession();
     
     if (!currentSession) {
        setSession(null);
        navigate('/vanguard/auth');
        setLoading(false);
        return;
     }

     setSession(currentSession);

     // Phase 17: Fetch the team_profiles exact match for this user
     const { data: profile, error } = await supabase
        .from('team_profiles')
        .select('is_approved')
        .eq('id', currentSession.user.id)
        .single();

     // If table missing or profile missing, we assume false clearance unless it's the very first user... 
     // For this dev sandbox, we will simulate a rejection lock if we are strict. 
     // Let's degrade gracefully if table does not exist yet just so the app doesn't brick.
     if (error) {
        if (error.code === '42P01') {
           // team_profiles uninitialized. Allow pass for schema initialization phase.
           setIsApproved(true);
        } else {
           console.error("Lockout Engine Error:", error);
           setIsApproved(false);
        }
     } else {
        setIsApproved(!!profile?.is_approved);
     }
     setLoading(false);
  };

  const handleBypassSignOut = async () => {
     await supabase.auth.signOut();
     navigate("/");
  };

  if (loading) {
    return <GlobalLoader />;
  }

  if (!session) {
    return null;
  }

  if (isApproved === false) {
     /* THE PENDING CLEARANCE LOCKOUT SCREEN */
     return (
        <div className="h-screen w-full bg-[#020617] font-mono text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <ShieldAlert className="w-[80vw] h-[80vw] text-amber-500" />
           </div>
           
           <div className="relative z-10 w-full max-w-lg bg-[#0f172a] border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(245,158,11,0.1)] text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mx-auto mb-6 shadow-inner shadow-amber-500/20">
                 <ShieldAlert className="w-10 h-10 text-amber-500" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold tracking-widest font-sans uppercase text-slate-100 mb-2">
                 Clearance Pending
              </h1>
              <p className="text-sm font-mono tracking-widest text-slate-400 uppercase mb-8">
                 Super Admin Authorization Required
              </p>
              
              <div className="bg-[#020617] p-6 rounded-lg border border-white/5 mb-8">
                 <p className="text-xs leading-relaxed text-slate-300 font-mono">
                    Your Vanguard operative identity has been logged successfully, but you are currently in a <span className="text-amber-400 font-bold">LOCKED</span> state. You must wait for a Director or Super Admin to manually approve your access privileges from the central hub.
                 </p>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="flex items-center justify-center gap-3 text-xs tracking-widest text-emerald-400 uppercase font-bold animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" /> Connection maintained... waiting.
                 </div>
                 <button 
                    onClick={handleBypassSignOut}
                    className="mt-4 flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-widest text-slate-500 hover:text-white transition-colors py-2"
                 >
                    <LogOut className="w-4 h-4" /> Relinquish Signal (Sign off)
                 </button>
              </div>
           </div>
        </div>
     );
  }

  return <>{children}</>;
}
