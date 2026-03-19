import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";

const projects = [
  {
    id: 1,
    title: "Quantum Enterprise Portal",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    description: "A comprehensive B2B dashboard processing millions of daily transactions.",
  },
  {
    id: 2,
    title: "EcoSmart Home Automation",
    category: "Smart Automation",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
    description: "Complete smart integration for a 15,000 sq ft luxury residence.",
  },
  {
    id: 3,
    title: "Apex Logistics Tracking",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    description: "Real-time fleet tracking and optimization software.",
  },
  {
    id: 4,
    title: "SunPower Grid Integration",
    category: "Solar",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
    description: "Commercial solar panel array with automated power routing.",
  },
  {
    id: 5,
    title: "Nexus City Surveillance",
    category: "Surveillance",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2058&auto=format&fit=crop",
    description: "AI-powered municipal camera network with facial recognition.",
  },
  {
    id: 6,
    title: "CinePro Studio Build",
    category: "AV Studio",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    description: "Acoustically treated Dolby Atmos mixing stage for film production.",
  },
  {
    id: 7,
    title: "FinTech Mobile App",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    description: "Secure cross-platform banking application with biometric auth.",
  },
  {
    id: 8,
    title: "Lumina Office Automation",
    category: "Smart Automation",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    description: "Occupancy-based lighting and climate control for a 50-story tower.",
  },
  {
    id: 9,
    title: "SecureVault Data Center",
    category: "Surveillance",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    description: "Multi-layered physical security and surveillance for tier-4 data center.",
  },
  {
    id: 10,
    title: "AeroDynamics Cloud Hub",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    description: "Global hybrid cloud deployment for a major airline carrier.",
  },
  {
    id: 11,
    title: "Titan Smart Warehouse",
    category: "Smart Automation",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    description: "Fully automated logistics hub with autonomous robotics integration.",
  },
  {
    id: 12,
    title: "Nova Smart City Grid",
    category: "Solar",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    description: "Intelligent solar grid management for a sustainable urban district.",
  },
  {
    id: 13,
    title: "Vanguard Defence HQ",
    category: "Surveillance",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    description: "High-security surveillance and access control for a sensitive facility.",
  },
  {
    id: 14,
    title: "Pulse FinTech Engine",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "Low-latency core banking processing engine for modern finance.",
  },
  {
    id: 15,
    title: "Echo Cinema Integration",
    category: "AV Studio",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
    description: "Immersive 4D cinema audio-visual experience for a flagship theatre.",
  },
  {
    id: 16,
    title: "Global Media CDN",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    description: "Global content delivery network optimization for a streaming giant.",
  },
  {
    id: 17,
    title: "Smart Retail Analytics",
    category: "Web Dev",
    image: "https://images.unsplash.com/photo-1534452285532-a58da5034637?q=80&w=2070&auto=format&fit=crop",
    description: "Real-time footfall and sentiment mapping for a premium retail chain.",
  },
  {
    id: 18,
    title: "Luxury Penthouse Integration",
    category: "Smart Automation",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    description: "Discrete, voice-controlled automation system for a Manhattan penthouse.",
  },
];

const categories = ["All", "Smart Automation", "Web Dev", "Solar", "AV Studio", "Surveillance", "Networking"];

