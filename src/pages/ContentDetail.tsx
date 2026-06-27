import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { articles } from "../data";
import FavButton from "../components/FavButton";

export default function ContentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="text-center pt-20">
        <p className="text-5xl">📭</p>
        <p className="mt-4 font-semibold text-muted">Article introuvable.</p>
        <Link to="/contenu" className="btn-leaf mt-6 inline-flex">Retour au contenu</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-leaf-dark shadow-[var(--shadow-soft)] active:scale-95 transition"
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
        </button>
        <FavButton
          item={{ id: article.id, kind: "article", title: article.title, emoji: article.emoji, image: article.image, to: `/contenu/${article.id}` }}
          size={20}
        />
      </div>

      <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
        <img src={article.image} alt={article.title} className="h-44 w-full object-cover" />
      </div>

      <div className="text-center">
        <span className="pill bg-sky/15 text-sky">{article.category}</span>
        <h1 className="mt-3 text-2xl leading-tight">{article.title}</h1>
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted font-semibold">
          <Clock size={12} /> {article.read} de lecture
        </span>
      </div>

      <article className="card space-y-4">
        {article.body.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-ink">
            {p}
          </p>
        ))}
      </article>

      <Link to="/contenu" className="btn-ghost w-full">Tous les articles</Link>
    </div>
  );
}
