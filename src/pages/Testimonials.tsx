import { useState, useEffect } from "react";
import { m as motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ServiceHero from "@/components/services/ServiceHero";
import { supabase } from "@/lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("public_testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  return (
    <>
      <ServiceHero
        badge="Client Voices"
        title="Trusted by Leaders."
        highlight="Loved by Teams."
        description="Real stories from the businesses and individuals we've partnered with. Hear what makes working with Spirecrest different."
        stats={[
          { value: "12+", label: "Industries Served" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "9000+", label: "Projects Delivered" },
        ]}
      />

      <div className="py-24 section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Trust from Industry Leaders
          </h2>
          <p className="text-muted-foreground">
            We pride ourselves on delivering excellence across all our service domains. Our success is measured by the satisfaction and growth of our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-card/40 border border-border p-8 rounded-2xl mt-8 h-64 animate-pulse relative">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full border-4 border-background shadow-sm bg-muted animate-pulse" />
                <div className="pt-4 h-full flex flex-col justify-between">
                   <div className="w-24 h-4 bg-muted animate-pulse rounded" />
                   <div className="space-y-2 mt-4 flex-1">
                      <div className="w-full h-3 bg-muted animate-pulse rounded" />
                      <div className="w-5/6 h-3 bg-muted animate-pulse rounded" />
                      <div className="w-4/6 h-3 bg-muted animate-pulse rounded" />
                   </div>
                   <div>
                      <div className="w-32 h-5 bg-muted animate-pulse rounded mb-2" />
                      <div className="w-20 h-4 bg-muted animate-pulse rounded" />
                   </div>
                </div>
              </div>
            ))
          ) : (
            testimonials.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.id}
                className="bg-card border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 p-8 rounded-2xl relative mt-8 flex flex-col"
              >
                <div className="absolute -top-8 left-8">
                  <Avatar className="h-16 w-16 border-4 border-background shadow-sm">
                    <AvatarImage src={item.image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="pt-4 flex-1 flex flex-col">
                  <div className="flex gap-1 mb-4 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed flex-1">
                    "{item.content}"
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-bold text-foreground font-display">{item.name}</h4>
                    <p className="text-sm text-primary font-medium">
                      {item.position}{item.position && item.business ? ", " : ""}{item.business}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
