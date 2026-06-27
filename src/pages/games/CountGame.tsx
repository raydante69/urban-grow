import { useState } from "react";
import { Check, X, RotateCcw, Sprout } from "lucide-react";

function newRound(prev?: number) {
  let n = Math.floor(Math.random() * 8) + 2; // 2 à 9
  while (n === prev) n = Math.floor(Math.random() * 8) + 2;
  // 3 options proches qui contiennent la bonne réponse
  const set = new Set<number>([n]);
  while (set.size < 3) {
    const delta = [-2, -1, 1, 2][Math.floor(Math.random() * 4)];
    const cand = n + delta;
    if (cand >= 1 && cand <= 12) set.add(cand);
  }
  const options = [...set].sort(() => Math.random() - 0.5);
  return { n, options };
}

export default function CountGame() {
  const [round, setRound] = useState(() => newRound());
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const choose = (v: number) => {
    if (picked !== null) return;
    setPicked(v);
    if (v === round.n) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setRound((r) => newRound(r.n));
      setPicked(null);
    }, 1100);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-muted">
        Compte les graines tombées dans le bac, puis choisis le bon chiffre !
      </p>

      <div className="flex items-center justify-between">
        <span className="pill bg-leaf-soft text-leaf-dark">⭐ Score : {score}</span>
        <span className="pill bg-white text-leaf shadow-[var(--shadow-soft)]">
          🔥 Série : {streak}
        </span>
        <button
          onClick={() => { setScore(0); setStreak(0); setRound(newRound()); setPicked(null); }}
          className="pill bg-white text-leaf shadow-[var(--shadow-soft)]"
        >
          <RotateCcw size={14} /> Zéro
        </button>
      </div>

      {/* Le bac de graines */}
      <div className="card bg-gradient-to-b from-leaf-soft to-white">
        <div className="flex items-center gap-2 text-sm font-bold text-leaf-dark mb-2">
          <Sprout size={16} /> Combien de graines ?
        </div>
        <div className="min-h-[120px] grid grid-cols-5 gap-2 place-items-center rounded-2xl bg-white/60 p-4">
          {Array.from({ length: round.n }).map((_, i) => (
            <span key={i} className="text-3xl animate-[pop_.3s_ease]">🌰</span>
          ))}
        </div>
      </div>

      {/* Choix */}
      <div className="grid grid-cols-3 gap-3">
        {round.options.map((v) => {
          const isRight = v === round.n;
          let style = "bg-white text-leaf-dark";
          if (picked !== null) {
            if (isRight) style = "bg-leaf text-white";
            else if (picked === v) style = "bg-berry/15 text-berry";
            else style = "bg-white text-muted opacity-60";
          }
          return (
            <button
              key={v}
              onClick={() => choose(v)}
              disabled={picked !== null}
              className={`aspect-square rounded-3xl font-display font-bold text-4xl grid place-items-center shadow-[var(--shadow-soft)] transition active:scale-95 ${style}`}
            >
              {picked !== null && isRight ? (
                <Check size={36} />
              ) : picked === v && !isRight ? (
                <X size={36} />
              ) : (
                v
              )}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm font-semibold text-muted">
        {picked === null
          ? "Touche le bon nombre 👆"
          : picked === round.n
          ? "Bravo, c'est ça ! 🎉"
          : `Presque ! Il y avait ${round.n} graines.`}
      </p>
    </div>
  );
}
