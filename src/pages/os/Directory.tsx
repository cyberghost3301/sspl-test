import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Search, Loader2, Building, Mail, Phone, Plus, MessageSquare, Clock, Trash2, X, FolderOpen, FileText, ExternalLink, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";

interface TimelineEvent {
  id: string;
  type: "meeting" | "note" | "system";
  description: string;
  date: string;
}

interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  timeline_events: TimelineEvent[];
  custom_fields?: Record<string, string>;
  created_at: string;
  author_id?: string;
  author_name?: string;
}

export default function Directory() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>("");

  // Linked Assets State
  const [linkedVaultFiles, setLinkedVaultFiles] = useState<any[]>([]);
  const [linkedNotes, setLinkedNotes] = useState<any[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);

  // New Note State
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // New Entity Modal State
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [newContact, setNewContact] = useState({ company: "", name: "", email: "", phone: "" });
  const [dynamicProps, setDynamicProps] = useState<{ key: string; value: string }[]>([]);

  // Esc exit for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCreatingContact(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (activeContact) fetchLinkedAssets(activeContact.id);
  }, [activeContact?.id]);

  useEffect(() => {
    fetchContacts();
    initUser();
  }, []);

  const initUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setCurrentUserId(user.id);
    const { data: profile } = await supabase
      .from('team_profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();
    if (profile?.full_name) setCurrentUserName(profile.full_name);
  };

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vanguard_contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        toast.info("Directory offline. Vanguard Contacts table uninitialized.");
      } else {
        toast.error(`Directory Link Failed: ${error.message}`);
      }
      setLoading(false);
      return;
    }

    setContacts(data || []);
    if (data && data.length > 0 && !activeContact) {
      setActiveContact(data[0]);
    }
    setLoading(false);
  };

  const fetchLinkedAssets = async (contactId: string) => {
    setLoadingAssets(true);
    setLinkedVaultFiles([]);
    setLinkedNotes([]);

    // Query vanguard_vault for files with matching contact_id in metadata
    const { data: vaultData } = await supabase
      .from("vanguard_vault")
      .select("id, name, file_path, metadata")
      .contains("metadata", { contact_id: contactId });

    // Query vanguard_notes for notes linked to this contact
    const { data: notesData } = await supabase
      .from("vanguard_notes")
      .select("id, title, updated_at")
      .eq("linked_contact_id", contactId)
      .order("updated_at", { ascending: false });

    if (vaultData) setLinkedVaultFiles(vaultData);
    if (notesData) setLinkedNotes(notesData);
    setLoadingAssets(false);
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.company && !newContact.name) {
      toast.error("Identity or Originator Entity is required.");
      return;
    }

    const customFieldsObj: Record<string, string> = {};
    dynamicProps.forEach((p) => {
      if (p.key.trim()) customFieldsObj[p.key.trim()] = p.value.trim();
    });

    const payload = {
      ...newContact,
      author_id: currentUserId,
      author_name: currentUserName || null,
      custom_fields: customFieldsObj,
      timeline_events: [{
        id: Date.now().toString(),
        type: "system",
        description: "Entity organically initialized in Directory Registry.",
        date: new Date().toISOString()
      }]
    };

    const toastId = toast.loading("Registering Vanguard Entity...");
    const { data, error } = await supabase
      .from("vanguard_contacts")
      .insert([payload])
      .select()
      .single();

    if (error) {
       toast.error(`Failed to register entity: ${error.message}`, { id: toastId });
       return;
    }

    toast.success("Vanguard Entity Registered.", { id: toastId });
    setContacts([data, ...contacts]);
    setActiveContact(data);
    setIsCreatingContact(false);
    setNewContact({ company: "", name: "", email: "", phone: "" });
    setDynamicProps([]);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this entity and its timeline?")) return;
    const toastId = toast.loading("Purging entity record...");
    const { error } = await supabase.from("vanguard_contacts").delete().eq("id", id);
    if (error) {
       toast.error(`Purge failed: ${error.message}`, { id: toastId });
       return;
    }
    toast.success("Entity removed.", { id: toastId });
    setContacts(contacts.filter(c => c.id !== id));
    setActiveContact(null);
  };

  const deleteTimelineEvent = async (eventIndex: number) => {
    if (!activeContact || !activeContact.timeline_events) return;
    if (!confirm("Remove this entry from the operations timeline?")) return;
    
    const toastId = toast.loading("Purging timeline node...");
    const newArray = [...activeContact.timeline_events];
    newArray.splice(eventIndex, 1);
    
    const { error } = await supabase.from("vanguard_contacts").update({ timeline_events: newArray }).eq("id", activeContact.id);
    if (error) {
      toast.error(`Purge failed: ${error.message}`, { id: toastId });
      return;
    }
    
    toast.success("Timeline node eliminated.", { id: toastId });
    const updatedContact = { ...activeContact, timeline_events: newArray };
    setActiveContact(updatedContact);
    setContacts(contacts.map(c => c.id === activeContact.id ? updatedContact : c));
  };

  const addCustomField = () => setDynamicProps([...dynamicProps, { key: "", value: "" }]);
  const updateCustomField = (index: number, field: "key" | "value", val: string) => {
    const newProps = [...dynamicProps];
    newProps[index][field] = val;
    setDynamicProps(newProps);
  };

  const handleAddTimelineNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeContact || !newNote.trim()) return;

    setIsAddingNote(true);

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      type: "note",
      description: newNote.trim(),
      date: new Date().toISOString(),
    };

    const updatedEvents = [newEvent, ...(activeContact.timeline_events || [])];

    const { data, error } = await supabase
      .from("vanguard_contacts")
      .update({ timeline_events: updatedEvents })
      .eq("id", activeContact.id)
      .select()
      .single();

    setIsAddingNote(false);

    if (error) {
      toast.error(`Failed to push to timeline: ${error.message}`);
      return;
    }

    setNewNote("");
    toast.success("Intelligence logged.");
    
    setContacts(contacts.map(c => c.id === activeContact.id ? data : c));
    setActiveContact(data);
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col text-white pb-0 pr-0">
      {/* Header */}
      <header className="mb-6 flex-none pr-4 md:pr-6 flex justify-between items-start">
        <div className="mb-3">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-1 text-slate-100">
            Directory
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            Vanguard Global CRM & Intelligence Database
          </p>
        </div>
        <button 
          onClick={() => setIsCreatingContact(true)}
          className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 font-bold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <Plus className="w-4 h-4" /> New Entity
        </button>
      </header>

      {/* Split View Container */}
      <div className="flex-1 flex overflow-hidden border border-white/10 rounded-tl-2xl rounded-bl-2xl bg-slate-800 relative">
        
        {/* LEFT PANE: Directory List */}
        <div className="w-full md:w-[350px] lg:w-[400px] flex-none border-r border-white/10 flex flex-col bg-slate-900/50">
          <div className="p-4 border-b border-white/10 flex-none bg-slate-800 z-10 sticky top-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search entities or individuals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No entities found.</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    activeContact?.id === contact.id
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-slate-800 border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02]"
                  }`}
                >
                  <h3 className={`font-bold text-sm tracking-wide ${activeContact?.id === contact.id ? "text-cyan-400" : "text-slate-200"}`}>
                    {contact.company || "Unknown Entity"}
                  </h3>
                  {contact.name && (
                    <p className="text-xs text-slate-400 mt-1 font-medium">{contact.name}</p>
                  )}
                  {contact.email && (
                    <p className="text-[10px] text-slate-500 font-mono mt-2 truncate flex items-center gap-1.5">
                      <Mail className="w-3 h-3 flex-none" /> {contact.email}
                    </p>
                  )}
                  {contact.author_name && (
                    <p className="text-[9px] text-slate-600 font-mono mt-1.5 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-slate-700" /> By: {contact.author_name}
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANE: Entity Detail & Timeline */}
        <div className={`flex-1 flex flex-col bg-slate-800 overflow-hidden ${!activeContact ? 'hidden md:flex items-center justify-center' : ''}`}>
          {!activeContact ? (
            <div className="text-center">
              <Users className="w-16 h-16 text-slate-800 mx-auto mb-4" />
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Select an entity to view intelligence.</p>
            </div>
          ) : (
            <>
              {/* Profile Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex-none bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex justify-between items-start gap-4 mb-2 relative z-10">
                  <h2 className="text-3xl font-bold tracking-widest uppercase text-slate-100">
                    {activeContact.company || "Unknown Entity"}
                  </h2>
                  <button onClick={() => handleDeleteContact(activeContact.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-red-400/20" title="Delete Entity">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 mt-4 relative z-10">
                  {activeContact.name && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Users className="w-4 h-4 text-cyan-500" /> 
                      <span className="font-medium font-mono">{activeContact.name}</span>
                    </div>
                  )}
                  {activeContact.email && (
                     <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Mail className="w-4 h-4 text-cyan-500" /> 
                        <span className="font-mono">{activeContact.email}</span>
                     </div>
                  )}
                  {activeContact.phone && (
                     <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Phone className="w-4 h-4 text-cyan-500" /> 
                        <span className="font-mono">{activeContact.phone}</span>
                     </div>
                  )}
                </div>

                {/* Tech Specs / Custom Fields Grid */}
                {activeContact.custom_fields && Object.keys(activeContact.custom_fields).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 relative z-10 pt-5 border-t border-white/5">
                    {Object.entries(activeContact.custom_fields).map(([key, val]) => (
                      <div key={key} className="flex flex-col bg-white/[0.03] border border-white/5 rounded-lg px-3 py-1.5 min-w-[120px] shadow-sm">
                        <span className="text-[10px] text-cyan-500/80 font-bold uppercase tracking-widest mb-0.5">{key}</span>
                        <span className="text-xs font-mono text-slate-200">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Linked Assets Panel ── */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/5">
                <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3 flex items-center gap-2">
                  <FolderOpen className="w-3.5 h-3.5 text-cyan-500" /> Linked Assets
                </h3>
                {loadingAssets ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                ) : (
                  <>
                    {linkedVaultFiles.length === 0 && linkedNotes.length === 0 && (
                      <p className="text-slate-600 text-xs font-mono">No linked vault files or notes found.</p>
                    )}
                    {linkedVaultFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {linkedVaultFiles.map(f => (
                          <Link
                            key={f.id}
                            to="/vanguard/vault"
                            title={f.name}
                            className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono px-2.5 py-1 rounded-lg hover:bg-cyan-500/20 transition-colors"
                          >
                            <FolderOpen className="w-3 h-3" />
                            {f.name || f.file_path?.split("/").pop()}
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </Link>
                        ))}
                      </div>
                    )}
                    {linkedNotes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {linkedNotes.map(n => (
                          <Link
                            key={n.id}
                            to="/vanguard/intel"
                            title={n.title}
                            className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono px-2.5 py-1 rounded-lg hover:bg-indigo-500/20 transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            {n.title || "Untitled Note"}
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Timeline Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-slate-800">
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Operations Timeline
                </h3>
                
                {/* Add Note Form */}
                <form onSubmit={handleAddTimelineNote} className="mb-10 relative">
                  <textarea
                    required
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Log a new meeting note, update, or intelligence..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 font-mono resize-none min-h-[100px] shadow-inner"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isAddingNote || !newNote.trim()}
                      className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 font-bold py-1.5 px-4 rounded-lg transition-all flex items-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
                    >
                      {isAddingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Log Event
                    </button>
                  </div>
                </form>

                {/* Timeline Events Feed */}
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] md:before:ml-[19px] before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:to-white/10">
                  {!(activeContact.timeline_events?.length > 0) ? (
                    <div className="pl-12 text-slate-500 font-mono text-xs uppercase tracking-widest italic pt-4">
                      No events logged in the timeline.
                    </div>
                  ) : (
                    activeContact.timeline_events.map((event, idx) => (
                      <div key={event.id} className="relative flex gap-6 items-start group">
                        <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center flex-none mt-1 shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:border-cyan-400 transition-colors">
                          {event.type === 'system' ? (
                            <Building className="w-4 h-4 text-slate-400" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                               <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
                                    {event.type}
                                  </span>
                                  <span className="text-xs font-mono text-slate-500">
                                    {new Date(event.date).toLocaleString()}
                                  </span>
                               </div>
                               <button onClick={() => deleteTimelineEvent(idx)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded">
                                 <Trash2 className="w-3.5 h-3.5" />
                               </button>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              {event.description}
                            </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- New Entity Custom Details Modal --- */}
      {isCreatingContact && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsCreatingContact(false)}
        >
           <div 
            className="w-full max-w-lg bg-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
           >
            <button onClick={() => setIsCreatingContact(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 flex-none">Register Vanguard Entity</h2>
            
            <form onSubmit={handleCreateContact} className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2">
                   <label className="block text-[10px] font-bold tracking-widest text-cyan-500 uppercase mb-2">Entity / Company Name</label>
                   <input value={newContact.company} onChange={(e) => setNewContact({...newContact, company: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="e.g. Apex Dynamics Ltd." />
                 </div>
                 
                 <div className="col-span-2 md:col-span-1">
                   <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Primary Individual</label>
                   <input value={newContact.name} onChange={(e) => setNewContact({...newContact, name: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="e.g. John Doe" />
                 </div>
                 
                 <div className="col-span-2 md:col-span-1">
                   <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Encrypted Comms (Email)</label>
                   <input type="email" value={newContact.email} onChange={(e) => setNewContact({...newContact, email: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="johndoe@example.com" />
                 </div>

                 <div className="col-span-2">
                   <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Direct Line (Phone)</label>
                   <input type="tel" value={newContact.phone} onChange={(e) => setNewContact({...newContact, phone: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono placeholder:text-slate-600" placeholder="+1 (555) 000-0000" />
                 </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-2">
                   Custom Attributes (JSONb Node)
                </label>
                <div className="space-y-3 mb-3">
                  {dynamicProps.map((prop, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input value={prop.key} onChange={(e) => updateCustomField(idx, "key", e.target.value)} placeholder="Key (e.g. Instagram)" className="flex-1 min-w-0 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono placeholder:text-slate-600" />
                      <input value={prop.value} onChange={(e) => updateCustomField(idx, "value", e.target.value)} placeholder="Value (e.g. @spirecrest)" className="flex-1 min-w-0 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono placeholder:text-slate-600" />
                      <button type="button" onClick={() => setDynamicProps(dynamicProps.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-400 p-1 bg-white/5 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addCustomField} className="text-xs font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-400 flex items-center gap-2 mt-4 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  <Plus className="w-3 h-3" /> Add Custom Field Node
                </button>
              </div>

              <button type="submit" className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-lg uppercase tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-cyan-400/50">
                Execute Block Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
