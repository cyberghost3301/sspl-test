import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code, Smartphone, Globe, Cpu, Workflow, Database,
  Palette, TestTube, GitBranch, ShoppingCart, BarChart3, Headphones,
  Layers, Rocket, Lock, Gauge, Users, FileCode,
  Bot, Blocks, Wifi, CreditCard, Mail, Search,
  MonitorSmartphone, Cog, Calendar, MessageSquare, Clipboard, Cloud,
  ShieldCheck, LucideIcon, Store, BrainCircuit, PenTool, Megaphone,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Code, title: "Custom Software Development", description: "Building unique web or mobile apps tailored exactly to a business's specific needs, from MVPs to full-scale enterprise platforms.", span: "wide" },
  { icon: Smartphone, title: "Mobile Development", description: "Cross-platform and native mobile apps for iOS and Android, from rapid prototypes to consumer-ready products." },
  { icon: Globe, title: "SaaS Platforms", description: "Multi-tenant SaaS architecture with subscription management, analytics dashboards, and scalable cloud deployment." },
  { icon: Cpu, title: "AI & ML Solutions", description: "Using Artificial Intelligence and Machine Learning to automate repetitive tasks, find trends in business data, and build predictive models." },
  { icon: Bot, title: "Chatbots & Virtual Assistants", description: "AI-powered helpers that provide 24/7 customer support via text or voice: lead qualification, appointment booking, and FAQ automation." },
  { icon: Workflow, title: "API Development", description: "RESTful and GraphQL APIs designed for performance, security, and seamless third-party integrations." },
  { icon: Database, title: "ERP & CRM Implementation", description: "Setting up enterprise resource planning and customer relationship management systems to streamline operations and boost revenue.", span: "wide" },
  { icon: ShoppingCart, title: "E-Governance & E-Commerce", description: "Creating secure portals for government services or robust online stores with payment gateways, inventory management, and multi-vendor marketplace capabilities." },
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
    description: "We don't use templates. Every line of code is purpose-built for your business logic, user flows, and growth trajectory.",
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
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Click through to see exactly how we approach each domain: the tools, the metrics, and the methodology.</p>
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

export default function Software() {
  return (
    <>
      <ServiceHero
        badge="SOFTWARE DEVELOPMENT & DIGITAL SOLUTIONS"
        title="Digital Products That"
        highlight="Scale."
        description="Custom web applications, mobile platforms, AI integrations, and enterprise systems built with modern stacks, designed to grow with your ambitions."
        stats={[
          { value: "200+", label: "Apps Shipped" },
          { value: "15+", label: "Tech Stacks" },
          { value: "99%", label: "Client Retention" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Full-Spectrum Development"
        subheading="From rapid MVPs to enterprise platforms: custom software, AI, e-commerce, and branding under one roof."
        items={benefits}
      />
      <DigitalSolutionsTabs />
      <TechMarquee label="OUR TECH STACK" items={techStack} />
      <ScopingCalculator variant="software" />
      <CTASection />
    </>
  );
}
