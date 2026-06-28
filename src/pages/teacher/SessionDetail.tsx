import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, GraduationCap, Target, Download, CheckCircle2, Gamepad2, FileText } from "lucide-react";
import { sessions } from "../../data";
import { useTeacher } from "../../teacherStore";
import { disciplineStyle } from "./Sessions";

function today() {
  return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isStarred, toggleStar, doneDates, markDone, unmarkDone } = useTeacher();
  const session = sessions.find((s) => s.id === id);

  if (!session) {
    return (
      <div className="text-center pt-20">
        <p className="text-5xl">📘</p>
        <p className="mt-4 font-semibold text-muted">Séance introuvable.</p>
        <Link to="/enseignant/seances" className="btn-ghost mt-6 inline-flex text-sky">Retour aux séances</Link>
      </div>
    );
  }

  const done = doneDates[session.id];
  const starred = isStarred(session.id);

  return (
    <div className="space-y-5">
      {/* En-tête photo */}
      <div className="-mx-5 -mt-5">
        <div className="relative h-48">
          <img src={session.image} alt={session.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-leaf-dark/90 via-leaf-dark/20 to-leaf-dark/35" />
          <div className="relative flex items-center justify-between p-5">
            <button
              onClick={() => navigate(-1)}
              className="grid h-10 w-10 place-items-center rounded-2xl bg-white/85 text-leaf-dark active:scale-95 transition"
              aria-label="Retour"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => toggleStar(session.id)}
              className={`grid h-10 w-10 place-items-center rounded-2xl transition active:scale-90 ${
                starred ? "bg-sun text-white" : "bg-white/85 text-muted"
              }`}
              aria-label={starred ? "Retirer le favori" : "Mettre en favori"}
            >
              <Star size={20} fill={starred ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2">
              <span className={`pill ${disciplineStyle[session.discipline]}`}>{session.discipline}</span>
              <span className="pill bg-white/20 text-white backdrop-blur-sm">{session.level}</span>
              <span className="pill bg-white/20 text-white backdrop-blur-sm"><Clock size={12} /> {session.duration}</span>
            </div>
            <h1 className="mt-1.5 text-2xl text-white drop-shadow">{session.title}</h1>
          </div>
        </div>
      </div>

      {/* Objectif */}
      <section className="card">
        <h2 className="text-base flex items-center gap-2 mb-1.5"><Target size={18} className="text-sky" /> Objectif</h2>
        <p className="text-sm font-semibold text-ink leading-snug">{session.objective}</p>
      </section>

      {/* Compétences */}
      <section className="card">
        <h2 className="text-base flex items-center gap-2 mb-3"><GraduationCap size={18} className="text-sky" /> Compétences travaillées</h2>
        <ul className="space-y-2">
          {session.skills.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-sky shrink-0" /> {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Matériel */}
      <section className="card">
        <h2 className="text-base mb-3">🎒 Matériel</h2>
        <ul className="space-y-2">
          {session.materials.map((m) => (
            <li key={m} className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-leaf shrink-0" /> {m}
            </li>
          ))}
        </ul>
      </section>

      {/* Déroulé */}
      <section>
        <h2 className="text-lg mb-3">🧭 Déroulé de la séance</h2>
        <div className="space-y-3">
          {session.steps.map((s, i) => (
            <div key={i} className="card flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky font-display font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-display font-semibold text-leaf-dark">{s.title}</p>
                <p className="mt-0.5 text-sm text-muted leading-snug">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Liens jeu / activité */}
      {(session.linkedGameId || session.linkedActivityId) && (
        <section className="card bg-sky/5 border-sky/15">
          <h2 className="text-base mb-2">🔗 Support pour la classe</h2>
          {session.linkedGameId && (
            <Link to={`/enseignant/jeu/${session.linkedGameId}`} className="flex items-center gap-3 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky/15 text-sky"><Gamepad2 size={18} /></span>
              <span className="flex-1 font-semibold text-leaf-dark text-sm">Lancer le jeu interactif en classe</span>
            </Link>
          )}
          {session.linkedActivityId && (
            <Link to={`/enseignant/activite/${session.linkedActivityId}`} className="flex items-center gap-3 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-soft text-leaf-dark">🌱</span>
              <span className="flex-1 font-semibold text-leaf-dark text-sm">Voir l'activité pas à pas</span>
            </Link>
          )}
        </section>
      )}

      {/* Fiche à télécharger */}
      <section className="card flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-berry/10 text-berry"><FileText size={20} /></span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-muted">Fiche pour la classe</p>
          <p className="font-display font-semibold text-leaf-dark text-sm truncate">{session.sheet}</p>
        </div>
        <button
          onClick={() => alert(`Téléchargement de la fiche :\n${session.sheet}\n\n(Démo — le PDF serait fourni dans la version finale.)`)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-sky text-white active:scale-95 transition shrink-0"
          aria-label="Télécharger la fiche"
        >
          <Download size={18} />
        </button>
      </section>

      {/* Marquer faite */}
      {done ? (
        <div className="space-y-2">
          <div className="card bg-leaf text-white flex items-center gap-3">
            <CheckCircle2 size={22} />
            <div className="flex-1">
              <p className="font-display font-semibold">Séance réalisée</p>
              <p className="text-sm text-white/85">Le {done}</p>
            </div>
          </div>
          <button onClick={() => unmarkDone(session.id)} className="btn-ghost w-full text-muted">
            Annuler « faite »
          </button>
        </div>
      ) : (
        <button onClick={() => markDone(session.id, today())} className="btn-leaf w-full">
          <CheckCircle2 size={18} /> Marquer cette séance comme faite
        </button>
      )}
    </div>
  );
}
