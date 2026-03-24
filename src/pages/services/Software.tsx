import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code, Smartphone, Globe, Cpu, Workflow, Database,
  Palette, TestTube, GitBranch, ShoppingCart, BarChart3, Headphones,
  Layers, Rocket, Lock, Gauge, Users, FileCode,
  Bot, Blocks, Wifi, CreditCard, Mail, Search,
  MonitorSmartphone, Cog, Calendar, MessageSquare, Clipboard, Cloud,
  ShieldCheck, LucideIcon, Store, BrainCircuit, PenTool, Megaphone,
  AlertTriangle, CheckCircle2,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CaseStudyCard from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const benefits: BentoItem[] = [
  { icon: Code, title: "Custom Software Development", description: "Build systems tailored to your business processes, ensuring efficiency, scalability, and long-term reliability.", span: "wide" },
  { icon: Smartphone, title: "Mobile Development", description: "Create mobile applications that enhance customer experience and integrate seamlessly with your business operations." },
  { icon: Globe, title: "SaaS Platforms", description: "Develop scalable platforms designed to support growth, recurring usage, and long-term product evolution." },
  { icon: Cpu, title: "AI & ML Solutions", description: "Using Artificial Intelligence and Machine Learning to automate repetitive tasks, find trends in business data, and build predictive models." },
  { icon: Bot, title: "Chatbots & Virtual Assistants", description: "AI-powered helpers that provide 24/7 customer support via text or voice: lead qualification, appointment booking, and FAQ automation." },
  { icon: Workflow, title: "API Development", description: "RESTful and GraphQL APIs designed for performance, security, and seamless third-party integrations." },
  { icon: Database, title: "ERP & CRM Implementation", description: "Setting up enterprise resource planning and customer relationship management systems to streamline operations and boost revenue.", span: "wide" },
  { icon: ShoppingCart, title: "E-Governance & E-Commerce", description: "Implement secure, scalable systems that handle transactions, workflows, and user interactions reliably." },
  { icon: Palette, title: "Branding & Identity Design", description: "Professional services to build a consistent and recognizable look, from logo systems and brand guidelines to full visual identities." },
  { icon: TestTube, title: "QA & Testing", description: "Comprehensive testing strategies including unit tests, E2E automation, performance benchmarking, and security scanning." },
  { icon: GitBranch, title: "DevOps & CI/CD", description: "Automated build pipelines, containerized deployments, infrastructure-as-code, and zero-downtime release strategies.", span: "wide" },
  { icon: BarChart3, title: "Analytics & Dashboards", description: "Custom analytics platforms with real-time data visualization, KPI tracking, report generation, and business intelligence integrations." },
  { icon: CreditCard, title: "Payment Integration", description: "Secure payment processing with Stripe, Razorpay, PayPal, and custom billing flows including subscriptions, invoicing, and refunds." },
  { icon: Lock, title: "Security & Authentication", description: "OAuth 2.0, SSO, multi-factor authentication, role-based access control, and end-to-end encryption for data protection." },
  { icon: Cloud, title: "Serverless Architecture", description: "Event-driven serverless functions, edge computing, and microservices for cost-efficient, infinitely scalable backend logic." },
  { icon: Blocks, title: "CMS & Content Platforms", description: "Headless CMS integrations with Strapi, Sanity, or custom content management systems with WYSIWYG editors and media libraries." },
  { icon: MonitorSmartphone, title: "Progressive Web Apps", description: "Offline-capable, installable web applications with service workers, background sync, and native-like performance on any device." },
  { icon: Rocket, title: "MVP Development", description: "Rapid prototyping and minimum viable product development with lean methodology, getting your idea to market in weeks, not months." },
  { icon: Cog, title: "Legacy Modernization", description: "Migrate aging systems to modern tech stacks with zero data loss, improved performance, and future-proof architecture." },
  { icon: Gauge, title: "Performance Optimization", description: "Database query optimization, caching strategies, CDN configuration, and load balancing for sub-second response times." },
  { icon: Wifi, title: "IoT & Connected Devices", description: "Firmware development, device-cloud communication, MQTT/CoAP protocols, and dashboard interfaces for IoT ecosystems." },
  { icon: Layers, title: "Micro-Frontend Architecture", description: "Independently deployable UI modules, shared design systems, and federated builds for large-scale frontend applications." },
];

/* ───────── Digital Solutions Tabs ───────── */
interface SolutionCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  metrics: { label: string; value: string }[];
}

