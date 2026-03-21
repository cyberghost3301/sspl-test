import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Calendar } from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import { format } from "date-fns";

interface PublicIntel {
  id: string;
  title: string;
  content: string;
  updated_at: string;
}

export default function Insights() {
  const [insights, setInsights] = useState<PublicIntel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalIntel = async () => {
      try {
        const { data, error } = await supabase
          .from("vanguard_notes")
          .select("id, title, content, updated_at")
          .eq("visibility", "global")
          .order("updated_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setInsights(data);
        }
      } catch (err) {
        console.warn("Graceful degradation: API error fetching insights.", err);
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalIntel();
  }, []);

  // Simple function to extract a brief excerpt from markdown
  const getExcerpt = (markdown: string) => {
    // Remove markdown headers
    let plainText = markdown.replace(/^#+ (.*$)/gim, "");
    // Remove markdown links
    plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    // Remove markdown images
    plainText = plainText.replace(/!\[([^\]]+)\]\([^)]+\)/g, "");
    // Remove markdown bold/italics
    plainText = plainText.replace(/[*_]{1,3}(.*?)[*_]{1,3}/g, "$1");

    return plainText.trim().substring(0, 150) + (plainText.length > 150 ? "..." : "");
  };

  return (
    <>
      <ServiceHero
        badge="Spirecrest Intelligence"
        title="Engineering Insights &"
        highlight="Architecture"
        description="Declassified strategies and technological insights from the minds behind Spirecrest Enterprise"
        stats={[]}
      />
      <div className="bg-brand-dark pb-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 max-w-7xl pt-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
              <span className="text-slate-400 font-mono text-sm tracking-widest uppercase animate-pulse">
                Decoupling from Spirecrest...
              </span>
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
              <p className="text-slate-500 font-mono uppercase tracking-widest">
                New insights and intelligence reports are currently being compiled. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insights.map((insight) => (
                <Link
                  key={insight.id}
                  to={`/insights/${insight.id}`}
                  className="group bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)] hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-colors" />

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(insight.updated_at), "MMMM do, yyyy")}
                  </div>

                  <h2 className="text-xl font-bold text-slate-100 leading-tight mb-4 group-hover:text-cyan-400 transition-colors">
                    {insight.title}
                  </h2>

                  <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                    {getExcerpt(insight.content)}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-cyan-500 mt-auto">
                    Access Intelligence <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
