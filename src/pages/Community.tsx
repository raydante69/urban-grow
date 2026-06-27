import { useState } from "react";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { posts as seedPosts, type Post } from "../data";
import { useAuth } from "../auth";

const tagStyles: Record<string, string> = {
  Récolte: "bg-leaf-soft text-leaf-dark",
  Jeux: "bg-sky/15 text-sky",
  Créatif: "bg-sun/20 text-leaf-dark",
  "Récup'": "bg-berry/10 text-berry",
};

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [draft, setDraft] = useState("");

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      const on = next.has(id);
      on ? next.delete(id) : next.add(id);
      setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, likes: p.likes + (on ? -1 : 1) } : p)));
      return next;
    });
  };

  const publish = () => {
    if (!draft.trim()) return;
    const post: Post = {
      id: `me-${Date.now()}`,
      author: user?.name ?? "Moi",
      avatar: user?.avatar ?? "🌱",
      time: "à l'instant",
      text: draft.trim(),
      likes: 0,
      comments: 0,
      tag: "Famille",
    };
    setPosts((ps) => [post, ...ps]);
    setDraft("");
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">La communauté 👨‍👩‍👧‍👦</h1>
        <p className="text-muted font-semibold mt-1">
          Partagez vos réussites avec les autres familles.
        </p>
      </header>

      {/* Composer un message */}
      <div className="card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-xl">
            {user?.avatar ?? "🌱"}
          </span>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Racontez votre dernière activité…"
            rows={2}
            className="flex-1 resize-none rounded-2xl border border-leaf-dark/10 px-3 py-2.5 text-sm outline-none focus:border-leaf focus:ring-4 focus:ring-leaf/10 transition"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button onClick={publish} disabled={!draft.trim()} className="btn-leaf py-2.5 disabled:opacity-50">
            <Send size={16} /> Publier
          </button>
        </div>
      </div>

      {/* Fil */}
      <div className="space-y-3">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf-soft text-xl">
                {p.avatar}
              </span>
              <div className="flex-1">
                <p className="font-display font-semibold text-leaf-dark leading-tight">{p.author}</p>
                <p className="text-xs text-muted font-semibold">{p.time}</p>
              </div>
              <span className={`pill ${tagStyles[p.tag] ?? "bg-leaf-soft text-leaf-dark"}`}>{p.tag}</span>
            </div>

            <p className="mt-3 text-[15px] leading-relaxed text-ink">{p.text}</p>

            <div className="mt-3 flex items-center gap-5 text-sm font-bold text-muted">
              <button
                onClick={() => toggleLike(p.id)}
                className={`inline-flex items-center gap-1.5 transition ${liked.has(p.id) ? "text-berry" : ""}`}
              >
                <Heart size={18} fill={liked.has(p.id) ? "currentColor" : "none"} /> {p.likes}
              </button>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle size={18} /> {p.comments}
              </span>
              <span className="inline-flex items-center gap-1.5 ml-auto">
                <Share2 size={18} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
