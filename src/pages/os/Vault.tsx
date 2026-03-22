import { useState, useEffect, useRef } from "react";
import { UploadCloud, FolderLock, File, Image as ImageIcon, FileText, Trash2, Download, Loader2, FolderPlus, ChevronRight, Folder, Settings, X, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";

interface VaultFile {
  name: string;
  id: string | null;
  created_at: string | null;
  metadata: {
    size: number;
    mimetype: string;
    cacheControl?: string;
  } | null;
  author_name?: string;
}

export default function Vault() {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserRole, setCurrentUserRole] = useState<string>("operator");
  
  const [editingFile, setEditingFile] = useState<VaultFile | null>(null);
  const [editName, setEditName] = useState("");
  const [editPath, setEditPath] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEditingFile(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [currentPath, currentUserId]);

  const initUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setCurrentUserId(user.id);
    const { data: profile } = await supabase
      .from('team_profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();
    if (profile?.full_name) setCurrentUserName(profile.full_name);
    if (profile?.role) setCurrentUserRole(profile.role);
  };

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("vanguard-vault").list(currentPath || "", {
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
       if (error.message !== "The resource was not found") {
           toast.error(`Fetch failed: ${error.message}`);
       }
       setLoading(false);
       return;
    }

    const validFiles = (data || []).filter((file) => file.name !== ".emptyFolderPlaceholder" && file.name !== ".keep");
    
    const sorted = [...validFiles].sort((a, b) => {
      const isFolderA = !a.id;
      const isFolderB = !b.id;
      if (isFolderA && !isFolderB) return -1;
      if (!isFolderA && isFolderB) return 1;
      return 0;
    });

    // Fetch ownership metadata from vanguard_vault_metadata (graceful fallback)
    let metaMap: Record<string, { author_name: string; visibility: string; author_id: string }> = {};
    try {
      const paths = sorted.filter(f => f.id).map(f => currentPath ? `${currentPath}/${f.name}` : f.name);
      if (paths.length > 0) {
        const { data: metaRows } = await supabase
          .from('vanguard_vault_metadata')
          .select('file_path, author_name, visibility, author_id')
          .in('file_path', paths);
        if (metaRows) {
          metaRows.forEach(r => { metaMap[r.file_path] = r; });
        }
      }
    } catch { /* table may not exist yet */ }

    // Enrich with ownership metadata; DB RLS is the sole authority on access.
    const merged = sorted.reduce<VaultFile[]>((acc, f) => {
      const isFolder = !f.id;
      if (isFolder) {
        acc.push(f as VaultFile);
        return acc;
      }
      const filePath = currentPath ? `${currentPath}/${f.name}` : f.name;
      const meta = metaMap[filePath];
      // If no metadata row exists, the file is either legacy or inaccessible via RLS — hide it.
      if (!meta) return acc;
      acc.push({ ...f, author_name: meta.author_name } as VaultFile);
      return acc;
    }, []);

    setFiles(merged);
    setLoading(false);
  };

  const getFullPath = (fileName: string) => {
    return currentPath ? `${currentPath}/${fileName}` : fileName;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const toastId = toast.loading("Encrypting & Uploading...");
    
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${Date.now()}-${cleanName}`;
    const fullPath = getFullPath(filePath);

    const { error } = await supabase.storage
      .from("vanguard-vault")
      .upload(fullPath, file, { contentType: file.type });

    if (!error) {
      try {
        await supabase.from('vanguard_vault_metadata').insert([{
          file_path: fullPath,
          author_id: currentUserId,
          author_name: currentUserName || null,
          visibility: 'private',
        }]);
      } catch { /* graceful fallback if table missing */ }
    }

    setUploading(false);
    
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (error) {
      toast.error(`Upload failed: ${error.message}`, { id: toastId });
      return;
    }

    toast.success("Upload Complete.", { id: toastId });
    fetchFiles();
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("Enter new secure folder name:");
    if (!folderName) return;

    const cleanFolderName = folderName.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!cleanFolderName) {
      toast.error("Invalid folder name.");
      return;
    }

    const toastId = toast.loading("Creating Directory...");
    const fullPath = getFullPath(`${cleanFolderName}/.keep`);
    const emptyFile = new Blob([""], { type: "text/plain" });
    const { error } = await supabase.storage.from("vanguard-vault").upload(fullPath, emptyFile);

    if (error) {
      toast.error(`Failed to create directory: ${error.message}`, { id: toastId });
      return;
    }
    
    toast.success("Directory registered.", { id: toastId });
    fetchFiles();
  };

  const openEditModal = (file: VaultFile) => {
    setEditingFile(file);
    setEditName(file.name.split("-").slice(1).join("-") || file.name);
    setEditPath(currentPath);
  };

  const handleApplyEdit = async () => {
    if (!editingFile) return;
    
    const toastId = toast.loading("Reconfiguring secure asset...");
    const oldFullPath = getFullPath(editingFile.name);
    
    const originalPrefix = editingFile.name.split("-")[0];
    const hasOriginalPrefix = !isNaN(Number(originalPrefix)) && editingFile.name.includes("-");
    
    const cleanNewName = editName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const finalNewName = hasOriginalPrefix ? `${originalPrefix}-${cleanNewName}` : cleanNewName;
    
    const cleanDest = editPath.replace(/^\/+|\/+$/g, '');
    const newFullPath = cleanDest ? `${cleanDest}/${finalNewName}` : finalNewName;

    const { error } = await supabase.storage
      .from("vanguard-vault")
      .move(oldFullPath, newFullPath);

    if (error) {
      toast.error(`Operation failed: ${error.message}`, { id: toastId });
      return;
    }

    toast.success("Asset reconfigured.", { id: toastId });
    setEditingFile(null);
    fetchFiles();
  };

  const handleDownload = async (fileName: string, isPreview: boolean = false) => {
    const toastId = toast.loading("Generating secure link...");
    const fullPath = getFullPath(fileName);
    
    // Add \{ download: !isPreview \} parameter to createSignedUrl
    const { data, error } = await supabase.storage
      .from("vanguard-vault")
      .createSignedUrl(fullPath, 60, { download: !isPreview ? fileName : undefined });

    if (error || !data) {
      toast.error(`Failed to generate secure link: ${error?.message || 'Unknown error'}`, { id: toastId });
      return;
    }

    toast.success("Link generated.", { id: toastId });
    
    if (isPreview) {
      window.open(data.signedUrl, '_blank');
    } else {
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDelete = async (fileName: string, isFolder: boolean) => {
    if (!confirm(isFolder ? `Delete this directory and ALL contents?` : `Permanently delete this secure file?`)) return;

    const fullPath = getFullPath(fileName);
    let pathsToDelete = [fullPath];
    
    if (isFolder) {
        toast.info("Discovering directory assets...");
        const { data } = await supabase.storage.from("vanguard-vault").list(fullPath);
        if (data && data.length > 0) {
            pathsToDelete = data.map(f => `${fullPath}/${f.name}`);
        } else {
            pathsToDelete = [`${fullPath}/.keep`];
        }
    }

    const { error } = await supabase.storage
      .from("vanguard-vault")
      .remove(pathsToDelete);

    if (error) {
      toast.error(`Failed to destroy assets: ${error.message}`);
      return;
    }

    toast.success("Assets permanently destroyed.");
    fetchFiles();
  };

  const navigateToFolder = (folderName: string) => {
    const nextPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    setCurrentPath(nextPath);
  };

  const navigateBreadcrumb = (index: number) => {
    if (index === -1) {
      setCurrentPath("");
      return;
    }
    const parts = currentPath.split("/");
    setCurrentPath(parts.slice(0, index + 1).join("/"));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (mimetype: string) => {
    if (!mimetype) return <File className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors" />;
    if (mimetype.startsWith("image/")) return <ImageIcon className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />;
    if (mimetype === "application/pdf" || mimetype.includes("text")) return <FileText className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />;
    return <File className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 transition-colors" />;
  };

  const pathParts = currentPath ? currentPath.split("/") : [];

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col text-white">
      <header className="mb-6 flex-none border-b border-white/5 pb-6">
        <div className="mb-3">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-1 text-slate-100">
            Secure Enterprise Vault
          </h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
            AES-256 Encrypted Cloud Storage Object Store
          </p>
        </div>
      </header>

      <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 p-4 rounded-xl mb-6">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
          <button 
            onClick={() => navigateBreadcrumb(-1)}
            className="text-cyan-500 hover:text-cyan-400 font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            Vault
          </button>
          
          {pathParts.map((part, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-600 flex-none" />
              <button 
                onClick={() => navigateBreadcrumb(idx)}
                className={`${idx === pathParts.length - 1 ? 'text-slate-200' : 'text-slate-400 hover:text-cyan-400'} font-bold tracking-widest uppercase text-xs transition-colors cursor-pointer`}
              >
                {part}
              </button>
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleCreateFolder}
          className="flex-none bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <FolderPlus className="w-4 h-4" /> New Directory
        </button>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`mb-6 w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all flex-none ${
          uploading 
            ? "border-cyan-500/50 bg-cyan-500/5" 
            : "border-white/10 hover:border-cyan-500/50 bg-white/[0.02] hover:bg-white/[0.04]"
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={uploading}
        />
        
        {uploading ? (
          <>
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm animate-pulse">
              Encrypting & Uploading...
            </span>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <UploadCloud className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold tracking-widest uppercase text-slate-200 mb-2">
              Upload to {currentPath ? currentPath.split("/").pop() : "Root"} Directory
            </h3>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Documents, Images &amp; Archives supported
            </p>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 flex-1">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
            <p className="text-slate-400 text-xs font-mono tracking-widest uppercase animate-pulse">Decrypting indices...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="flex-1 border border-white/5 rounded-2xl bg-white/[0.01] flex flex-col items-center justify-center text-center p-10">
          <FolderLock className="w-12 h-12 text-slate-700 mb-4" />
          <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
            Directory is empty.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max pb-10">
            {files.map((file) => {
              const isFolder = !file.id;
              
              return (
                <div 
                  key={file.id || file.name}
                  onClick={() => isFolder ? navigateToFolder(file.name) : undefined}
                  className={`bg-[#0f172a] border border-white/10 rounded-xl p-5 group hover:border-cyan-500/30 transition-all flex flex-col shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] relative ${isFolder ? 'cursor-pointer hover:bg-white/[0.02]' : ''}`}
                  draggable={!isFolder}
                  onDragStart={(e) => {
                     if (!isFolder) {
                        e.dataTransfer.setData("text/plain", file.name);
                        e.dataTransfer.effectAllowed = "move";
                     }
                  }}
                  onDragOver={isFolder ? (e) => {
                     e.preventDefault();
                     e.dataTransfer.dropEffect = "move";
                  } : undefined}
                  onDrop={isFolder ? async (e) => {
                     e.preventDefault();
                     const droppedFileName = e.dataTransfer.getData("text/plain");
                     if (!droppedFileName || droppedFileName === file.name) return;
                     
                     const toastId = toast.loading("Relocating secure asset...");
                     const base = currentPath ? `${currentPath}/` : "";
                     const oldFullPath = `${base}${droppedFileName}`;
                     const newFullPath = `${base}${file.name}/${droppedFileName}`;
                     
                     const { error } = await supabase.storage.from("vanguard-vault").move(oldFullPath, newFullPath);
                     
                     if (error) {
                        toast.error(`Transfer failed: ${error.message}`, { id: toastId });
                     } else {
                        toast.success("Asset relocated.", { id: toastId });
                        fetchFiles();
                     }
                  } : undefined}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(file.name, isFolder); }}
                    className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg z-10"
                    title={isFolder ? "Permanently Delete Directory" : "Permanently Delete"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center flex-none">
                      {isFolder ? <Folder className="w-8 h-8 text-amber-500 drop-shadow-lg" /> : getFileIcon(file.metadata?.mimetype || "")}
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <h3 
                        className="font-semibold text-sm text-slate-200 truncate group-hover:text-cyan-400 transition-colors"
                        title={file.name}
                      >
                        {isFolder ? file.name : (file.name.split("-").slice(1).join("-") || file.name)}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1">
                        {isFolder ? "DIRECTORY" : formatFileSize(file.metadata?.size || 0)}
                      </p>
                      {/* Author tag */}
                      {!isFolder && file.author_name && (
                        <p className="text-[9px] font-mono text-slate-600 tracking-wider mt-1 truncate">
                          {file.author_name}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isFolder && (
                    <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                      <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                        {format(new Date(file.created_at || Date.now()), "MMM dd, yyyy")}
                      </span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openEditModal(file); }}
                          className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
                          title="Manage Asset"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDownload(file.name, true); }}
                          className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDownload(file.name, false); }}
                          className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-cyan-500 hover:text-cyan-400 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {isFolder && (
                     <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                     <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase flex items-center gap-1.5">
                       <FolderLock className="w-3 h-3" /> Encrypted Root
                     </span>
                     <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 transition-colors" />
                   </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {editingFile && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setEditingFile(null)}
        >
          <div 
            className="w-full max-w-md bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setEditingFile(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 text-slate-100 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" /> Manage Asset
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">New File Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  placeholder="document.pdf"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Destination Path</label>
                <input
                  type="text"
                  value={editPath}
                  onChange={(e) => setEditPath(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  placeholder="finance/2026"
                />
                <p className="text-[10px] text-slate-500 font-mono uppercase mt-2 leading-relaxed">
                  Leave blank for root, or type '<span className="text-cyan-400">folder/subfolder</span>' to move payload instantly.
                </p>
              </div>
              <button
                onClick={handleApplyEdit}
                className="w-full bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 font-bold py-3 px-4 rounded-lg transition-all tracking-widest uppercase text-sm mt-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                Apply Reconfiguration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
