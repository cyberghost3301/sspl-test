import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import {
  Palette, Sofa, Lamp, PaintBucket, Ruler, Home,
  Building2, Boxes, ShieldCheck, LucideIcon,
  Layers, TreePine, Hammer, Sparkles,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Building2, title: "Commercial & Office Interiors", description: "Workplace design that boosts productivity: open plans, private offices, collaboration zones, breakout areas, and reception lobbies with brand integration.", span: "wide" },
  { icon: Ruler, title: "Space Planning & Layout", description: "Optimized floor plans that maximize functionality, flow, and aesthetics, from compact apartments to sprawling corporate headquarters." },
  { icon: Sofa, title: "Furniture Design & Sourcing", description: "Custom furniture design, ergonomic office layouts, and curated sourcing from premium manufacturers with bulk procurement pricing." },
  { icon: Lamp, title: "Lighting Design", description: "Layered lighting schemes (ambient, task, and accent) designed to enhance mood, productivity, and architectural features.", span: "wide" },
  { icon: PaintBucket, title: "Material & Finish Selection", description: "Expert curation of paints, wallpapers, veneers, laminates, stones, and fabrics aligned with your brand identity and budget." },
  { icon: Home, title: "Residential Interiors", description: "Complete home interiors: living rooms, bedrooms, kitchens, bathrooms, and outdoor spaces designed for comfort and elegance." },
  { icon: Layers, title: "False Ceiling & Flooring", description: "Gypsum and POP false ceilings, wooden and vinyl flooring, epoxy coatings, and raised access flooring for commercial spaces." },
  { icon: TreePine, title: "Landscape & Outdoor Design", description: "Garden design, terrace landscaping, outdoor living areas, and vertical green walls that connect interior spaces with nature." },
  { icon: Hammer, title: "Civil & Construction Works", description: "Structural modifications, partition walls, plumbing, electrical, and civil works managed end-to-end with licensed contractors." },
  { icon: Sparkles, title: "Turnkey Project Delivery", description: "Complete design-to-handover execution — concept, 3D visualization, procurement, installation, and final styling in one package." },
  { icon: Boxes, title: "Modular Kitchen & Wardrobes", description: "Factory-finished modular kitchens and wardrobes with soft-close hardware, custom configurations, and quick installation." },
  { icon: Palette, title: "Brand & Theme Integration", description: "Interior design that reflects your corporate identity — branded color schemes, logo walls, environmental graphics, and themed spaces." },
];

/* ───────── Interior Design Tabs ───────── */
interface DesignCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const designCategories: DesignCategory[] = [
  {
    id: "commercial",
    icon: Building2,
    label: "Commercial Office",
    title: "Modern Office & Commercial Workspaces",
    description: "Workplaces designed for performance — ergonomic layouts, acoustic treatment, brand integration, and biophilic elements that attract talent and boost productivity. From startups to Fortune 500s.",
    features: [
      "Open-plan layouts with acoustic pods, phone booths, and focus zones for deep work",
      "Branded reception areas, conference rooms, and executive suites that reflect company culture",
      "Cafeteria and breakout space design with lifestyle amenities (gaming zones, nap pods, wellness areas)",
      "IT infrastructure integration — cable trays, floor boxes, AV pre-wiring, and server room cooling",
      "LEED and WELL certification-aligned sustainable material selection (low-VOC paints, recycled materials)",
      "Activity-based working (ABW) zones — hot desks, collaboration spaces, quiet rooms",
      "Ergonomic furniture specification — height-adjustable desks, task chairs (Herman Miller, Steelcase)",
      "Environmental graphics — wall murals, wayfinding, brand storytelling",
    ],
    specs: [
      { label: "Offices Designed", value: "80+" },
      { label: "Sq. Ft. Delivered", value: "5L+" },
      { label: "Certifications", value: "LEED / WELL / IGBC" },
      { label: "Avg. Budget", value: "₹800-2500/sqft" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "residential",
    icon: Home,
    label: "Residential",
    title: "Luxury Residential Interiors",
    description: "From 1BHK apartments to heritage bungalows — we design homes that reflect your personality with meticulous attention to comfort, storage, and aesthetics.",
    features: [
      "Photorealistic 3D renders and virtual walkthroughs before construction",
      "Modular kitchen design with premium hardware (Hettich, Hafele, Blum)",
      "Custom furniture — beds, wardrobes, TV units, and study tables",
      "Smart home integration — automated lighting, curtains, and climate",
      "End-to-end project management with daily progress updates",
    ],
    specs: [
      { label: "Homes Designed", value: "300+" },
      { label: "Avg. Timeline", value: "45-90 days" },
      { label: "3D Accuracy", value: "95%+" },
      { label: "Warranty", value: "10 years" },
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "turnkey",
    icon: Sparkles,
    label: "Turnkey Delivery",
    title: "Turnkey Design-to-Handover",
    description: "Concept to keys — we handle everything. Design, approvals, procurement, civil work, installation, styling, and handover. You walk in and it's done.",
    features: [
      "Single point of contact from concept through final handover",
      "In-house civil, carpentry, electrical, and plumbing teams",
      "Centralized procurement with vendor-negotiated pricing",
      "Quality checkpoints at every stage with photo documentation",
      "Post-handover support with defect liability period and AMC options",
    ],
    specs: [
      { label: "Projects Delivered", value: "200+" },
      { label: "On-Time Rate", value: "94%" },
      { label: "Vendors", value: "100+ empaneled" },
      { label: "DLP", value: "1 year included" },
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  },
];

function InteriorTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(designCategories[0].id);
  const active = designCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">DESIGN DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Spaces That Inspire.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">From high-performance offices to luxury homes — design that merges beauty with function.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {designCategories.map((cat) => {
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
  "AutoCAD", "SketchUp", "3ds Max", "V-Ray", "Enscape",
  "Revit", "Rhino", "Blender", "Lumion", "Twinmotion",
  "Hettich", "Hafele", "Blum", "Godrej Interio",
  "Asian Paints", "Berger", "Dulux", "Nippon",
  "Kajaria", "Somany", "Nitco", "Johnson Tiles",
  "Century Plyboards", "Greenply", "MDF Italia",
  "Philips Lighting", "Havells", "Syska", "Wipro Lighting",
];

export default function Interior() {
  return (
    <>
      <ServiceHero
        badge="INTERIOR DESIGN & CONSTRUCTION"
        title="Spaces That"
        highlight="Inspire."
        description="Modern workplace design, luxury residential interiors, and turnkey construction — from concept to handover, we create environments that elevate life and work. Workspaces directly influence productivity, employee experience, and brand perception."
        stats={[
          { value: "80+", label: "Offices Designed" },
          { value: "300+", label: "Homes Delivered" },
          { value: "5L+ sqft", label: "Commercial Space" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Design. Build. Deliver."
        subheading="From commercial office spaces to luxury homes — complete interior solutions that prioritize functionality, brand identity, and employee wellbeing. Every solution is engineered for performance, scalability, and long-term reliability."
        items={benefits}
      />
      <InteriorTabs />
      <TechMarquee label="DESIGN TOOLS & MATERIAL PARTNERS" items={techStack} />
      <div className="section-container pb-2 text-sm text-muted-foreground">
        Need integrated automation and smart controls?{" "}
        <Link to="/services/automation" className="text-cyan-400 hover:underline">Explore our automation solutions.</Link>
      </div>
      <CTASection heading="Tell us what you're trying to achieve. We'll tell you exactly what you need — no upselling, no guesswork." />
    </>
  );
}
