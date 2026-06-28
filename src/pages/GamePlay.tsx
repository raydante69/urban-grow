import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { games } from "../data";
import MemoryGame from "./games/MemoryGame";
import QuizGame from "./games/QuizGame";
import CountGame from "./games/CountGame";

export default function GamePlay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="text-center pt-20">
        <p className="text-5xl">🎲</p>
        <p className="mt-4 font-semibold text-muted">Jeu introuvable.</p>
        <Link to="/jeux" className="btn-leaf mt-6 inline-flex">Retour aux jeux</Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-leaf-dark shadow-[var(--shadow-soft)] active:scale-95 transition"
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl leading-tight">{game.emoji} {game.title}</h1>
          <p className="text-xs font-bold text-muted">{game.skill} · {game.age}</p>
        </div>
      </div>

      {game.type === "memory" && <MemoryGame />}
      {game.type === "quiz" && <QuizGame />}
      {game.type === "count" && <CountGame />}
    </div>
  );
}
