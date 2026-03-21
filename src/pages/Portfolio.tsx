import { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import { supabase } from "@/lib/supabase";

const projects = [
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

const NEON_CARD = "group relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted cursor-pointer border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300";

function MasonryCard({ title, category, desc, image, id }: { title: string; category: string; desc: string; image: string; id?: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      key={id ?? title}
      className={NEON_CARD}
    >
      <img
        src={image}
        alt={title}
        width="800"
        height="600"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 px-2 py-1 rounded">
              {category}
            </span>
            <ArrowRight className="text-white h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from("public_portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFetchedProjects(data);
      const fetchedCats = new Set(data.map((p: any) => p.category));
      const staticCats = new Set(projects.map((p) => p.category));
      const allCats = ["All", ...Array.from(new Set([...fetchedCats, ...staticCats]))];
      setCategories(allCats as string[]);
    } else {
      // Even if fetch fails, populate categories from static array
      const staticCats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
      setCategories(staticCats);
    }
    setLoading(false);
  };

  const filteredFetched = fetchedProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const filteredStatic = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const skeletons = [...Array(6)].map((_, i) => (
    <motion.div
      key={`skeleton-${i}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl aspect-[4/3] bg-muted/40 animate-pulse border border-border/50"
    />
  ));

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
        {/* Single shared category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ── SECTION 1: Recent Vanguard Deployments (Supabase CMS) ── */}
        {(loading || fetchedProjects.length > 0) && (
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Recent Spirecrest Solutions Deployments
              </h2>
              <p className="text-muted-foreground text-sm">
                Live operations deployed directly from the SSPL CMS.
              </p>
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {loading
                  ? skeletons
                  : filteredFetched.map((p) => (
                    <MasonryCard
                      key={p.id}
                      id={p.id}
                      title={p.title}
                      category={p.category}
                      desc={p.description}
                      image={p.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
            {!loading && filteredFetched.length === 0 && fetchedProjects.length > 0 && (
              <div className="text-center py-10 text-muted-foreground text-sm">
                No CMS deployments in this category.
              </div>
            )}
          </div>
        )}

        {/* ── SECTION 2: Delivering Excellence Through Innovation (Static) ── */}
        <div className={fetchedProjects.length > 0 ? "pt-16 border-t border-border" : ""}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Delivering Excellence Through Innovation
            </h2>
            <p className="text-muted-foreground">
              From large-scale infrastructure projects to bespoke software solutions, we take pride in every challenge we overcome and every solution we deliver.
            </p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {loading
                ? skeletons
                : filteredStatic.map((p) => (
                  <MasonryCard
                    key={p.title}
                    title={p.title}
                    category={p.category}
                    desc={p.desc}
                    image={p.image}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
          {!loading && filteredStatic.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No active nodes mapped to this routing classification.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