const legacyProjects = [
  { title: "Smart City Surveillance", category: "Security", desc: "Integrated AI-powered surveillance system for a major metropolitan area, improving incident response times by 40%.", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop" },
  { title: "E-Commerce Platform", category: "Software Development", desc: "Custom-built, scalable e-commerce solution with integrated payment gateways and real-time inventory tracking.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop" },
  { title: "Corporate HQ Automation", category: "Smart Automation", desc: "Full-scale building automation for a 10-story corporate headquarters, optimizing energy consumption.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" },
  { title: "Cloud Migration Strategy", category: "Networking", desc: "Successful migration of legacy infrastructure to a hybrid cloud environment for a financial services firm.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" },
  { title: "Hospitality Tech Overhaul", category: "IT Consulting", desc: "Comprehensive IT strategy and implementation for a luxury hotel chain, enhancing guest digital experience.", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop" },
  { title: "Solar Power Integration", category: "Solar Power", desc: "Off-grid solar power solution for a remote research facility, providing 100% sustainable energy.", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop" },
  { title: "Cybersecurity Audit", category: "Security", desc: "Comprehensive vulnerability assessment and penetration testing for a regional banking institution.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" },
  { title: "Retail Inventory AI", category: "Software Development", desc: "AI-driven inventory forecasting tool for a large retail chain, reducing waste by 25%.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" },
  { title: "Smart Home Ecosystem", category: "Smart Automation", desc: "Complete IoT integration for a luxury residential complex with 50+ smart devices per unit.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop" },
  { title: "Data Center Networking", category: "Networking", desc: "High-availability network design and implementation for a growing regional data center.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop" },
  { title: "Fintech Mobile App", category: "Software Development", desc: "Secure, high-performance mobile banking application with biometric authentication and real-time alerts.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop" },
  { title: "Agricultural IoT", category: "Smart Automation", desc: "Precision farming solution with soil sensors and automated irrigation for large-scale farms.", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=600&auto=format&fit=crop" },
  { title: "Industrial CCTV Network", category: "Security", desc: "Thermal imaging and motion-tracking surveillance for a chemical manufacturing plant.", image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=600&auto=format&fit=crop" },
  { title: "Supply Chain Blockchain", category: "Software Development", desc: "Transparent tracking system for international shipping using distributed ledger technology.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop" },
  { title: "Smart Grid Management", category: "Solar Power", desc: "Advanced monitoring system for community-wide solar energy distribution and storage.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop" },
  { title: "Global VPN Deployment", category: "Networking", desc: "Secure remote access solution for 5,000+ employees across three continents.", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop" },
  { title: "EdTech Learning Portal", category: "Software Development", desc: "Interactive LMS platform with video conferencing and real-time student assessments.", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop" },
  { title: "Airport Security System", category: "Security", desc: "Biometric passenger verification and baggage tracking for an international terminal.", image: "https://images.unsplash.com/photo-1490430657723-4d607c1503fc?q=80&w=800&auto=format&fit=crop" },
  { title: "Smart Office Lighting", category: "Smart Automation", desc: "Adaptive lighting system that adjusts based on natural light levels and occupancy.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&auto=format&fit=crop" },
  { title: "Disaster Recovery Plan", category: "IT Consulting", desc: "Resilient backup and recovery strategy for a government agency handling critical data.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { title: "Telecom Fiber Network", category: "Networking", desc: "City-wide fiber optic infrastructure rollout for high-speed internet services.", image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?q=80&w=600&auto=format&fit=crop" },
  { title: "Medical Health Records", category: "Software Development", desc: "HIPAA-compliant patient management system for a network of multi-specialty hospitals.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" },
  { title: "Global Data Center Migration", category: "Networking", desc: "Successful migration of multi-petabyte datasets across three continents for a global enterprise.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
  { title: "Smart Campus Lighting", category: "Smart Automation", desc: "AI-driven adaptive lighting for a 200-acre university campus, reducing energy costs by 30%.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop" },
  { title: "Enterprise ERP Modernization", category: "Software Development", desc: "Complete digital transformation of legacy ERP systems for a manufacturing conglomerate.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop" },
  { title: "Oceanic Port Surveillance", category: "Security", desc: "Tidal-resistant, AI-powered maritime surveillance for one of the world's busiest ports.", image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?q=80&w=800&auto=format&fit=crop" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <>
      <ServiceHero
        badge="Our Work"
        title="Projects That Speak"
        highlight="For Themselves."
        description="From enterprise-grade surveillance networks to bespoke software platforms, every project is a testament to our engineering DNA."
        stats={[
          { value: "9000+", label: "Projects Delivered" },
          { value: "12", label: "Service Verticals" },
          { value: "450+", label: "Specialists Network" },
        ]}
      />

      <div className="py-24 section-container">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <ArrowRight className="text-white h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects found in this category.
          </div>
        )}

        {/* Legacy Projects Section */}
        <div className="mt-32 pt-16 border-t border-border">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Delivering Excellence Through Innovation
            </h2>
            <p className="text-muted-foreground">
              From large-scale infrastructure projects to bespoke software solutions, we take pride in every challenge we overcome and every solution we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legacyProjects.map((legacy, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row lg:flex-col group">
                <div className="sm:w-2/5 lg:w-full h-48 sm:h-auto lg:h-48 overflow-hidden shrink-0">
                  <img src={legacy.image} alt={legacy.title} width="800" height="600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded inline-block mb-2">
                      {legacy.category}
                    </span>
                    <h4 className="text-lg font-bold text-foreground mb-1">{legacy.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{legacy.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