const solutionCategories: SolutionCategory[] = [
  {
    id: "custom-dev",
    icon: Code,
    label: "Custom Development",
    title: "Bespoke Software & Web Applications",
    description: "Every system is built with performance, scalability, and long-term maintainability in mind.",
    capabilities: [
      "Full-stack web applications with React, Next.js, and Node.js",
      "Cross-platform mobile apps with Flutter and React Native",
      "Real-time systems with WebSockets and event-driven architecture",
      "API-first design for seamless integrations with third-party services",
      "Automated testing pipelines ensuring 95%+ code coverage",
    ],
    metrics: [
      { label: "Avg. Delivery", value: "8-12 weeks" },
      { label: "Code Coverage", value: "95%+" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Tech Stacks", value: "15+" },
    ],
  },
  {
    id: "ai-ml",
    icon: BrainCircuit,
    label: "AI & Automation",
    title: "AI/ML Solutions & Intelligent Automation",
    description: "From predictive analytics to conversational AI, we embed intelligence into your workflows to automate, optimize, and scale.",
    capabilities: [
      "Recommendation engines and predictive analytics dashboards",
      "NLP-powered chatbots with multi-language support and context awareness",
      "Computer vision for quality control, facial recognition, and document OCR",
      "Automated data pipelines and ETL workflows with anomaly detection",
      "Custom LLM fine-tuning and RAG architectures for enterprise knowledge bases",
    ],
    metrics: [
      { label: "Models Deployed", value: "50+" },
      { label: "Accuracy", value: "97%+" },
      { label: "Response Time", value: "<200ms" },
      { label: "Frameworks", value: "TF / PyTorch / OpenAI" },
    ],
  },
  {
    id: "ecommerce",
    icon: Store,
    label: "E-Commerce & ERP",
    title: "E-Commerce Platforms & Enterprise Systems",
    description: "End-to-end digital commerce and resource planning, from storefront to supply chain, payment to fulfillment.",
    capabilities: [
      "Custom storefronts with headless commerce architecture",
      "Multi-vendor marketplace platforms with seller dashboards",
      "ERP integration with inventory, HR, accounting, and procurement modules",
      "Payment gateway orchestration: Stripe, Razorpay, PayPal, and UPI",
      "Real-time order tracking, warehouse management, and logistics APIs",
    ],
    metrics: [
      { label: "Stores Launched", value: "80+" },
      { label: "GMV Processed", value: "₹100Cr+" },
      { label: "Gateways", value: "12+" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: "branding",
    icon: PenTool,
    label: "Branding & Design",
    title: "Branding, Identity Design & Digital Marketing",
    description: "Strategic advertising, brand identity systems, and digital outreach to build awareness, engagement, and conversions.",
    capabilities: [
      "Logo systems, brand guidelines, and complete visual identity packages",
      "Social media management and content creation across all platforms",
      "SEO/SEM optimization with measurable ranking improvements",
      "Paid advertisement campaigns on Meta, LinkedIn, and Google Ads",
      "PR and reputation management for projects and organizations",
    ],
    metrics: [
      { label: "Brands Built", value: "60+" },
      { label: "Avg. SEO Lift", value: "3x traffic" },
      { label: "Platforms", value: "8+" },
      { label: "Conversion ↑", value: "45%" },
    ],
  },
];

function DigitalSolutionsTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(solutionCategories[0].id);
  const active = solutionCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">SOLUTION DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Explore Our Digital Arsenal.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Each system is built for reliability under real usage — designed to scale, integrate seamlessly, and support business-critical operations without breakdown.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {solutionCategories.map((cat) => {
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
          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4">
                <active.icon className="w-3.5 h-3.5" />
                {active.label}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">{active.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {active.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-xl border border-border bg-card text-center">
                    <p className="font-display text-xl font-bold text-accent">{m.value}</p>
                    <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {active.capabilities.map((cap, i) => (
                  <motion.div key={cap} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
  "AWS", "Google Cloud", "Vercel", "TailwindCSS", "GraphQL",
  "TensorFlow", "OpenAI", "Stripe", "Firebase", "Supabase",
  "Vue.js", "Angular", "Svelte", "Remix", "Astro",
  "Django", "FastAPI", "Express.js", "NestJS", "Go",
  "MySQL", "DynamoDB", "Elasticsearch", "Prisma", "Drizzle",
  "GitHub Actions", "Jenkins", "Terraform", "Ansible", "Nginx",
  "Figma", "Storybook", "Playwright", "Cypress", "Jest",
  "Razorpay", "PayPal", "Twilio", "SendGrid", "Cloudflare",
  "Flutter", "React Native", "Swift", "Kotlin", "Expo",
];



/* ───────── Pricing Anchor Section ───────── */
const pricingTiers = [
  {
    name: "Starter Systems",
    label: "For small teams or basic workflows",
    range: "₹50K - ₹2L",
    includes: [
      "Simple internal tools",
      "Basic automation",
      "MVP-level systems",
    ],
    accent: false,
    badge: null,
  },
  {
    name: "Business Systems",
    label: "For growing businesses and operations",
    range: "₹2L - ₹10L",
    includes: [
      "CRM / ERP systems",
      "Automation workflows",
      "Dashboard & reporting",
      "Integrations",
    ],
    accent: true,
    badge: "Most Common",
  },
  {
    name: "Enterprise Systems",
    label: "For large-scale or mission-critical systems",
    range: "₹10L+",
    includes: [
      "Multi-user platforms",
      "High-scale systems",
      "Advanced architecture",
      "Full automation",
    ],
    accent: false,
    badge: null,
  },
];

function PricingAnchor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            SCOPE &amp; INVESTMENT
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Typical Investment for Business Systems
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every system is different - but most projects fall within these ranges based on complexity, scale, and business requirements
          </p>
        </motion.div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`relative flex flex-col p-8 rounded-2xl border bg-card transition-all duration-500 ease-out ${
                tier.accent
                  ? "border-accent/40 shadow-[0_0_40px_rgba(6,182,212,0.18)] scale-[1.03] z-10"
                  : "border-border hover:border-accent/20 hover:shadow-[0_0_28px_rgba(6,182,212,0.08)]"
              }`}
            >
              {/* Accent background gradient */}
              {tier.accent && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent rounded-2xl pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full">

                {/* Badge */}
                {tier.badge && (
                  <span className="inline-block self-start text-[10px] font-display font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-4">
                    {tier.badge}
                  </span>
                )}

                {/* Tier name */}
                <h3 className="font-display text-lg font-bold text-foreground mb-1 uppercase tracking-wide">
                  {tier.name}
                </h3>

                {/* Label */}
                <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                  {tier.label}
                </p>

                {/* Price */}
                <p className={`font-display text-3xl font-bold mb-6 ${tier.accent ? "text-accent" : "text-foreground"}`}>
                  {tier.range}
                </p>

                {/* Includes list */}
                <ul className="space-y-2.5 mt-auto">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tier.accent ? "bg-accent" : "bg-muted-foreground/40"}`} />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Advisory Decision Trigger */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Most businesses underestimate system complexity - a quick estimate helps avoid costly mistakes later
        </p>

        {/* Decision Helper + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center gap-5 mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-md">
            Not sure where your project fits? Get a quick estimate based on your requirements
          </p>
          <WhatsAppCTA
            context="software-pricing"
            section="pricing"
            buttonText="Get My Project Estimate"
            className="px-8 h-12 text-sm"
          />
          <p className="text-xs text-gray-500 text-center mt-3">
            No commitment - just clarity on scope, cost, and approach
          </p>
        </motion.div>

      </div>
    </section>
  );
}


/* ───────── Problem / Approach Section ───────── */
function ProblemApproach() {
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
            The Problem
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Most software doesn't fail instantly…{" "}
            <span className="text-gradient">it fails silently.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Slow systems, broken workflows, and poor integrations don't always look like major problems at first — until they start affecting operations, revenue, and scalability. By the time issues become visible, they've already affected performance, operations, and growth.
          </p>
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
                Disconnected systems, manual processes, and unstable applications.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These create bottlenecks that compound over time — slowing teams, increasing costs, and limiting your ability to scale.
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
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Our Approach</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                Structured, scalable systems built for real operations.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We design and build systems that support real operations — not just features — engineered for reliability, integration, and long-term growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Systems Expertise / Authority Section ───────── */
const expertiseBlocks = [
  {
    heading: "Scalability",
    text: "Systems must handle increasing users, data, and operational load without slowing down or breaking.",
  },
  {
    heading: "Integration",
    text: "Business tools must work together — CRMs, ERPs, dashboards, APIs — not exist as disconnected systems.",
  },
  {
    heading: "Reliability",
    text: "Frequent bugs, downtime, and instability cost more than development — systems must perform consistently under real usage.",
  },
];

function SystemsExpertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            SYSTEM DESIGN
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Systems That Actually Scale
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Most systems don't break because of traffic — they break because they were never designed for real-world complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {expertiseBlocks.map((block, i) => (
            <motion.div
              key={block.heading}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 ease-out"
            >
              <p className="font-display text-base font-bold text-accent mb-3 uppercase tracking-wide">
                {block.heading}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground max-w-xl mx-auto mt-10 italic"
        >
          We design systems that don't just launch successfully — they continue to perform as your business grows.
        </motion.p>
      </div>
    </section>
  );
}

/* ───────── SEO Authority Block ───────── */
function SEOAuthorityBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            SYSTEM ARCHITECTURE
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            What We Actually Build
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We design and develop custom business systems that power real operations — from internal tools to full-scale platforms. Our work includes ERP systems, CRM platforms, SaaS products, workflow automation systems, enterprise dashboards, and scalable web applications built for performance and long-term growth.
          </p>
          <ul className="text-sm text-muted-foreground/70 space-y-1 text-left inline-block mb-6">
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />Custom software development</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />Business automation systems</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />ERP &amp; CRM solutions</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />SaaS platform development</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />Enterprise web applications</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />Workflow automation tools</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1" />API integrations &amp; system architecture</li>
          </ul>
          <p className="text-sm text-muted-foreground italic">
            Every system is built around actual business requirements — not templates or generic solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Software() {
  return (
    <>
      <SEO
        title="Custom Enterprise Software Development | Lucknow, India"
        description="We build secure, scalable B2B web & mobile applications using React, Node.js, and AI integration for government and corporate clients across Uttar Pradesh. Start your build."
        path="/services/enterprise-software-app-development"
      />

      {/* 1. Hero */}
      <ServiceHero
        badge="SOFTWARE DEVELOPMENT & DIGITAL SOLUTIONS"
        title="Digital Systems That Power"
        highlight="Business Operations"
        description="When your business depends on software — operations, customer experience, internal workflows — it needs to be reliable, scalable, and built correctly from day one. Poorly designed systems don't fail immediately — they create inefficiencies, slow teams down, and limit growth over time."
        stats={[
          { value: "200+", label: "Apps Shipped" },
          { value: "15+", label: "Tech Stacks" },
          { value: "99%", label: "Client Retention" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />

      {/* 2. Problem Section */}
      <ProblemApproach />

      {/* 3. Expertise / Authority */}
      <SystemsExpertise />

      {/* 4. Real Implementations / Case Study */}
      <CaseStudyCard
        sectionTitle="Real Systems. Real Results."
        industryTag="OPERATIONS-HEAVY BUSINESS / SCALABLE ENTERPRISE"
        headline="Automated Workflow & Approval System"
        problemSubheading="The Problem"
        problemText="Manual approvals and heavy dependency on key personnel created severe execution delays - slowing down daily operations and increasing hidden costs"
        solutionSubheading="What We Built"
        solutionText="A centralized automated workflow system featuring custom approval chains - instant notifications - precise task tracking - and a real-time executive dashboard"
        beforeItems={[
          "Manual approval bottlenecks",
          "Heavy dependency on individuals",
          "Slow and unpredictable execution"
        ]}
        afterItems={[
          "Automated approval chains",
          "System-driven accountability",
          "Real-time execution tracking"
        ]}
        metrics={[
          { value: "40%", label: "FASTER EXECUTION" },
          { value: "Zero", label: "MANUAL BOTTLENECKS" },
          { value: "100%", label: "ACCOUNTABILITY IMPROVED" }
        ]}
        closingLine="Built as a robust operational infrastructure - now driving faster execution and eliminating operational delays across the entire organization"
      >
        <div className="flex justify-center pt-2">
          <WhatsAppCTA
            context="software-case-study"
            section="case_study"
            buttonText="Build Something Similar"
            className="px-8 h-12 text-sm bg-accent/20 border border-accent/30 hover:bg-accent hover:border-accent shadow-none"
          />
        </div>
      </CaseStudyCard>

      {/* Micro-Proof Trust Marker */}
      <div className="flex justify-center pt-20 pb-4">
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase text-center w-full px-4">
          Systems built for real-world operations
        </p>
      </div>

      {/* 6. Full-Spectrum Development */}
      <BentoGrid
        label="CAPABILITIES"
        heading="Full-Spectrum Development"
        subheading="These are the building blocks we use to design and develop complete business systems. From core business platforms to integrations and performance layers, we build systems that operate reliably under real-world conditions."
        items={benefits}
      />

      {/* 7. SEO + Authority Layer */}
      <SEOAuthorityBlock />

      {/* 8. Digital Arsenal */}
      <DigitalSolutionsTabs />

      {/* 9. Tech Marquee + Calculator */}
      <TechMarquee label="OUR TECH STACK" items={techStack} />
      <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto px-4 pb-4">
        Every project starts with clarity. Define your requirements, and we'll help you scope a system that actually fits your operations.
      </p>
      <ScopingCalculator variant="software" />

      {/* Pricing / Scope Anchor */}
      <PricingAnchor />

      {/* 10. Final CTA */}
      <div className="section-container pb-2 text-sm text-muted-foreground">
        Need secure infrastructure before scaling?{" "}
        <Link to="/services/cybersecurity" className="text-cyan-400 hover:underline">Explore our IT &amp; cybersecurity solutions.</Link>
      </div>
      <CTASection
        heading="Building something new, or fixing systems that are slowing your business down?"
        subtext="We'll help you identify what's wrong, what's missing, and what needs to be built — with clarity and execution."
        context="software-cta"
      />
    </>
  );
}
