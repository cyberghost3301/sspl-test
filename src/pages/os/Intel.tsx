import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Globe, Lock, ShieldAlert, Search, Loader2, ArrowLeft, Trash2, History, X, RotateCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { logActivity } from "@/lib/logger";

// BlockNote Imports
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

type Visibility = "private" | "global" | "custom";

interface VanguardNote {
  id: string;
  title: string;
  content_markdown: string;
  visibility: Visibility;
  author_id: string;
  author_name: string | null;
  updated_at: string;
}

export default function Intel() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const [notes, setNotes] = useState<VanguardNote[]>([]);
  const [activeNote, setActiveNote] = useState<VanguardNote | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeTab, setActiveTab] = useState<"private" | "global">("private");
  const [searchQuery, setSearchQuery] = useState("");

  // Version History state
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyNoteId, setHistoryNoteId] = useState<string | null>(null);
  const [historyNoteTitle, setHistoryNoteTitle] = useState("");
  const [activeHistory, setActiveHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Debouncing ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BlockNote
  const editor = useCreateBlockNote();

  useEffect(() => {
    // We physically force the data-color-mode to deep dark
    document.documentElement.setAttribute("data-color-mode", "dark");
    fetchUserAndNotes();
  }, []);

  // Esc keydown handler for modals/views (Intel has none right now but included for Phase 16 completeness)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveNote(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // When a note is opened, parse its markdown into blocks.
  useEffect(() => {
    const loadBlocks = async () => {
      if (activeNote && editor) {
        const blocks = await editor.tryParseMarkdownToBlocks(activeNote.content_markdown || "");
        editor.replaceBlocks(editor.document, blocks);
      }
    };
    if (activeNote) {
      loadBlocks();
    }
  }, [activeNote?.id, editor]);

  const fetchUserAndNotes = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Authentication required");
      return;
    }
    
    setCurrentUser(user);
    
    // Fetch full name from team_profiles for author attribution
    const { data: profileRow } = await supabase
      .from('team_profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();
    if (profileRow?.full_name) setUserFullName(profileRow.full_name);
    
    // Fetch all notes the user has access to (owned or global)
    const { data: fetchedNotes, error } = await supabase
      .from("vanguard_notes")
      .select("*")
      .or(`author_id.eq.${user.id},visibility.eq.global`)
      .order("updated_at", { ascending: false });

    if (error) {
       if (error.code === '42P01') {
          // Table doesn't exist yet, graceful fallback
          setNotes([]);
       } else {
          toast.error(`Fetch failed: ${error.message}`);
       }
    } else {
       setNotes(fetchedNotes || []);
    }
    setLoading(false);
  };

  const handleCreateNote = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Authentication required to create intel.");
      return;
    }

    const newNote = {
      title: "Untitled Strategy",
      content_markdown: "## Execute the objective\n\nBegin typing...",
      visibility: activeTab === "global" ? "global" : "private",
      author_id: user.id,
      author_name: userFullName,
    };

    const { data, error } = await supabase
      .from("vanguard_notes")
      .insert([newNote])
      .select()
      .single();

    if (error) {
      toast.error(`Intel Initialization Failed: ${error.message}`);
      return;
    }

    setNotes([data, ...notes]);
    setActiveNote(data);
    toast.success("Intel record initialized.");
    logActivity('CREATED', 'INTEL', `Created Intel Note: ${data.title} (${data.id.substring(0, 8)})`);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this intel?")) return;
    const toastId = toast.loading("Purging intellectual property...");
    const { error } = await supabase.from("vanguard_notes").delete().eq("id", id);
    if (error) {
       toast.error(`Purge failed: ${error.message}`, { id: toastId });
       return;
    }
    toast.success("Intel removed.", { id: toastId });
    logActivity('DELETED', 'INTEL', `Deleted Intel Note ID: ${id.substring(0, 8)}`);
    setNotes(notes.filter(n => n.id !== id));
    setActiveNote(null);
  };

  // Debounced Auto-Save
  const updateActiveNoteField = (updates: Partial<VanguardNote>) => {
    if (!activeNote) return;

    // Optimistic UI update
    const updatedNote = { ...activeNote, ...updates, updated_at: new Date().toISOString() };
    setActiveNote(updatedNote);
    
    setNotes((prevNotes) => 
      prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );

    // Debounce the Supabase save by 1.5 seconds
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      // VERSION SNAPSHOT: capture the state before overwriting
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("vanguard_notes_versions").insert([{
            note_id: updatedNote.id,
            editor_id: user.id,
            editor_name: userFullName ?? user.email,
            previous_content: activeNote.content_markdown,
            new_content: updatedNote.content_markdown,
          }]);
        }
      } catch {
        // Silent fail — versioning must never break the main save
      }

      const { error } = await supabase
        .from("vanguard_notes")
        .update({
          title: updatedNote.title,
          content_markdown: updatedNote.content_markdown,
          visibility: updatedNote.visibility,
          updated_at: updatedNote.updated_at,
        })
        .eq("id", updatedNote.id);

      if (error) {
        toast.error(`Auto-save failed: ${error.message}`);
      }
    }, 1500);
  };

  const onEditorChange = async () => {
    if (!activeNote) return;
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    updateActiveNoteField({ content_markdown: markdown });
  };

  const openHistoryModal = async (e: React.MouseEvent, note: VanguardNote) => {
    e.stopPropagation();
    setHistoryNoteId(note.id);
    setHistoryNoteTitle(note.title);
    setHistoryLoading(true);
    setHistoryModalOpen(true);
    setActiveHistory([]);

    const { data, error } = await supabase
      .from("vanguard_notes_versions")
      .select("*")
      .eq("note_id", note.id)
      .order("edited_at", { ascending: false });

    if (!error && data) setActiveHistory(data);
    setHistoryLoading(false);
  };

  const handleRestoreVersion = async (version: any) => {
    if (!activeNote && !historyNoteId) return;
    const targetNoteId = historyNoteId!;
    const toastId = toast.loading("Restoring version...");
    const { error } = await supabase
      .from("vanguard_notes")
      .update({ content_markdown: version.previous_content, updated_at: new Date().toISOString() })
      .eq("id", targetNoteId);
    if (error) {
      toast.error(`Restore failed: ${error.message}`, { id: toastId });
      return;
    }
    // Refresh local state
    setNotes(prev => prev.map(n => n.id === targetNoteId ? { ...n, content_markdown: version.previous_content } : n));
    toast.success("Version restored successfully.", { id: toastId });
    setHistoryModalOpen(false);
  };

  // Client-side extremely fast filtering mechanism
  const filteredNotes = notes.filter((note) => {
    const matchesTab = activeTab === "private" 
      ? note.visibility === "private" && note.author_id === currentUser?.id
      : note.visibility === "global";
      
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col relative text-white">
      {/* ── SINGLE COLUMN FULLSCREEN ROUTING ── */}
      
      {!activeNote ? (
        /* DIRECTORY VIEW */
        <div className="flex-1 flex flex-col bg-slate-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <header className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-bold tracking-widest uppercase mb-2">Vanguard Intel</h1>
              <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Global operations & private scratchpads</p>
            </div>
            <button 
              onClick={handleCreateNote}
              className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)] md:w-auto w-full"
            >
              <Plus className="w-5 h-5" /> New Intel Log
            </button>
          </header>

          <div className="p-6 md:p-8 bg-white/[0.01]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex bg-white/[0.05] p-1.5 rounded-xl border border-white/5 md:w-[300px]">
                <button 
                  onClick={() => setActiveTab("private")}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === "private" ? "bg-slate-900 text-cyan-400 shadow-md border border-white/5 scale-100" : "text-slate-400 hover:text-white scale-95"}`}
                >
                  Private Code
                </button>
                <button 
                  onClick={() => setActiveTab("global")}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === "global" ? "bg-slate-900 text-cyan-400 shadow-md border border-white/5 scale-100" : "text-slate-400 hover:text-white scale-95"}`}
                >
                  Global Network
                </button>
              </div>

              <div className="relative md:w-1/3">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search architecture..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
                  <p className="text-slate-400 font-mono text-sm tracking-widest uppercase animate-pulse">Decrypting network files...</p>
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-20 bg-white/[0.02] border border-white/5 rounded-2xl border-dashed">
                  <ShieldAlert className="w-12 h-12 text-slate-600 mb-4" />
                  <h2 className="text-xl font-bold tracking-widest uppercase text-slate-400 mb-2">No Records Found</h2>
                  <p className="text-sm font-mono text-slate-500 max-w-sm">No intel metrics match your current tactical filters.</p>
                </div>
              ) : (
                  filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setActiveNote(note)}
                      className="bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 transition-all cursor-pointer group hover:bg-white/[0.04] shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col min-h-[160px]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center flex-none">
                          {note.visibility === "private" ? (
                            <Lock className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                          ) : note.visibility === "global" ? (
                            <Globe className="w-5 h-5 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => openHistoryModal(e, note)}
                            title="Version History"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-400 hover:bg-amber-400/10 transition-colors border border-transparent hover:border-amber-400/20"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase px-2 py-1 bg-white/5 rounded-md border border-white/10">
                            {format(new Date(note.updated_at), "MMM do")}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-200 group-hover:text-cyan-400 transition-colors mb-2 line-clamp-1">{note.title}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-xs font-mono text-slate-500 tracking-wider uppercase">
                          ID: {note.id.substring(0, 8)}
                        </p>
                        {note.author_name && (
                          <p className="text-[10px] font-mono text-slate-600 tracking-wider">
                            By: {note.author_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE COLUMN EDITOR VIEW */
        <div className="flex-1 flex flex-col bg-slate-800 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex-none p-4 md:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between bg-slate-800 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto flex-1">
              <button 
                onClick={() => setActiveNote(null)}
                className="w-10 h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white flex-none"
                title="Return to Directory"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={activeNote.title}
                onChange={(e) => updateActiveNoteField({ title: e.target.value })}
                className="bg-transparent text-xl md:text-2xl font-bold tracking-widest uppercase text-white outline-none w-full max-w-md focus:border-b focus:border-cyan-500/50 transition-colors pb-1 placeholder:text-slate-700"
                placeholder="Document Title"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest hidden md:inline-block">
                Auto-saved
              </span>
              <button onClick={() => handleDeleteNote(activeNote.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-red-400/20" title="Delete Intel">
                <Trash2 className="w-4 h-4" />
              </button>
              <select 
                value={activeNote.visibility}
                onChange={(e) => updateActiveNoteField({ visibility: e.target.value as Visibility })}
                className="appearance-none bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white outline-none cursor-pointer focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors hover:bg-white/10"
              >
                <option value="private" className="bg-slate-900">Private</option>
                <option value="global" className="bg-slate-900">Global</option>
                <option value="custom" className="bg-slate-900">Custom</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-900 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-10 px-6">
              <style>{`
                .bn-container {
                   --bn-colors-editor-text: #f8fafc;
                   --bn-colors-editor-background: transparent;
                   --bn-colors-menu-text: #94a3b8;
                   --bn-colors-menu-background: #020617;
                   --bn-colors-menu-background-hover: #1e293b;
                   font-family: inherit;
                }
                .bn-inline-content {
                   line-height: 1.8;
                }
              `}</style>
              <BlockNoteView 
                editor={editor} 
                onChange={onEditorChange}
                theme="dark"
                className="min-h-[500px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── VERSION HISTORY MODAL ── */}
      {historyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setHistoryModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h2 className="font-bold text-sm tracking-widest uppercase text-amber-400 flex items-center gap-2">
                  <History className="w-4 h-4" /> Version Timeline
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-xs">{historyNoteTitle}</p>
              </div>
              <button onClick={() => setHistoryModalOpen(false)} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 max-h-[460px] overflow-y-auto custom-scrollbar space-y-3">
              {historyLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                </div>
              ) : activeHistory.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
                  <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">No version snapshots recorded yet.</p>
                  <p className="text-slate-700 text-[10px] font-mono mt-1">Snapshots are captured on every auto-save.</p>
                </div>
              ) : (
                activeHistory.map((v, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-amber-500/20 transition-colors group">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center gap-1 mt-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60 group-hover:bg-amber-400 transition-colors shrink-0" />
                      {i < activeHistory.length - 1 && <div className="w-px flex-1 bg-white/5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-300">{v.editor_name ?? 'Unknown'}</p>
                      <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                        {v.edited_at ? new Date(v.edited_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : '—'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRestoreVersion(v)}
                      title="Restore this version"
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-400/70 hover:text-amber-400 border border-amber-400/20 hover:border-amber-400/50 hover:bg-amber-400/10 px-2.5 py-1.5 rounded-lg transition-all shrink-0"
                    >
                      <RotateCcw className="w-3 h-3" /> Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
