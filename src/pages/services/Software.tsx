import {
  Code, Smartphone, Globe, Cpu, Workflow, Database,
  Palette, TestTube, GitBranch, ShoppingCart, BarChart3, Headphones,
  Layers, Rocket, Lock, Gauge, Users, FileCode,
  Bot, Blocks, Wifi, CreditCard, Mail, Search,
  MonitorSmartphone, Cog, Calendar, MessageSquare, Clipboard, Cloud,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Code, title: "Custom Web Applications", description: "Responsive, high-performance web apps built with modern frameworks, optimized for speed, SEO, and seamless user experience.", span: "wide" },
  { icon: Smartphone, title: "Mobile Development", description: "Cross-platform and native mobile apps for iOS and Android, from MVPs to full-scale consumer products." },
  { icon: Globe, title: "SaaS Platforms", description: "Multi-tenant SaaS architecture with subscription management, analytics dashboards, and scalable cloud deployment." },
  { icon: Cpu, title: "AI & ML Integration", description: "Intelligent features powered by machine learning: recommendation engines, NLP chatbots, predictive analytics, and computer vision." },
  { icon: Workflow, title: "API Development", description: "RESTful and GraphQL APIs designed for performance, security, and seamless third-party integrations." },
  { icon: Database, title: "Cloud Infrastructure", description: "Scalable cloud architecture on AWS, GCP, or Azure with CI/CD pipelines, monitoring, and auto-scaling." },
  { icon: ShoppingCart, title: "E-Commerce Solutions", description: "Full-featured online stores with inventory management, payment gateways, order tracking, and multi-vendor marketplace capabilities.", span: "wide" },
  { icon: Palette, title: "UI/UX Design", description: "User-centric design systems with wireframing, prototyping, usability testing, and pixel-perfect implementation of brand identities." },
  { icon: TestTube, title: "QA & Testing", description: "Comprehensive testing strategies including unit tests, integration tests, E2E automation, performance benchmarking, and security scanning." },
  { icon: GitBranch, title: "DevOps & CI/CD", description: "Automated build pipelines, containerized deployments, infrastructure-as-code, and zero-downtime release strategies." },
  { icon: BarChart3, title: "Analytics & Dashboards", description: "Custom analytics platforms with real-time data visualization, KPI tracking, report generation, and business intelligence integrations." },
  { icon: Bot, title: "Chatbots & Virtual Assistants", description: "AI-powered conversational interfaces for customer support, lead qualification, appointment booking, and FAQ automation." },
  { icon: CreditCard, title: "Payment Integration", description: "Secure payment processing with Stripe, Razorpay, PayPal, and custom billing flows including subscriptions, invoicing, and refunds.", span: "wide" },
  { icon: Lock, title: "Security & Authentication", description: "OAuth 2.0, SSO, multi-factor authentication, role-based access control, and end-to-end encryption for data protection." },
  { icon: Mail, title: "Email & Notification Systems", description: "Transactional email pipelines, push notifications, SMS alerts, and in-app messaging with template management and delivery tracking." },
  { icon: Search, title: "SEO & Performance", description: "Technical SEO optimization, Core Web Vitals tuning, lazy loading, code splitting, and lighthouse score maximization." },
  { icon: MonitorSmartphone, title: "Progressive Web Apps", description: "Offline-capable, installable web applications with service workers, background sync, and native-like performance on any device." },
  { icon: Blocks, title: "CMS & Content Platforms", description: "Headless CMS integrations with Strapi, Sanity, or custom content management systems with WYSIWYG editors and media libraries." },
  { icon: Cloud, title: "Serverless Architecture", description: "Event-driven serverless functions, edge computing, and microservices for cost-efficient, infinitely scalable backend logic." },
  { icon: Users, title: "Multi-Tenant Systems", description: "Isolated data environments, tenant-specific configurations, white-labeling capabilities, and centralized administration panels." },
  { icon: Calendar, title: "Booking & Scheduling", description: "Appointment scheduling systems, calendar integrations, availability management, and automated reminder workflows." },
  { icon: MessageSquare, title: "Real-Time Features", description: "WebSocket-powered live chat, collaborative editing, real-time notifications, and multiplayer experiences." },
  { icon: Rocket, title: "MVP Development", description: "Rapid prototyping and minimum viable product development with lean methodology, getting your idea to market in weeks, not months." },
  { icon: Clipboard, title: "Project Management Tools", description: "Custom project management dashboards, Kanban boards, time tracking, resource allocation, and team collaboration platforms." },
  { icon: Cog, title: "Legacy Modernization", description: "Migrate aging systems to modern tech stacks with zero data loss, improved performance, and future-proof architecture." },
  { icon: Gauge, title: "Performance Optimization", description: "Database query optimization, caching strategies, CDN configuration, and load balancing for sub-second response times." },
  { icon: FileCode, title: "Open Source Contributions", description: "We build and maintain open-source tools, contribute to community projects, and leverage proven open-source ecosystems." },
  { icon: Headphones, title: "Post-Launch Support", description: "Ongoing maintenance, bug fixes, feature updates, server monitoring, and 24/7 support with guaranteed SLA response times." },
  { icon: Wifi, title: "IoT & Connected Devices", description: "Firmware development, device-cloud communication, MQTT/CoAP protocols, and dashboard interfaces for Internet of Things ecosystems." },
  { icon: Layers, title: "Micro-Frontend Architecture", description: "Independently deployable UI modules, shared design systems, and federated builds for large-scale frontend applications across multiple teams." },
];

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
        badge="SOFTWARE DEVELOPMENT"
        title="Digital Products That"
        highlight="Scale."
        description="Custom web applications, mobile platforms, and software systems built with modern stacks, designed to grow with your ambitions."
        stats={[
          { value: "200+", label: "Apps Shipped" },
          { value: "15+", label: "Tech Stacks" },
          { value: "99%", label: "Client Retention" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Full-Spectrum Development"
        subheading="From rapid MVPs to enterprise platforms, we build software that moves as fast as your business."
        items={benefits}
      />
      <TechMarquee label="OUR TECH STACK" items={techStack} />
      <ScopingCalculator variant="software" />
      <CTASection />
    </>
  );
}
