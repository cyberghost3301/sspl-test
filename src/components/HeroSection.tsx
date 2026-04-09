import React from "react";
import { m as motion } from "framer-motion";
import { Phone, Sparkles, CheckCircle } from "lucide-react";
import { useScopingEngine } from "@/hooks/useScopingEngine";

export default function HeroSection() {
  const { triggerScopingEngine } = useScopingEngine();

  return (
    <div className="relative w-full overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none z-0" 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4"
      ></video>
      <section className="relative z-10 min-h-[100dvh] flex flex-col justify-center pt-8 md:pt-28 lg:pt-32 pb-16 overflow-hidden bg-transparent">
        {/* 4rem grid overlay — structural depth */}
        <div
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />

        {/* Asymmetric blue radial glow — drift feel, off-center top-right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 70% 20%, rgba(0,180,255,0.12), transparent)" }}
        />
        {/* Amber warmth trace — bottom-left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 40% at 20% 85%, rgba(255,140,0,0.08), transparent)" }}
        />

        <div className="section-container relative z-10 py-32 lg:py-0">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center -mt-16 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent tracking-wide">Lucknow's Trusted Technology Partner</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-xs md:text-sm font-bold tracking-[0.2em] text-white/50 uppercase mb-6 block text-center"
            >
              ENGINEERED INFRASTRUCTURE. BUILT FOR SCALE.
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Infrastructure that doesn't{" "}
              <span className="text-gradient">fail when it matters.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed text-center"
            >
              We design and deploy infrastructure that supports real operations, scales with your business, and doesn't fail when it matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
            >
              {/* Primary Scoping Engine Button */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px var(--sc-teal-glow)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={triggerScopingEngine}
                className="bg-sc-teal text-[#05070A] border-none px-8 py-4 rounded-lg font-bold tracking-wide text-base shadow-[0_0_20px_rgba(0,212,200,0.2)] w-full sm:w-auto"
              >
                Get Expert Advice
              </motion.button>

              {/* Ghost WhatsApp Link */}
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(37,211,102,0)", "0 0 16px rgba(37,211,102,0.25)", "0 0 0px rgba(37,211,102,0)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
                className="rounded-full"
              >
                <a
                  href="https://wa.me/919250974145?text=Hi%20Spirecrest%2C%20I%27d%20like%20to%20assess%20my%20infrastructure%20risk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium text-white hover:text-[#25D366] transition-colors group border border-white/5"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#25D366] group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Ticker */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10 border-t border-white/[0.05] pt-8">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sc-text-muted uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-sc-teal" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sc-text-muted uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-sc-teal" />
                <span>ISO 27001 Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sc-text-muted uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-sc-teal" />
                <span>₹0 Downtime SLA</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sc-text-muted uppercase">
                <CheckCircle className="w-3.5 h-3.5 text-sc-teal" />
                <span>10+ Enterprise Clients</span>
              </div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "9000+", label: "Projects Delivered" },
                { value: "19+", label: "Expert Partners" },
                { value: "12", label: "Service Verticals" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                  <p className="text-xs mt-1" style={{ color: "hsl(var(--on-dark-muted))" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Scale signal below stats */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-sm text-white/40 tracking-wide text-center mt-8 block"
            >
              Systems supporting operations across multiple business environments
            </motion.span>
          </div>
        </div>
      </section>
    </div>
  );
}
