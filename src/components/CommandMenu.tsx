import { Command } from "cmdk";
import { 
  Search, Monitor, Code, ShieldCheck, Users, Mail, Home, Info, Image, MessageSquare, 
  Briefcase, Zap, Network, Sun, Headphones, Palette, HelpCircle, FileText, Shield, Cookie, AlertTriangle 
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  const navigateTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
        onClick={() => setOpen(false)} 
      />
      <div className="relative w-full max-w-xl bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command label="Global Command Menu" className="w-full">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="h-5 w-5 text-white/40 mr-2" />
            <Command.Input 
              autoFocus 
              placeholder="Type a command or search..." 
              className="w-full bg-transparent py-4 text-sm outline-none text-white placeholder:text-white/40 font-display"
            />
          </div>
          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-white/40">No results found.</Command.Empty>

            <Command.Group heading="Main Pages" className="text-[10px] font-medium text-white/40 py-2 px-2 uppercase tracking-wider">
              <Command.Item onSelect={() => navigateTo("/")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Home className="h-4 w-4 mr-3 text-cyan-400" /> Home
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/about")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Info className="h-4 w-4 mr-3 text-emerald-400" /> About Us
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/portfolio")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Image className="h-4 w-4 mr-3 text-blue-400" /> Portfolio
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/testimonials")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <MessageSquare className="h-4 w-4 mr-3 text-indigo-400" /> Testimonials
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/collective")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Users className="h-4 w-4 mr-3 text-purple-400" /> Our Team / Collective
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/contact")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Mail className="h-4 w-4 mr-3 text-yellow-500" /> Contact Us
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Solutions & Services" className="text-[10px] font-medium text-white/40 py-2 px-2 uppercase tracking-wider">
              <Command.Item onSelect={() => navigateTo("/services/surveillance")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Monitor className="h-4 w-4 mr-3 text-cyan-400" /> Advanced Surveillance
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/software")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Code className="h-4 w-4 mr-3 text-emerald-400" /> Web-App & Software Dev
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/consulting")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <ShieldCheck className="h-4 w-4 mr-3 text-blue-400" /> IT Consulting & Cybersecurity
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/automation")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Zap className="h-4 w-4 mr-3 text-yellow-400" /> Smart Automation
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/networking")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Network className="h-4 w-4 mr-3 text-purple-400" /> Networking & Cloud
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/computers")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Monitor className="h-4 w-4 mr-3 text-slate-300" /> Computer Solutions
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/solar")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Sun className="h-4 w-4 mr-3 text-orange-400" /> Solar Power Systems
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/av-studio")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Headphones className="h-4 w-4 mr-3 text-pink-400" /> AV Studio
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/interior")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Palette className="h-4 w-4 mr-3 text-rose-400" /> Interior Design
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/services/lifecycle-consulting")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Briefcase className="h-4 w-4 mr-3 text-teal-400" /> Lifecycle & Venture Consulting
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Governance" className="text-[10px] font-medium text-white/40 py-2 px-2 uppercase tracking-wider">
              <Command.Item onSelect={() => navigateTo("/faq")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <HelpCircle className="h-4 w-4 mr-3 text-slate-400" /> FAQ
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/privacy-policy")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Shield className="h-4 w-4 mr-3 text-slate-400" /> Privacy Policy
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/terms-of-service")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <FileText className="h-4 w-4 mr-3 text-slate-400" /> Terms of Service
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/cookie-policy")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <Cookie className="h-4 w-4 mr-3 text-slate-400" /> Cookie Policy
              </Command.Item>
              <Command.Item onSelect={() => navigateTo("/disclaimer")} className="flex items-center px-4 py-2.5 cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md mb-0.5 aria-selected:bg-white/10 aria-selected:text-white transition-colors">
                <AlertTriangle className="h-4 w-4 mr-3 text-slate-400" /> Disclaimer
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
