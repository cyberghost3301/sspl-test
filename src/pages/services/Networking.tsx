import React, { useRef, useState } from "react";
import { m as motion, useInView } from "framer-motion";
import {
  MapPin, ShieldCheck, Settings, Wrench,
  AlertTriangle, CheckCircle2,
  Network, Server, Shield,
  ClipboardList, Compass, Rocket, HeadphonesIcon,
  Building2, Factory, GraduationCap,
  Phone,
  Activity, Globe, Wifi, EyeOff, MonitorPlay, HardDrive, Zap,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { Button } from "@/components/ui/button";
import ContextToggle, { ContextMode } from "@/components/ContextToggle";

/* ════════════════════════════════════
   SECTION 2 — Trust Strip (prop-driven)
════════════════════════════════════ */
type TrustMarker = { icon: React.ElementType; label: string };

function TrustStrip({ markers }: { markers: TrustMarker[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative w-full py-5 border-y border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-border/40">
          {markers.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center justify-center gap-2.5 py-3 px-4"
              >
                <Icon className="w-4 h-4 text-accent/70 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 3 — Problem → Solution
════════════════════════════════════ */
function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            The Real Problem
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Most IT issues don't look serious…{" "}
            <span className="text-gradient">until they stop work completely</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative flex flex-col p-8 rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xs font-display uppercase tracking-widest text-red-400/80 mb-3">The Problem</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                Slow internet, unstable networks, random disconnections.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                System crashes quietly reduce productivity every single day. Until one day everything stops — work, communication, operations. That's when it becomes a real problem.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="relative flex flex-col p-8 rounded-2xl border border-accent/20 bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">The Spirecrest Way</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                Built for stability, not temporary fixes.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't just install routers, cables, or servers. We design your entire IT backbone so everything works together reliably, consistently, and without constant troubleshooting. No patchwork. No quick fixes. Just systems that work.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 4 — Capabilities
   (dynamic — defined inside component)
════════════════════════════════════ */

/* ════════════════════════════════════
   SECTION 5 — Process
════════════════════════════════════ */
const processSteps = [
  { step: "01", icon: ClipboardList, title: "Assessment",    body: "We understand how your business operates and what it actually needs." },
  { step: "02", icon: Compass,       title: "Design",        body: "We map the right infrastructure based on your scale and usage." },
  { step: "03", icon: Rocket,        title: "Deployment",    body: "Clean, structured setup with minimal disruption to your work." },
  { step: "04", icon: HeadphonesIcon,title: "Support & AMC", body: "Ongoing monitoring and maintenance so everything keeps running smoothly." },
];

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How we deploy your{" "}
            <span className="text-gradient">IT infrastructure</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every system is planned, designed, and tested before it goes live. No guesswork. No generic setups.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          {processSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative flex flex-col p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-display font-bold text-accent tracking-widest">
                {s.step}
              </div>
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mt-3 group-hover:bg-accent/20 transition-colors">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 6 — Mid-Page CTA
════════════════════════════════════ */
function MidPageCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 lg:py-14 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-accent/15 bg-card px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
              Not sure what setup your business needs?
            </p>
            <p className="text-sm text-muted-foreground">Tell us your office size, team, and usage — we'll guide you.</p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="rounded-xl"
            >
              <WhatsAppCTA
                context="networking"
                section="pricing"
                buttonText="Get My Project Estimate"
                className="px-7 h-11 text-sm font-semibold rounded-xl shadow-lg shadow-accent/20"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 7 — Use Cases
════════════════════════════════════ */
const useCases = [
  { icon: Building2,     title: "For Offices",      body: "Seamless connectivity, stable systems, and uninterrupted workflows.",                    color: "text-cyan-400",  bg: "bg-cyan-500/10",  border: "hover:border-cyan-500/30" },
  { icon: Factory,       title: "For Factories",     body: "Reliable infrastructure for operations, monitoring, and coordination.",                  color: "text-amber-400", bg: "bg-amber-500/10", border: "hover:border-amber-500/30" },
  { icon: GraduationCap, title: "For Institutions",  body: "Consistent connectivity across departments, staff, and systems.",                        color: "text-blue-400",  bg: "bg-blue-500/10",  border: "hover:border-blue-500/30" },
];

function UseCaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Who We Build For</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Engineered for your{" "}
            <span className="text-gradient">exact environment</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group flex flex-col p-8 rounded-2xl border border-border bg-card transition-all duration-300 ${uc.border} hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl ${uc.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <uc.icon className={`w-6 h-6 ${uc.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 8 — AMC & Ongoing Support
════════════════════════════════════ */
function AMCSupport() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">After Installation</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
                Support that actually keeps things running
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 text-base md:text-lg">
                Most IT setups don't fail because of installation. They fail because no one maintains them properly.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                We provide ongoing{" "}
                <span className="text-foreground font-semibold">AMC and support</span>{" "}
                so your systems stay stable, updated, and reliable over time. So your business doesn't stop because of avoidable issues.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                Most issues we fix are preventable. That's exactly what our support is designed for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.55)", "0 0 0px rgba(6,182,212,0)"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="rounded-xl"
                >
                  <WhatsAppCTA
                    context="networking"
                    section="footer"
                    buttonText="Talk to an Expert"
                    className="px-7 h-11 text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 w-full sm:w-auto"
                  />
                </motion.div>
                <a href="tel:+919250974145">
                  <Button
                    variant="outline"
                    className="h-11 px-7 text-sm font-semibold border-accent/30 text-white hover:bg-accent/10 w-full sm:w-auto rounded-xl gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Speak to an Engineer
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   Tech Marquee data
════════════════════════════════════ */
const techStack = [
  "Cisco", "Juniper", "Aruba", "Fortinet", "Ubiquiti",
  "AWS", "Microsoft Azure", "Google Cloud",
  "VMware", "Hyper-V", "Proxmox", "Docker", "Kubernetes",
  "Dell PowerEdge", "HPE ProLiant", "Lenovo ThinkSystem",
  "Synology", "QNAP", "NetApp",
  "Commscope", "Panduit", "Belden", "Corning Fiber",
  "Veeam", "Acronis", "Datto",
];

/* ════════════════════════════════════
   PAGE EXPORT
════════════════════════════════════ */
export default function Networking() {
  const [contextMode, setContextMode] = useState<ContextMode>("enterprise");

  // ── DYNAMIC CONTENT DICTIONARIES ──
  const heroContent = {
    enterprise: {
      description: "High-throughput SD-WAN, multi-site branch routing, and zero-trust isolated VLANs. We engineer networks that don't bottleneck under enterprise loads.",
      trustLine:   "Deployed in corporate headquarters and high-density industrial facilities.",
    },
    residential: {
      description: "Wall-to-wall Wi-Fi 7 coverage, hardwired access points, and seamless roaming. Say goodbye to dead zones and buffering in your high-end property.",
      trustLine:   "Discreet, wire-free aesthetics engineered for large residential estates.",
    },
  };

  const dynamicCapabilities: Record<ContextMode, BentoItem[]> = {
    enterprise: [
      { icon: Network,     title: "Multi-Site SD-WAN",   description: "Secure, encrypted tunnels connecting your branch offices seamlessly.",                       span: "wide" },
      { icon: Shield,      title: "Zero-Trust VLANs",    description: "Isolate IoT devices, guest networks, and core servers.",                                    span: "normal" },
      { icon: Activity,    title: "Load Balancing",       description: "Failover protocols ensuring 99.99% uptime during ISP outages.",                             span: "normal" },
      { icon: Server,      title: "Enterprise Routing",   description: "Ubiquiti & Cisco core routing capable of handling 10Gbps+ throughput.",                      span: "wide" },
    ],
    residential: [
      { icon: Wifi,        title: "Whole-Home Wi-Fi 7",  description: "Seamless roaming access points strategically hidden in ceilings and walls.",                 span: "wide" },
      { icon: MonitorPlay, title: "AV & Gaming Priority", description: "QoS bandwidth allocation for zero-latency streaming and gaming.",                            span: "normal" },
      { icon: ShieldCheck, title: "Family Protection",    description: "Network-level ad-blocking and content filtering.",                                           span: "normal" },
      { icon: HardDrive,   title: "Hardwired Backbones", description: "Cat6a/Fiber runs to all stationary devices (TVs, Consoles, PCs).",                          span: "wide" },
    ],
  };

  const dynamicTrustMarkers: Record<ContextMode, TrustMarker[]> = {
    enterprise: [
      { icon: Activity,    label: "99.99% Uptime SLA"   },
      { icon: Shield,      label: "Advanced Firewalling" },
      { icon: Server,      label: "10Gbps+ Core"         },
      { icon: Globe,       label: "Multi-Site Sync"      },
    ],
    residential: [
      { icon: Wifi,        label: "Zero Dead Zones"      },
      { icon: EyeOff,      label: "Hidden Access Points" },
      { icon: MapPin,      label: "App-Managed"          },
      { icon: Zap,         label: "Fiber-Ready"          },
    ],
  };

  return (
    <>
      <SEO
        title={`Networking & IT Infrastructure | Spirecrest ${contextMode === "enterprise" ? "Commercial" : "Home"}`}
        description={heroContent[contextMode].description}
        path="/services/networking"
      />

      {/* ── 1. Hero ── */}
      <ServiceHero
        badge="IT Infrastructure & Networking"
        title={contextMode === "enterprise" ? "Enterprise Networks Built for" : "Home Networks Built for"}
        highlight={contextMode === "enterprise" ? "Zero Bottlenecks" : "Total Coverage"}
        description={heroContent[contextMode].description}
        trustLine={heroContent[contextMode].trustLine}
        stats={[
          { value: "500+", label: "Systems Deployed" },
          { value: "24/7", label: "AMC Support"      },
          { value: "100%", label: "Custom Designed"  },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />

      {/* ── Context Toggle ── */}
      <ContextToggle mode={contextMode} onChange={setContextMode} />

      {/* ── 2. Dynamic Trust Strip ── */}
      <TrustStrip markers={dynamicTrustMarkers[contextMode]} />

      {/* ── 3. Problem → Solution ── */}
      <ProblemSolution />

      {/* ── 4. Dynamic Capabilities Bento ── */}
      <BentoGrid
        label={contextMode === "enterprise" ? "Enterprise Architecture" : "Residential Deployment"}
        heading={contextMode === "enterprise" ? "Built for throughput and threat isolation" : "Built for coverage and seamless living"}
        subheading="Everything is planned based on your usage, not guesswork. Every component is selected to reduce downtime and eliminate failure points."
        items={dynamicCapabilities[contextMode]}
      />

      {/* ── 5. Process ── */}
      <ProcessSection />

      {/* ── 6. Mid-Page CTA ── */}
      <MidPageCTA />

      {/* ── 7. Use Cases ── */}
      <UseCaseSection />

      {/* ── 8. AMC & Support ── */}
      <AMCSupport />

      {/* Tech Marquee */}
      <TechMarquee label="Certified Infrastructure Partners" items={techStack} />

      {/* ── 9. Final CTA ── */}
      <CTASection
        heading={contextMode === "enterprise" ? "Secure your enterprise network" : "Eliminate dead zones forever"}
        subtext="We'll design the right setup for you. No overcomplication. No unnecessary costs."
      />
    </>
  );
}
