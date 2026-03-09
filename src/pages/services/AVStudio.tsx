import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Headphones, Video, Phone, Monitor, Mic,
  Speaker, Radio, Tv, PhoneCall, LucideIcon, ShieldCheck,
  Building2, Users, Camera, Lightbulb, Volume2, Film,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Video, title: "Video Conferencing", description: "High-definition meeting platforms integrating Zoom, Teams, and custom solutions with room-scale cameras, ceiling mics, and seamless wireless sharing.", span: "wide" },
  { icon: Phone, title: "PBX & VoIP", description: "Modern phone systems that run over the internet, allowing staff to take business calls from anywhere — auto-attendant, call recording, and IVR included." },
  { icon: PhoneCall, title: "Call Centre Setup", description: "Building the software and hardware infrastructure for high-volume customer service operations — ACD, predictive dialing, and CRM integration." },
  { icon: Speaker, title: "Hi-Fi Audio & Studio Installations", description: "Professional sound systems for retail spaces, worship venues, and complete setup of recording, broadcast, or podcast studios." },
  { icon: Monitor, title: "Boardroom AV", description: "Integrated screens, wireless presentation, and conference microphones for large-scale corporate presentations and meetings.", span: "wide" },
  { icon: Mic, title: "PA & Voice Evacuation", description: "High-clarity public address systems and voice evacuation (PA/EVACS) for clear emergency instructions and general announcements." },
  { icon: Tv, title: "Digital Signage", description: "Dynamic display networks for lobbies, retail, and campuses — content management, scheduling, and remote updates across multiple screens." },
  { icon: Radio, title: "Intercom & Communication", description: "IP-based intercom systems for residential complexes, hospitals, and large campuses with video and access control integration." },
  { icon: Building2, title: "Auditorium & Event AV", description: "End-to-end AV solutions for auditoriums, conference halls, and event venues — lighting rigs, sound reinforcement, and live streaming." },
  { icon: Users, title: "Collaboration Rooms", description: "Huddle spaces and collaboration rooms with interactive whiteboards, room booking systems, and occupancy sensors." },
];

/* ───────── AV Solutions Tabs ───────── */
interface AVCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const avCategories: AVCategory[] = [
  {
    id: "studio",
    icon: Mic,
    label: "Recording & Podcast Studios",
    title: "Professional Recording, Broadcast & Podcast Studios",
    description: "From intimate podcast setups to full-scale broadcast facilities — acoustically treated, production-ready spaces with chroma key green screens, multi-camera rigs, and broadcast-grade audio chains.",
    features: [
      "Acoustic treatment with broadband absorbers, bass traps, and diffusers (STC 55+)",
      "Isolated control rooms with floating floor and double-wall construction",
      "Professional monitor calibration (REW / Sonarworks) and signal chain wiring",
      "Chroma key green screen installations with professional 3-point LED lighting rigs",
      "Multi-camera video production setups with ATEM switchers and live streaming integration",
      "Podcast-specific setups — USB/XLR interfaces, boom arms, dynamic mics (Shure SM7B, Rode PodMic)",
      "Broadcast automation software — OBS, vMix, and custom playout systems",
      "Soundproofing to STC 55+ for noise-sensitive environments with ventilation planning",
    ],
    specs: [
      { label: "Studios Built", value: "40+" },
      { label: "Sound Isolation", value: "STC 55+" },
      { label: "Audio Formats", value: "Dolby Atmos / 7.1.4" },
      { label: "Lighting", value: "3-Point LED Rigs" },
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "boardroom",
    icon: Monitor,
    label: "Boardroom AV",
    title: "Executive Boardroom & Conference Solutions",
    description: "Integrated AV systems for executive boardrooms — large-format displays, ceiling microphone arrays, wireless content sharing, and one-touch meeting launch.",
    features: [
      "4K/8K large-format displays and LED video walls (up to 220\")",
      "Ceiling microphone arrays with auto-tracking speaker focus (Shure MXA910, Sennheiser TeamConnect)",
      "Wireless BYOD content sharing — AirPlay, Miracast, USB-C, and Barco ClickShare",
      "Room booking panels with calendar integration (Outlook / Google Workspace)",
      "Centralized AV management across multiple conference rooms (Crestron / Extron control)",
      "Acoustic paneling and sound masking for speech privacy",
    ],
    specs: [
      { label: "Rooms Equipped", value: "200+" },
      { label: "Platforms", value: "Zoom / Teams / Webex" },
      { label: "Display Size", value: "Up to 220\"" },
      { label: "Control System", value: "Crestron / Extron" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "callcenter",
    icon: PhoneCall,
    label: "Call Centre",
    title: "Call Centre & Contact Centre Infrastructure",
    description: "End-to-end contact centre setups — from cloud PBX and ACD routing to CRM integration, quality monitoring, and agent performance analytics.",
    features: [
      "Cloud-hosted PBX with auto-attendant and IVR menu design",
      "ACD (Automatic Call Distribution) with skill-based routing and queue management",
      "Call recording, quality scoring, and sentiment analysis with speech analytics",
      "CRM integration — Salesforce, Zoho, Freshdesk, and custom APIs",
      "Predictive dialer and outbound campaign management for sales teams",
      "Omnichannel support — Voice, Chat, Email, WhatsApp, and social media",
    ],
    specs: [
      { label: "Seats Deployed", value: "5,000+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Channels", value: "Voice / Chat / Email / WhatsApp" },
      { label: "Integrations", value: "50+ CRMs" },
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
  },
];

function AVShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(avCategories[0].id);
  const active = avCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">SOLUTION DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Immersive AV Experiences.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Professional-grade audiovisual solutions for studios, boardrooms, and contact centres.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {avCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-display font-semibold transition-all duration-300 ${isActive ? "border-accent bg-accent/10 text-accent shadow-md shadow-accent/10" : "border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"}`}>
                <cat.icon className={`w-4 h-4 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4"><active.icon className="w-3.5 h-3.5" />{active.label}</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{active.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {active.specs.map((s) => (<div key={s.label} className="p-4 rounded-xl border border-border bg-card"><p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">{s.label}</p><p className="font-display text-lg font-bold text-foreground">{s.value}</p></div>))}
              </div>
              <div className="space-y-3">
                {active.features.map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center"><ShieldCheck className="w-3 h-3 text-accent" /></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
              <motion.img key={active.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={active.image} alt={active.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4"><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm"><active.icon className="w-4 h-4 text-accent" /><span className="text-xs font-display font-semibold text-white">{active.label}</span></div></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

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

export default function AVStudio() {
  return (
    <>
      <ServiceHero
        badge="COMMUNICATION, CALL CENTRE & AV SOLUTIONS"
        title="Seamless Communication."
        highlight="Immersive AV."
        description="High-quality voice, video, and audio systems built for seamless collaboration, customer support, and professional production."
        stats={[
          { value: "200+", label: "Rooms Equipped" },
          { value: "5,000+", label: "Call Centre Seats" },
          { value: "40+", label: "Studios Built" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Voice. Video. Experience."
        subheading="From executive boardrooms to broadcast studios — communication infrastructure that elevates every interaction."
        items={benefits}
      />
      <AVShowcase />
      <TechMarquee label="AV & COMMUNICATION PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
