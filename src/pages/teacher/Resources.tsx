import { useState } from "react";
import { Download, ExternalLink, FileText } from "lucide-react";
import { resources, type ResourceType } from "../../data";

const typeStyle: Record<ResourceType, string> = {
  Fiche: "bg-berry/10 text-berry",
  Article: "bg-sky/15 text-sky",
  Programme: "bg-sun/20 text-leaf-dark",
};

const filters: ("Tout" | ResourceType)[] = ["Tout", "Fiche", "Article", "Programme"];

export default function Resources() {
  const [filter, setFilter] = useState<"Tout" | ResourceType>("Tout");
  const list = filter === "Tout" ? resources : resources.filter((r) => r.type === filter);

  const open = (title: string, isLink: boolean) =>
    alert(
      isLink
        ? `Ouverture de la ressource :\n${title}\n\n(Démo — le lien renverrait vers le référentiel officiel.)`
        : `Téléchargement :\n${title}\n\n(Démo — le PDF serait fourni dans la version finale.)`,
    );

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Ressources 📂</h1>
        <p className="text-muted font-semibold mt-1">
          Fiches à imprimer, articles pour la classe et liens vers les programmes.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pill whitespace-nowrap px-4 py-2 transition ${
              filter === f ? "bg-sky text-white" : "bg-white text-muted shadow-[var(--shadow-soft)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((r) => {
          const isLink = r.type === "Programme" || r.type === "Article";
          return (
            <div key={r.id} className="card flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-3xl">
                {r.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`pill ${typeStyle[r.type]} !py-0.5`}>{r.type}</span>
                  <span className="text-[11px] font-bold text-muted">{r.format}</span>
                </div>
                <p className="mt-1 font-display font-semibold text-leaf-dark leading-tight">{r.title}</p>
                <p className="mt-0.5 text-xs text-muted leading-snug line-clamp-2">{r.description}</p>
              </div>
              <button
                onClick={() => open(r.title, isLink)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky text-white active:scale-95 transition"
                aria-label={isLink ? "Ouvrir" : "Télécharger"}
              >
                {isLink ? <ExternalLink size={18} /> : <Download size={18} />}
              </button>
            </div>
          );
        })}
      </div>

      <div className="card flex items-start gap-3 bg-sky/5 border-sky/15">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-sky/15 text-sky"><FileText size={18} /></span>
        <p className="text-sm font-semibold text-leaf-dark leading-snug">
          Toutes les fiches sont au format A4, prêtes à projeter au TBI ou à photocopier pour la classe.
        </p>
      </div>
    </div>
  );
}
