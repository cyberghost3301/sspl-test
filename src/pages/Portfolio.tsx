import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Mock portfolio data
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
];

const categories = ["All", "Smart Automation", "Web Dev", "Solar", "AV Studio", "Surveillance"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <div className="pt-24 pb-24 section-container min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          Our <span className="text-primary">Portfolio</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          A showcase of our finest work across 9,000+ completed projects worldwide.
        </p>
      </div>

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
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <ArrowRight className="text-white h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
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
    </div>
  );
}
