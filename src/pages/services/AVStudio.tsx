import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Headphones, Video, Phone, Monitor, Mic,
  Speaker, Radio, Tv, PhoneCall, LucideIcon, ShieldCheck,
  Building2, Users, Camera, Lightbulb, Volume2, Film,
  Wifi, Server, Globe, Cpu, Layers, ArrowRight,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

/* ─────────────── Section 1: Enterprise Telecom ─────────────── */
const pbxFeatures = [
  { icon: Server, title: "Cloud PBX & VoIP", desc: "Hosted telephone systems with auto-attendant, IVR tree design, voicemail-to-email, and hunt groups with zero hardware on-premise.", specs: ["99.99% uptime SLA", "Unlimited extensions", "Softphone + desk phone support"] },
  { icon: Globe, title: "Call Centre Infrastructure", desc: "ACD routing, predictive dialers, skill-based queuing, and sentiment-driven analytics for high-volume contact centre operations.", specs: ["5,000+ seats deployed", "Omnichannel: Voice / Chat / WhatsApp", "CRM integration: Salesforce, Zoho, Freshdesk"] },
  { icon: Wifi, title: "SIP Trunking & PSTN Bridging", desc: "Enterprise-grade SIP trunks with DID number pools, call failover, codec optimization (G.711/G.729), and fraud protection.", specs: ["1,000+ concurrent channels", "National & international DID pools", "End-to-end call encryption (SRTP/TLS)"] },
  { icon: Cpu, title: "UCaaS Integration", desc: "Unified Communications as a Service tying together voice, video, messaging, and presence via Microsoft Teams Phone, Webex Calling, and custom deployments.", specs: ["Microsoft 365 / Teams direct routing", "Cisco Webex Calling", "Open-standard APIs (REST / Webhook)"] },
];

