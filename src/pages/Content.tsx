import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { articles } from "../data";
import FavButton from "../components/FavButton";

export default function Content() {
  const [featured, ...rest] = articles;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Contenu pédagogique 📚</h1>
        <p className="text-muted font-semibold mt-1">
          Des articles courts pour apprendre en famille.
        </p>
      </header>

      {/* À la une (photo réelle) */}
      <Link
        to={`/contenu/${featured.id}`}
        className="relative block overflow-hidden rounded-3xl shadow-[var(--shadow-card)] active:scale-[0.99] transition"
      >
        <img src={featured.image} alt={featured.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-leaf-dark/95 via-leaf-dark/45 to-leaf-dark/20" />
        <div className="relative p-5 pt-20 text-white">
          <span className="pill bg-white/20 text-white backdrop-blur-sm">À la une</span>
          <h2 className="mt-2 text-xl font-display font-semibold text-white leading-snug">
            {featured.title}
          </h2>
          <p className="mt-1 text-sm text-white/85 leading-snug">{featured.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
            Lire l'article <ChevronRight size={15} />
          </span>
        </div>
      </Link>

      <div className="space-y-3">
        {rest.map((a) => (
          <Link
            key={a.id}
            to={`/contenu/${a.id}`}
            className="card flex items-center gap-4 active:scale-[0.99] transition"
          >
            <img src={a.image} alt={a.title} loading="lazy" className="thumb h-14 w-14 shrink-0 rounded-2xl" />
            <div className="flex-1 min-w-0">
              <span className="pill bg-sky/15 text-sky !py-0.5">{a.category}</span>
              <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight">{a.title}</p>
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted font-semibold">
                <Clock size={12} /> {a.read}
              </span>
            </div>
            <FavButton item={{ id: a.id, kind: "article", title: a.title, emoji: a.emoji, image: a.image, to: `/contenu/${a.id}` }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
