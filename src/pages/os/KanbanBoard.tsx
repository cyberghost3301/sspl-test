import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, GripVertical, Loader2, Trash2, X, LayoutTemplate, Settings, Users, ExternalLink, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface KanbanBoardRecord {
  id: string;
  title: string;
}

interface LeadCard {
  id: string;
  title: string;
  column_id: string;
  order_index: number;
  dynamic_data: Record<string, string>;
  author_id?: string;
  author_name?: string;
  visibility?: 'global' | 'private';
  linked_contact_id?: string;
}

interface ColumnRow {
  id: string;
  title: string;
  color_hex: string;
  order_index: number;
  board_id: string;
}

interface ColumnState {
  id: string;
  title: string;
  color_hex: string;
  cardIds: string[];
}

interface KanbanState {
  cards: Record<string, LeadCard>;
  columns: Record<string, ColumnState>;
  columnOrder: string[];
}

const buildState = (columns: ColumnRow[], cards: LeadCard[]): KanbanState => {
  const cardsMap: Record<string, LeadCard> = {};
  cards.forEach((c) => (cardsMap[c.id] = c));

  const columnsMap: Record<string, ColumnState> = {};
  const sortedColumns = [...columns].sort((a, b) => a.order_index - b.order_index);

  sortedColumns.forEach((col) => {
    const colCards = cards
      .filter((c) => c.column_id === col.id)
      .sort((a, b) => a.order_index - b.order_index);
    columnsMap[col.id] = {
      id: col.id,
      title: col.title,
      color_hex: col.color_hex,
      cardIds: colCards.map((c) => c.id),
    };
  });

  return {
    cards: cardsMap,
    columns: columnsMap,
    columnOrder: sortedColumns.map((c) => c.id),
  };
};

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<KanbanBoardRecord[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [data, setData] = useState<KanbanState | null>(null);
  const [loading, setLoading] = useState(true);

  // User & role state
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserRole, setCurrentUserRole] = useState<string>("operator");

  // Directory contacts for linking
  const [contacts, setContacts] = useState<{ id: string; name: string; company: string }[]>([]);

  // Column Modal State
  const [isColModalOpen, setIsColModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<ColumnState | null>(null);
  const [colName, setColName] = useState("");
  const [colColor, setColColor] = useState("#64748b");

  // Card Modal State
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<LeadCard | null>(null);
  const [activeColForCard, setActiveColForCard] = useState<string | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [linkedContactId, setLinkedContactId] = useState<string>("");
  const [dynamicProps, setDynamicProps] = useState<{ key: string; value: string }[]>([]);

  // Escape key global listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsColModalOpen(false);
        setIsCardModalOpen(false);
        setEditingCard(null);
        setEditingCol(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch Boards on Mount
  useEffect(() => {
    initUser();
    fetchBoards();
    fetchContacts();
  }, []);

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

  const fetchContacts = async () => {
    const { data: cData } = await supabase
      .from("vanguard_contacts")
      .select("id, name, company")
      .order("company");
    if (cData) setContacts(cData);
  };

  const fetchBoards = async () => {
    setLoading(true);
    const { data: fetchedBoards, error } = await supabase
      .from("kanban_boards")
      .select("*")
      .order("created_at");

    if (error) {
      if (error.code === '42P01') {
        const fakeBoardId = "fake-board-id";
        setBoards([{ id: fakeBoardId, title: "Default Pipeline" }]);
        setActiveBoardId(fakeBoardId);
        fetchBoardData(fakeBoardId);
      } else {
        toast.error("Failed to load boards");
        setLoading(false);
      }
      return;
    }

    setBoards(fetchedBoards || []);
    if (fetchedBoards && fetchedBoards.length > 0) {
      setActiveBoardId(fetchedBoards[0].id);
      fetchBoardData(fetchedBoards[0].id);
    } else {
      setLoading(false);
    }
  };

  const fetchBoardData = async (boardId: string) => {
    setLoading(true);
    // Ignore board_id in query if it's our fake graceful fallback
    const colQuery = boardId === "fake-board-id" 
      ? supabase.from("kanban_columns").select("*").order("order_index")
      : supabase.from("kanban_columns").select("*").eq("board_id", boardId).order("order_index");

    const { data: columns, error: colErr } = await colQuery;
    
    if (colErr) {
      toast.error("Database connection error");
      setLoading(false);
      return;
    }

    // Safely pluck col ids to fetch cards
    const colIds = columns?.map(c => c.id) || [];
    
    let cardsData: LeadCard[] = [];
    if (colIds.length > 0) {
        const { data: cards, error: cardErr } = await supabase
          .from("kanban_cards")
          .select("*")
          .in("column_id", colIds)
          .order("order_index");

        if (cardErr) toast.error("Failed to load cards");
        else cardsData = (cards || []) as LeadCard[];
    }

    setData(buildState(columns as ColumnRow[], cardsData as LeadCard[]));
    setLoading(false);
  };

  const handleBoardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setActiveBoardId(id);
    fetchBoardData(id);
  };

  const createNewBoard = async () => {
    const title = prompt("Enter new Board Title:");
    if (!title) return;

    const { data: newBoard, error } = await supabase
      .from("kanban_boards")
      .insert([{ title }])
      .select()
      .single();

    if (error) {
      toast.error("Failed to create board. Make sure schema is updated.");
      return;
    }

    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
    fetchBoardData(newBoard.id);
    toast.success("Board created");
  };

  const deleteBoard = async () => {
    if (!activeBoardId) return;
    const activeBoard = boards.find(b => b.id === activeBoardId);
    const confirmed = window.confirm(
      `⚠️ IRREVERSIBLE ACTION

You are about to permanently delete the board "${activeBoard?.title ?? activeBoardId}" along with ALL its columns and every card inside them.

This cannot be undone. Are you absolutely sure?`
    );
    if (!confirmed) return;

    const toastId = toast.loading('Purging board and all assets...');

    // Step 1: fetch all columns for this board
    const { data: cols, error: colFetchErr } = await supabase
      .from('kanban_columns')
      .select('id')
      .eq('board_id', activeBoardId);

    if (colFetchErr) {
      toast.error(`Failed to read columns: ${colFetchErr.message}`, { id: toastId });
      return;
    }

    const colIds = (cols ?? []).map(c => c.id);

    // Step 2: delete all cards inside those columns
    if (colIds.length > 0) {
      const { error: cardDelErr } = await supabase
        .from('kanban_cards')
        .delete()
        .in('column_id', colIds);

      if (cardDelErr) {
        toast.error(`Failed to delete cards: ${cardDelErr.message}`, { id: toastId });
        return;
      }
    }

    // Step 3: delete all columns
    const { error: colDelErr } = await supabase
      .from('kanban_columns')
      .delete()
      .eq('board_id', activeBoardId);

    if (colDelErr) {
      toast.error(`Failed to delete columns: ${colDelErr.message}`, { id: toastId });
      return;
    }

    // Step 4: delete the board itself
    const { error: boardDelErr } = await supabase
      .from('kanban_boards')
      .delete()
      .eq('id', activeBoardId);

    if (boardDelErr) {
      toast.error(`Failed to delete board: ${boardDelErr.message}`, { id: toastId });
      return;
    }

    toast.success('Board permanently destroyed.', { id: toastId });

    // Reset UI state
    const remaining = boards.filter(b => b.id !== activeBoardId);
    setBoards(remaining);
    setData(null);
    if (remaining.length > 0) {
      setActiveBoardId(remaining[0].id);
      fetchBoardData(remaining[0].id);
    } else {
      setActiveBoardId(null);
      setLoading(false);
    }
  };

  const createColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colName || !activeBoardId) return;

    const orderIndex = data ? data.columnOrder.length : 0;
    
    const insertPayload: any = {
      title: colName,
      color_hex: colColor,
      order_index: orderIndex,
    };
    if (activeBoardId !== "fake-board-id") {
      insertPayload.board_id = activeBoardId;
    }

    const { error } = await supabase.from("kanban_columns").insert([insertPayload]);

    if (error) {
      toast.error("Failed to create column.");
      return;
    }

    toast.success("Column added.");
    setIsColModalOpen(false);
    setColName("");
    fetchBoardData(activeBoardId);
  };

  const openEditColModal = (col: ColumnState) => {
    setEditingCol(col);
    setColName(col.title);
    setColColor(col.color_hex);
  };

  const updateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCol || !colName) return;

    const toastId = toast.loading("Updating structural column...");
    const { error } = await supabase.from("kanban_columns").update({
      title: colName,
      color_hex: colColor
    }).eq("id", editingCol.id);

    if (error) {
      toast.error(`Update failed: ${error.message}`, { id: toastId });
      return;
    }

    toast.success("Column architecture updated.", { id: toastId });
    setEditingCol(null);
    setColName("");
    if (activeBoardId) fetchBoardData(activeBoardId);
  };

  const deleteColumn = async (colId: string) => {
    if (!confirm("Are you sure you want to delete this column and all its cards?")) return;
    
    const { error } = await supabase.from("kanban_columns").delete().eq("id", colId);
    if (error) toast.error("Failed to delete column");
    else {
      toast.success("Column deleted");
      if (activeBoardId) fetchBoardData(activeBoardId);
    }
  };

  const addCardProperty = () => {
    setDynamicProps([...dynamicProps, { key: "", value: "" }]);
  };

  const updateCardProperty = (index: number, field: "key" | "value", val: string) => {
    const newProps = [...dynamicProps];
    newProps[index][field] = val;
    setDynamicProps(newProps);
  };

  const createCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardTitle || !activeColForCard || !data) return;

    const orderIndex = data.columns[activeColForCard].cardIds.length;
    const dynamicDataObj: Record<string, string> = {};
    dynamicProps.forEach((p) => {
      if (p.key.trim()) dynamicDataObj[p.key.trim()] = p.value.trim();
    });

    const { error } = await supabase.from("kanban_cards").insert([
      {
        title: cardTitle,
        column_id: activeColForCard,
        order_index: orderIndex,
        dynamic_data: dynamicDataObj,
        author_id: currentUserId,
        author_name: currentUserName || null,
        ...(linkedContactId ? { linked_contact_id: linkedContactId } : {}),
      },
    ]);

    if (error) {
      toast.error("Failed to create card");
      return;
    }

    try {
      await supabase.from("vanguard_contacts").insert([
        {
          name: "",
          company: cardTitle,
          email: "",
          phone: "",
          timeline_events: [{
             id: Date.now().toString(),
             type: "system",
             description: "Kanban Pipeline Entity Sync Initialized.",
             date: new Date().toISOString()
          }]
        }
      ]);
    } catch (e) {
      console.warn("CRM Sync failed", e);
    }

    toast.success("Card created and sync'd.");
    setIsCardModalOpen(false);
    setCardTitle("");
    setLinkedContactId("");
    setDynamicProps([]);
    setActiveColForCard(null);
    if (activeBoardId) fetchBoardData(activeBoardId);
  };

  const openEditCardModal = (card: LeadCard) => {
    setEditingCard(card);
    setCardTitle(card.title);
    setLinkedContactId(card.linked_contact_id || "");
    const propsArray = Object.entries(card.dynamic_data || {}).map(([key, value]) => ({ key, value: String(value) }));
    setDynamicProps(propsArray);
  };

  const updateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard || !cardTitle) return;

    const toastId = toast.loading("Executing log rewrite...");
    const dynamicDataObj: Record<string, string> = {};
    dynamicProps.forEach((p) => {
      if (p.key.trim()) dynamicDataObj[p.key.trim()] = p.value.trim();
    });

    const { error } = await supabase.from("kanban_cards").update({
        title: cardTitle,
        dynamic_data: dynamicDataObj,
        linked_contact_id: linkedContactId || null,
    }).eq("id", editingCard.id);

    if (error) {
      toast.error(`Update failed: ${error.message}`, { id: toastId });
      return;
    }

    toast.success("Log parameters updated.", { id: toastId });
    setEditingCard(null);
    setCardTitle("");
    setDynamicProps([]);
    if (activeBoardId) fetchBoardData(activeBoardId);
  };

  const deleteCard = async (cardId: string) => {
    if (!confirm("Delete this card?")) return;
    const { error } = await supabase.from("kanban_cards").delete().eq("id", cardId);
    if (error) toast.error("Failed to delete card");
    else {
      toast.success("Card deleted");
      if (activeBoardId) fetchBoardData(activeBoardId);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!data) return;
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    let newData: KanbanState;

    if (startColumn.id === finishColumn.id) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      newData = {
        ...data,
        columns: {
          ...data.columns,
          [startColumn.id]: { ...startColumn, cardIds: newCardIds },
        },
      };
    } else {
      const startCardIds = Array.from(startColumn.cardIds);
      startCardIds.splice(source.index, 1);
      const finishCardIds = Array.from(finishColumn.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      newData = {
        ...data,
        columns: {
          ...data.columns,
          [startColumn.id]: { ...startColumn, cardIds: startCardIds },
          [finishColumn.id]: { ...finishColumn, cardIds: finishCardIds },
        },
      };
    }

    setData(newData);

    const affectedColumns = startColumn.id === finishColumn.id
      ? [finishColumn.id]
      : [startColumn.id, finishColumn.id];

    const updates: Promise<any>[] = [];

    for (const colId of affectedColumns) {
      const updatedCardIds = newData.columns[colId].cardIds;
      updatedCardIds.forEach((cardId, index) => {
        updates.push(
          (async () => await supabase
            .from("kanban_cards")
            .update({ column_id: colId, order_index: index })
            .eq("id", cardId)
          )()
        );
      });
    }

    const results = await Promise.all(updates);
    const hasError = results.some((r) => r.error);

    if (hasError) {
      toast.error("Failed to save pipeline changes.");
      setData(data); // Revert UI
    } else {
      toast.success("Pipeline updated.");
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col text-white items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Loading Pipeline…</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-6 flex flex-col text-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 flex-none border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-2">High-Value Leads</h1>
          <p className="text-slate-400 font-mono text-sm">
            Vanguard CRM pipeline. Drag cards to progress their lifecycle.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/[0.02] p-2 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 px-2">
            <LayoutTemplate className="w-4 h-4 text-cyan-500" />
            <select
              value={activeBoardId || ""}
              onChange={handleBoardChange}
              className="appearance-none bg-[#0f172a] border border-white/10 text-white focus:ring-1 focus:ring-cyan-500 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-widest uppercase outline-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              {boards.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#0f172a]">{b.title}</option>
              ))}
              {boards.length === 0 && <option value="" className="bg-[#0f172a]">No Boards</option>}
            </select>
          </div>
          
          <div className="h-6 w-px bg-white/10" />

          <button 
            onClick={createNewBoard}
            className="text-xs font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors text-slate-300 whitespace-nowrap px-2"
          >
            + New Board
          </button>

          {activeBoardId && (
            <>
              <div className="h-6 w-px bg-white/10" />
              <button
                onClick={deleteBoard}
                title="Delete this board and all its contents"
                className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors px-2 py-1 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Board
              </button>
            </>
          )}
        </div>
      </header>

      {/* Board Controls */}
      <div className="flex items-center justify-between mb-6 flex-none">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Live Sync Active</span>
        </div>
        <button 
          onClick={() => setIsColModalOpen(true)}
          className="bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.1)]"
        >
          <Plus className="w-4 h-4" /> Add Column
        </button>
      </div>

      {/* Kanban Board Container */}
      {!data || data.columnOrder.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <p className="text-slate-500 font-mono tracking-widest uppercase">No columns found. Add a column to begin.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden min-h-0 relative">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-nowrap overflow-x-auto items-start h-full pb-6 gap-4 w-full flex-1 min-h-0 custom-scrollbar absolute inset-0">
              {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const cards = column.cardIds.map((id) => data.cards[id]).filter(Boolean);

                return (
                  <div
                    key={column.id}
                    className="flex-1 min-w-[240px] max-w-[380px] shrink-0 flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-4 group/col h-full"
                    style={{ minHeight: 200 }}
                  >
                    {/* Column Header */}
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shadow-lg flex-none"
                        style={{
                          backgroundColor: column.color_hex,
                          boxShadow: `0 0 10px ${column.color_hex}80`,
                        }}
                      />
                      <h2 className="font-semibold tracking-widest text-slate-200 uppercase text-sm flex-1">
                        {column.title}
                      </h2>
                      <span className="text-slate-500 font-mono text-xs">{cards.length}</span>
                      <button onClick={() => openEditColModal(column)} className="opacity-0 group-hover/col:opacity-100 transition-opacity text-slate-500 hover:text-cyan-400 p-1 ml-auto">
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteColumn(column.id)}
                        className="opacity-0 group-hover/col:opacity-100 transition-opacity text-slate-500 hover:text-red-400 p-1 rounded hover:bg-white/5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Droppable Area */}
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 overflow-y-auto flex flex-col gap-3 min-h-[100px] rounded-lg transition-colors p-1 -m-1 custom-scrollbar ${
                            snapshot.isDraggingOver ? "bg-white/[0.02] border border-dashed border-white/10" : ""
                          }`}
                        >
                        {cards.map((card, index) => (
                          <Draggable key={card.id} draggableId={card.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-[#0f172a] border rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all shadow-lg relative group/card ${
                                  snapshot.isDragging
                                    ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] rotate-1 ring-1 ring-cyan-500/30 z-50"
                                    : "border-white/10 hover:border-cyan-500/50"
                                }`}
                              >
                                <div className="absolute top-2 right-2 flex items-center gap-1">
                                  <button onClick={() => openEditCardModal(card)} className="opacity-0 group-hover/card:opacity-100 transition-opacity text-slate-500 hover:text-cyan-400 p-1">
                                    <Settings className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    onClick={() => deleteCard(card.id)}
                                    className="opacity-0 group-hover/card:opacity-100 transition-opacity text-slate-500 hover:text-red-400 p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                  <div className="opacity-0 group-hover/card:opacity-100 transition-opacity cursor-grab text-slate-500 p-1">
                                    <GripVertical className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                                <h3 className="text-sm font-semibold text-slate-100 mb-2 pr-10 leading-tight">
                                  {card.title}
                               </h3>
                               {/* Author Tag */}
                               {card.author_name && (
                                 <div className="flex items-center gap-1 mb-2">
                                   <Lock className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                                   <span className="text-[9px] font-mono text-slate-500 tracking-wider truncate">
                                     {card.author_name}
                                   </span>
                                 </div>
                               )}
                                {card.dynamic_data && Object.keys(card.dynamic_data).length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    {Object.entries(card.dynamic_data).map(([key, value]) => (
                                      <span
                                        key={key}
                                        className="inline-block px-2 py-0.5 rounded bg-white/[0.05] border border-white/5 text-[10px] font-mono uppercase tracking-wider text-slate-300"
                                      >
                                        <span className="text-cyan-500/80 mr-1">{key}:</span>
                                        {String(value)}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* Add Card Button */}
                  <button 
                    onClick={() => {
                      setActiveColForCard(column.id);
                      setIsCardModalOpen(true);
                    }}
                    className="mt-4 border border-dashed border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-500 hover:text-cyan-400 rounded-lg py-3 flex items-center justify-center gap-2 transition-all group/add text-xs tracking-widest uppercase font-bold"
                  >
                    <Plus className="w-4 h-4 transition-transform group-hover/add:scale-110" />
                    New Entry
                  </button>
                </div>
              );
            })}
          </div>
        </DragDropContext>
        </div>
      )}

      {/* --- MODALS --- */}
      
      {/* Column Modal */}
      {(isColModalOpen || editingCol) && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => { setIsColModalOpen(false); setEditingCol(null); }}
        >
          <div 
            className="w-full max-w-md bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => { setIsColModalOpen(false); setEditingCol(null); }} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6">{editingCol ? "Manage Pipeline Column" : "Setup Column"}</h2>
            <form onSubmit={editingCol ? updateColumn : createColumn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Column Name</label>
                <input required value={colName} onChange={(e) => setColName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono" placeholder="e.g. Lead In" />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">Color Identifier</label>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { bg: "bg-slate-500",   hex: "#64748b", label: "Slate"   },
                    { bg: "bg-red-500",     hex: "#ef4444", label: "Red"     },
                    { bg: "bg-amber-500",   hex: "#f59e0b", label: "Amber"   },
                    { bg: "bg-emerald-500", hex: "#10b981", label: "Emerald" },
                    { bg: "bg-cyan-500",    hex: "#06b6d4", label: "Cyan"    },
                    { bg: "bg-blue-500",    hex: "#3b82f6", label: "Blue"    },
                    { bg: "bg-indigo-500",  hex: "#6366f1", label: "Indigo"  },
                    { bg: "bg-violet-500",  hex: "#8b5cf6", label: "Violet"  },
                    { bg: "bg-pink-500",    hex: "#ec4899", label: "Pink"    },
                    { bg: "bg-orange-500",  hex: "#f97316", label: "Orange"  },
                  ].map((color) => (
                    <button
                      key={color.hex} type="button" title={color.label} onClick={() => setColColor(color.hex)}
                      className={`w-8 h-8 rounded-full shadow-lg transition-transform ${color.bg} ${colColor === color.hex ? 'ring-2 ring-white scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-xs transition-colors">
                {editingCol ? "Update Column" : "Initialize Column"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Card Modal */}
      {(isCardModalOpen || editingCard) && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => { setIsCardModalOpen(false); setEditingCard(null); }}
        >
           <div 
            className="w-full max-w-lg bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
           >
            <button onClick={() => { setIsCardModalOpen(false); setEditingCard(null); }} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 flex-none">{editingCard ? "Manage Lead Log" : "New Entry Log"}</h2>
            
            <form onSubmit={editingCard ? updateCard : createCard} className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Entity Title</label>
                <input required value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono" placeholder="e.g. Apex Tech Overhaul" />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Linked Contact</label>
                <div className="flex gap-2">
                  <select
                    value={linkedContactId}
                    onChange={e => setLinkedContactId(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono"
                  >
                    <option value="" className="bg-[#020617]">— None —</option>
                    {contacts.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#020617]">
                        {c.company || c.name || "Unnamed"}
                      </option>
                    ))}
                  </select>
                  {linkedContactId && (
                    <button
                      type="button"
                      onClick={() => { setIsCardModalOpen(false); setEditingCard(null); navigate("/vanguard/directory"); }}
                      title="Go to Directory"
                      className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">Dynamic Properties (JSONB)</label>
                <div className="space-y-3 mb-3">
                  {dynamicProps.map((prop, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input value={prop.key} onChange={(e) => updateCardProperty(idx, "key", e.target.value)} placeholder="Key (e.g. Budget)" className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono" />
                      <input value={prop.value} onChange={(e) => updateCardProperty(idx, "value", e.target.value)} placeholder="Value (e.g. ₹15L)" className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs font-mono" />
                      <button type="button" onClick={() => setDynamicProps(dynamicProps.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-400 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addCardProperty} className="text-xs font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-400 flex items-center gap-2">
                  <Plus className="w-3 h-3" /> Add Property
                </button>
              </div>

              <button type="submit" className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-xs transition-colors">
                {editingCard ? "Update Entry" : "Log Entry"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