function EnterpriseTelecom() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="py-16 lg:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-widest mb-4">
          <Phone className="w-3.5 h-3.5" /> Section 01
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Enterprise Telecom.</h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">PBX, Cloud VoIP, and high-volume call centre infrastructure that scales without limits and never drops a call.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pbxFeatures.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }} className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <f.icon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
            <div className="space-y-1.5">
              {f.specs.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats strip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.45 }} className="mt-8 grid grid-cols-3 gap-4">
        {[
          { value: "5,000+", label: "Call Centre Seats" },
          { value: "99.99%", label: "Uptime SLA" },
          { value: "50+", label: "CRM Integrations" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-border bg-secondary/50 text-center">
            <p className="font-display text-2xl font-bold text-accent">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────── Section 2: Executive Environments ─────────────── */
const boardroomFeatures = [
  { title: "4K / 8K Large-Format Displays & LED Video Walls", detail: "Up to 220\" seamless LED walls, 4K laser projectors, and ultra-wide curved displays for impact." },
  { title: "Ceiling Microphone Arrays with Auto-Tracking", detail: "Shure MXA910, Sennheiser TeamConnect with adaptive beamforming that focuses on the speaker, not the room." },
  { title: "Wireless BYOD Content Sharing", detail: "AirPlay, Miracast, USB-C, and Barco ClickShare for instant content sharing from any device." },
  { title: "Directional Acoustics & Sound Masking", detail: "Acoustic panel engineering plus white-noise masking for executive speech privacy and clarity." },
  { title: "Centralized AV Control (Crestron / Extron)", detail: "One-touch meeting launch, occupancy automation, and multi-room AV orchestration from a single pane." },
  { title: "Room Booking & Calendar Integration", detail: "Outlook / Google Workspace panels with real-time room status, occupancy sensors, and utilization analytics." },
];

function ExecutiveEnvironments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="py-16 lg:py-24 border-t border-border">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-widest mb-4">
          <Monitor className="w-3.5 h-3.5" /> Section 02
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Executive Environments.</h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">Integrated boardroom AV and directional acoustics that make every meeting feel like a command centre.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Feature list */}
        <div className="space-y-4">
          {boardroomFeatures.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground mb-1">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual card */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.25 }} className="space-y-5">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-muted">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Executive Boardroom" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="grid grid-cols-3 gap-2">
                {[["200+", "Rooms Equipped"], ["220\"", "Max Display"], ["7.1.4", "Dolby Atmos"]].map(([v, l]) => (
                  <div key={l} className="p-2 rounded-lg bg-black/60 backdrop-blur-sm text-center">
                    <p className="font-display font-bold text-white text-sm">{v}</p>
                    <p className="text-[10px] text-white/70">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-accent/20 bg-accent/5">
            <p className="text-xs font-display uppercase tracking-widest text-accent mb-2">Acoustic Engineering</p>
            <p className="text-sm text-muted-foreground leading-relaxed">We design with RT60 targets and STNR metrics, ensuring speech intelligibility scores (STI ≥ 0.65) across every seat in the room, not just the front row.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────── Section 3: Broadcast Audio ─────────────── */
interface AudioCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const audioCategories: AudioCategory[] = [
  {
    id: "recording",
    icon: Mic,
    label: "Recording & Podcast Studios",
    title: "Professional Recording, Broadcast & Podcast Studios",
    description: "From intimate podcast setups to full-scale broadcast facilities: acoustically treated, production-ready spaces with chroma key green screens, multi-camera rigs, and broadcast-grade audio chains.",
    features: [
      "Acoustic treatment: broadband absorbers, bass traps & diffusers (STC 55+)",
      "Isolated control rooms with floating floor and double-wall construction",
      "Professional monitor calibration (REW / Sonarworks) and signal chain wiring",
      "Chroma key green screen installations with 3-point LED lighting rigs",
      "Multi-camera production with ATEM switchers and live streaming integration",
      "Podcast setups: USB/XLR interfaces, boom arms, Shure SM7B, Rode PodMic",
      "Broadcast automation: OBS, vMix, and custom playout systems",
    ],
    specs: [
      { label: "Studios Built", value: "40+" },
      { label: "Sound Isolation", value: "STC 55+" },
      { label: "Audio Formats", value: "Dolby Atmos 7.1.4" },
      { label: "Lighting", value: "3-Point LED Rigs" },
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "chroma",
    icon: Camera,
    label: "Chroma Key & Lighting",
    title: "Chroma Key Studios & Cinematic Lighting Rigs",
    description: "Professional green-screen environments engineered for even spill-suppressed illumination, post-production efficiency, and broadcast-quality keying results.",
    features: [
      "Custom-built chroma key cyc walls with professional paint (Rosco Chroma Key Green)",
      "3-point LED lighting design: key, fill & back, eliminating green spill on subjects",
      "Motorized backdrop systems for rapid switching between chroma, muslin & infinity curves",
      "Color-accurate LED panels (CRI 98+) for natural skin tones under camera",
      "Follow-spot and tracking light rigs for multi-camera setups",
      "Post-production pipeline planning: DaVinci Resolve, Adobe Premiere keying workflows",
      "Teleprompter & autocue integration for presenter setups",
    ],
    specs: [
      { label: "CRI Rating", value: "98+" },
      { label: "Color Temp", value: "2700K - 6500K" },
      { label: "Spill Suppression", value: "< 2 stops" },
      { label: "Backdrop Systems", value: "Motorized" },
    ],
    image: "https://images.unsplash.com/photo-1574717024453-354056afd6e1?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "hifi",
    icon: Speaker,
    label: "Hi-Fi Retail & Commercial Sound",
    title: "Hi-Fi Retail & Commercial Sound Systems",
    description: "Immersive audio environments for retail flagship stores, F&B venues, luxury showrooms, and branded spaces that turn sound into a competitive advantage.",
    features: [
      "Zone-based distributed audio with independent level and content control per area",
      "Line-array and point-source speaker selection (JBL, Bose, QSC, Sonos Commercial)",
      "Acoustic site surveys: SPL mapping, RT60 analysis, and ambient noise measurement",
      "Digital signal processors (DSP): Biamp Tesira, QSC Q-SYS, Crown amplifiers",
      "Integration with retail POS and BMS for automated playback scheduling",
      "Ceiling and pendant speaker installations with flush aesthetic outcomes",
    ],
    specs: [
      { label: "Venues Equipped", value: "120+" },
      { label: "Max SPL", value: "110 dB" },
      { label: "Coverage", value: "±3 dB uniformity" },
      { label: "DSP Platforms", value: "Biamp / QSC / Crown" },
    ],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=700&auto=format&fit=crop",
  },
];

function BroadcastAudio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(audioCategories[0].id);
  const active = audioCategories.find((c) => c.id === activeTab)!;

  return (
    <div ref={ref} className="py-16 lg:py-24 border-t border-border">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-widest mb-4">
          <Mic className="w-3.5 h-3.5" /> Section 03
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Broadcast Audio.</h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">Hi-Fi retail sound, professional recording studios, chroma key rigs: every format of broadcast-grade audio and visual production.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-wrap gap-3 mb-10">
        {audioCategories.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-display font-semibold transition-all duration-300 ${isActive ? "border-accent bg-accent/10 text-accent shadow-md shadow-accent/10" : "border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"}`}>
              <cat.icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={active.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4">
                <active.icon className="w-3.5 h-3.5" />{active.label}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{active.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {active.specs.map((s) => (
                <div key={s.label} className="p-4 rounded-xl border border-border bg-card">
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {active.features.map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
            <motion.img key={active.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={active.image} alt={active.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                <active.icon className="w-4 h-4 text-accent" />
                <span className="text-xs font-display font-semibold text-white">{active.label}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── Bento items ─────────────── */
const benefits: BentoItem[] = [
  { icon: Video, title: "Video Conferencing", description: "High-definition meeting platforms with room-scale cameras, ceiling mics, and seamless wireless sharing.", span: "wide" },
  { icon: Phone, title: "PBX & VoIP", description: "Modern phone systems with auto-attendant, call recording, and IVR over internet-grade infrastructure." },
  { icon: PhoneCall, title: "Call Centre Setup", description: "ACD, predictive dialing, and CRM integration for high-volume customer service operations." },
  { icon: Speaker, title: "Hi-Fi Audio & Studio Installations", description: "Professional sound systems for retail spaces, worship venues, and complete studio setups." },
  { icon: Monitor, title: "Boardroom AV", description: "Integrated screens, wireless presentation, and conference microphones for executive environments.", span: "wide" },
  { icon: Mic, title: "PA & Voice Evacuation", description: "High-clarity PA systems and voice evacuation for clear emergency instructions." },
  { icon: Tv, title: "Digital Signage", description: "Dynamic display networks for lobbies, retail, and campuses, managed remotely." },
  { icon: Radio, title: "Intercom & Communication", description: "IP-based intercom systems for residential complexes, hospitals, and large campuses." },
  { icon: Building2, title: "Auditorium & Event AV", description: "End-to-end AV for auditoriums and event venues: lighting rigs, sound reinforcement, live streaming." },
  { icon: Users, title: "Collaboration Rooms", description: "Huddle spaces with interactive whiteboards, room booking, and occupancy sensors." },
];

const techStack = [
  "Crestron", "Extron", "Shure", "Sennheiser", "Bose",
  "JBL Professional", "Harman", "QSC", "Yamaha Pro",
  "Polycom", "Logitech Rally", "Neat", "Cisco Webex",
  "Zoom Rooms", "Microsoft Teams Rooms", "Barco ClickShare",
  "Samsung Pro", "LG Commercial", "Sony Pro", "Epson",
  "Avaya", "Genesys", "Five9", "Asterisk PBX",
  "Dante Audio", "Biamp", "ClearOne", "Audac",
  "Blackmagic ATEM", "vMix", "OBS Studio", "Elgato",
  "Rode", "Audio-Technica", "Neumann", "Focusrite",
  "Universal Audio", "Genelec", "KRK", "Sonarworks",
  "Elation", "Chauvet", "Aputure", "Godox",
];

/* ─────────────── Page ─────────────── */
export default function AVStudio() {
  return (
    <>
      <ServiceHero
        badge="ENTERPRISE COMMUNICATIONS & AV SOLUTIONS"
        title="Flawless Transmission."
        highlight="Enterprise Communications & Studio AV."
        description="PBX, cloud VoIP, executive boardroom AV, chroma key studios, and Hi-Fi broadcast audio: end-to-end communication infrastructure that never misses a beat."
        stats={[
          { value: "200+", label: "Rooms Equipped" },
          { value: "5,000+", label: "Call Centre Seats" },
          { value: "40+", label: "Studios Built" },
        ]}
      />

      <BentoGrid
        label="CAPABILITIES"
        heading="Voice. Video. Experience."
        subheading="From executive boardrooms to broadcast studios: communication infrastructure that elevates every interaction."
        items={benefits}
      />

      {/* Content sections */}
      <div className="bg-background">
        <div className="section-container">
          <EnterpriseTelecom />
          <ExecutiveEnvironments />
          <BroadcastAudio />
        </div>
      </div>

      <TechMarquee label="AV & COMMUNICATION PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
