import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Image as ImageIcon, Plus, Loader2, Layout, MessageSquare, Trash2, UploadCloud, Globe, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function WebContent() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "portfolio">("testimonials");
  const [loading, setLoading] = useState(false);

  // Data fetching
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);

  // Forms
  const [testiForm, setTestiForm] = useState({ name: "", position: "", business: "", content: "" });
  const [portForm, setPortForm] = useState({ title: "", category: "", description: "" });
  
  const [testiImage, setTestiImage] = useState<File | null>(null);
  const [portImage, setPortImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "testimonials") {
      const { data, error } = await supabase.from("public_testimonials").select("*").order("created_at", { ascending: false });
      if (!error) setTestimonials(data || []);
    } else {
      const { data, error } = await supabase.from("public_portfolios").select("*").order("created_at", { ascending: false });
      if (!error) setPortfolios(data || []);
    }
    setLoading(false);
  };

  const uploadAsset = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("public-web-assets").upload(`cms/${fileName}`, file);
    
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage.from("public-web-assets").getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  };

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiForm.name || !testiForm.content) return toast.error("Name and Content required.");
    
    setIsSubmitting(true);
    const toastId = toast.loading("Deploying testimonial...");

    try {
      let imageUrl = null;
      if (testiImage) {
        toast.loading("Uploading visual asset...", { id: toastId });
        imageUrl = await uploadAsset(testiImage);
      }

      const { data, error } = await supabase.from("public_testimonials").insert([{
        ...testiForm,
        image_url: imageUrl
      }]).select().single();

      if (error) throw error;

      toast.success("Testimonial deployed to edge.", { id: toastId });
      setTestimonials([data, ...testimonials]);
      setTestiForm({ name: "", position: "", business: "", content: "" });
      setTestiImage(null);
    } catch (err: any) {
      toast.error(`Deployment failed: ${err.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portForm.title || !portForm.category) return toast.error("Title and Category required.");
    
    setIsSubmitting(true);
    const toastId = toast.loading("Deploying portfolio node...");

    try {
      let imageUrl = null;
      if (portImage) {
        toast.loading("Uploading visual asset...", { id: toastId });
        imageUrl = await uploadAsset(portImage);
      }

      const { data, error } = await supabase.from("public_portfolios").insert([{
        ...portForm,
        image_url: imageUrl
      }]).select().single();

      if (error) throw error;

      toast.success("Portfolio deployed to edge.", { id: toastId });
      setPortfolios([data, ...portfolios]);
      setPortForm({ title: "", category: "", description: "" });
      setPortImage(null);
    } catch (err: any) {
      toast.error(`Deployment failed: ${err.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRecord = async (id: string, table: "public_testimonials" | "public_portfolios") => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    const toastId = toast.loading("Purging records...");
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
       toast.error(`Purge failed: ${error.message}`, { id: toastId });
    } else {
       toast.success("Record purged.", { id: toastId });
       if (table === "public_testimonials") setTestimonials(testimonials.filter(t => t.id !== id));
       else setPortfolios(portfolios.filter(p => p.id !== id));
    }
  };

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col text-white pb-0 pr-0">
      <header className="mb-6 flex-none pr-4 md:pr-6">
        <div className="mb-3">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-1 text-slate-100">
            Web Content CMS
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Public Edge Deployment Engine
          </p>
        </div>
      </header>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs transition-all ${activeTab === 'testimonials' ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <MessageSquare className="w-4 h-4" /> Testimonials
        </button>
        <button
          onClick={() => setActiveTab("portfolio")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold tracking-widest uppercase text-xs transition-all ${activeTab === 'portfolio' ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <Layout className="w-4 h-4" /> Portfolio Cases
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 md:pr-6 custom-scrollbar pb-10 space-y-8">
        {/* Forms Row */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-xl font-bold tracking-widest uppercase mb-6 flex items-center gap-2 relative z-10 text-cyan-400">
            <Plus className="w-5 h-5" /> 
            {activeTab === 'testimonials' ? 'Deploy Testimonial' : 'Deploy Portfolio Node'}
          </h2>

          {/* Testimonials Form - always mounted, CSS hidden when inactive */}
          <div className={activeTab === 'testimonials' ? 'relative z-10' : 'hidden'}>
            <form onSubmit={handleSubmitTestimonial} className="grid grid-cols-2 gap-4">
              <input value={testiForm.name} onChange={e => setTestiForm({...testiForm, name: e.target.value})} className="col-span-2 md:col-span-1 bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="Signatory Name *" required />
              <input value={testiForm.position} onChange={e => setTestiForm({...testiForm, position: e.target.value})} className="col-span-2 md:col-span-1 bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="Corporate Position" />
              <input value={testiForm.business} onChange={e => setTestiForm({...testiForm, business: e.target.value})} className="col-span-2 bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="Entity / Business Name" />
              <textarea value={testiForm.content} onChange={e => setTestiForm({...testiForm, content: e.target.value})} className="col-span-2 bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600 h-24 resize-none" placeholder="Testimonial Output Context *" required />
              <div className="col-span-2 flex items-center gap-4 border border-dashed border-white/10 rounded-lg p-3 bg-white/[0.02]">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-widest cursor-pointer rounded transition-colors text-slate-300">
                  <UploadCloud className="w-4 h-4" /> {testiImage ? "Asset Queued" : "Attach Image"}
                  <input type="file" accept="image/*" onChange={e => setTestiImage(e.target.files?.[0] || null)} className="hidden" />
                </label>
                <span className="text-xs text-slate-500 font-mono truncate max-w-[200px]">{testiImage?.name || "No asset attached"}</span>
              </div>
              <div className="col-span-2 flex justify-end mt-2">
                <button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest uppercase text-xs py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Execute Push
                </button>
              </div>
            </form>
          </div>

          {/* Portfolio Form - always mounted, CSS hidden when inactive */}
          <div className={activeTab === 'portfolio' ? 'relative z-10' : 'hidden'}>
            <form onSubmit={handleSubmitPortfolio} className="grid grid-cols-2 gap-4">
              <input value={portForm.title} onChange={e => setPortForm({...portForm, title: e.target.value})} className="col-span-2 md:col-span-1 bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="Operation Title *" required />
              <input value={portForm.category} onChange={e => setPortForm({...portForm, category: e.target.value})} className="col-span-2 md:col-span-1 bg-[#020617] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="Classification Category *" required />
              <textarea value={portForm.description} onChange={e => setPortForm({...portForm, description: e.target.value})} className="col-span-2 bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600 h-24 resize-none" placeholder="Execution Summary" />
              <div className="col-span-2 flex items-center gap-4 border border-dashed border-white/10 rounded-lg p-3 bg-white/[0.02]">
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-widest cursor-pointer rounded transition-colors text-slate-300">
                  <UploadCloud className="w-4 h-4" /> {portImage ? "Asset Queued" : "Attach Image"}
                  <input type="file" accept="image/*" onChange={e => setPortImage(e.target.files?.[0] || null)} className="hidden" />
                </label>
                <span className="text-xs text-slate-500 font-mono truncate max-w-[200px]">{portImage?.name || "No asset attached"}</span>
              </div>
              <div className="col-span-2 flex justify-end mt-2">
                <button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest uppercase text-xs py-3 px-8 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Execute Push
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Data Grid */}
        <div className="space-y-4">
           <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-4 border-b border-white/10 pb-2">Active Edge Instances</h3>
           {loading ? (
             <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 text-cyan-500 animate-spin" /></div>
           ) : (
             <div className="grid grid-cols-1 gap-4">
                {(activeTab === 'testimonials' ? testimonials : portfolios).map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 bg-[#0f172a]/50 border border-white/5 rounded-xl p-4 md:items-center hover:bg-[#0f172a] transition-colors group">
                    {item.image_url ? (
                       <img src={item.image_url} alt="Asset" className="w-16 h-16 rounded object-cover flex-none bg-black/50 border border-white/10" />
                    ) : (
                       <div className="w-16 h-16 rounded bg-[#020617] border border-white/10 flex items-center justify-center flex-none">
                         <ImageIcon className="w-6 h-6 text-slate-700" />
                       </div>
                    )}
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-sm text-slate-200 uppercase tracking-widest truncate">{item.title || item.name}</h4>
                       <p className="text-xs font-mono text-cyan-500 mb-1">{item.category || item.business}</p>
                       <p className="text-xs font-mono text-slate-400 line-clamp-2 pr-4">{item.description || item.content}</p>
                    </div>
                    <div className="flex-none flex items-center gap-2">
                       <button onClick={() => deleteRecord(item.id, activeTab === 'testimonials' ? 'public_testimonials' : 'public_portfolios')} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
                {(activeTab === 'testimonials' ? testimonials : portfolios).length === 0 && (
                   <p className="text-xs font-mono uppercase text-slate-500 italic py-4">No instances synchronized.</p>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
