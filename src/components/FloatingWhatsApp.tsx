import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919250974145"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("Chat with a Principal", "floating_whatsapp")}
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md hover:bg-emerald-500/30 hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
    >
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-400" />

      {/* WhatsApp Colored SVG Logo */}
      <img
        src="https://cdn.simpleicons.org/whatsapp/25D366"
        alt="WhatsApp"
        className="w-7 h-7 object-contain drop-shadow-md relative z-10"
      />

      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
        Chat with a Principal
      </div>
    </a>
  );
}
