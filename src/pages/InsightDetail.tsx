import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, ArrowLeft, Calendar, User, Globe } from "lucide-react";
import { format } from "date-fns";

interface PublicIntel {
  title: string;
  content: string;
  updated_at: string;
}

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const [insight, setInsight] = useState<PublicIntel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("vanguard_notes")
        .select("title, content, updated_at, visibility")
        .eq("id", id)
        .single();

      if (error || !data || data.visibility !== "global") {
        setError(true);
      } else {
        setInsight(data);
      }
      setLoading(false);
    };

    fetchInsight();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-6" />
        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase animate-pulse">
          Decrypting Architecture...
        </span>
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center">
        <Globe className="w-16 h-16 text-slate-700 mb-6" />
        <h1 className="text-3xl font-bold tracking-widest uppercase text-white mb-4">
          Intelligence Missing
        </h1>
        <p className="text-slate-400 max-w-md mb-8">
          The requested intelligence report could not be found, or it requires elevated Vanguard clearance.
        </p>
        <Link 
          to="/insights" 
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg uppercase tracking-widest text-sm transition-colors"
        >
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-brand-dark pt-32 pb-20 relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <Link 
          to="/insights" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights Hub
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500 uppercase tracking-widest mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-500" />
              {format(new Date(insight.updated_at), "MMMM do, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-500" />
              Spirecrest Engineering
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-8">
            {insight.title}
          </h1>
          
          <div className="w-full h-px bg-gradient-to-r from-cyan-500/50 via-white/10 to-transparent" />
        </header>

        {/* Prose markdown wrapper strictly using Tailwind Typography plugin */}
        <div className="prose prose-invert prose-cyan lg:prose-lg max-w-none 
          prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight 
          prose-a:text-cyan-400 hover:prose-a:text-cyan-300 
          prose-code:text-cyan-300 prose-code:bg-white/[0.03] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
          prose-pre:bg-[#020617] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl
          prose-img:rounded-xl prose-img:border prose-img:border-white/10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {insight.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
