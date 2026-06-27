import { useEffect, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { memoryEmojis } from "../../data";

interface Card {
  uid: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(): Card[] {
  const pairs = [...memoryEmojis, ...memoryEmojis];
  return pairs
    .map((emoji, i) => ({ uid: i, emoji, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((c, i) => ({ ...c, uid: i }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const matchedCount = cards.filter((c) => c.matched).length;
  const won = matchedCount === cards.length;

  const reset = () => {
    setCards(buildDeck());
    setPicked([]);
    setMoves(0);
    setLock(false);
  };

  const flip = (uid: number) => {
    if (lock) return;
    const card = cards.find((c) => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    const next = cards.map((c) => (c.uid === uid ? { ...c, flipped: true } : c));
    const nowPicked = [...picked, uid];
    setCards(next);
    setPicked(nowPicked);

    if (nowPicked.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = nowPicked.map((id) => next.find((c) => c.uid === id)!);
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          setCards((cur) => cur.map((c) => (c.emoji === a.emoji ? { ...c, matched: true } : c)));
          setPicked([]);
          setLock(false);
        }, 450);
      } else {
        setTimeout(() => {
          setCards((cur) =>
            cur.map((c) => (nowPicked.includes(c.uid) ? { ...c, flipped: false } : c)),
          );
          setPicked([]);
          setLock(false);
        }, 800);
      }
    }
  };

  useEffect(() => () => setLock(false), []);

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-muted">
        Retrouve les paires identiques. Touche deux cartes pour les retourner !
      </p>

      <div className="flex items-center justify-between">
        <span className="pill bg-white text-leaf-dark shadow-[var(--shadow-soft)]">
          Coups : {moves}
        </span>
        <span className="pill bg-leaf-soft text-leaf-dark">
          Paires : {matchedCount / 2}/{memoryEmojis.length}
        </span>
        <button onClick={reset} className="pill bg-white text-leaf shadow-[var(--shadow-soft)]">
          <RotateCcw size={14} /> Rejouer
        </button>
      </div>

      {won ? (
        <div className="card text-center bg-leaf text-white py-8">
          <Trophy size={36} className="mx-auto" />
          <p className="mt-2 font-display font-semibold text-xl">Gagné ! 🎉</p>
          <p className="text-sm text-white/85">Toutes les paires trouvées en {moves} coups.</p>
          <button onClick={reset} className="btn-ghost mt-5 inline-flex text-leaf-dark">
            <RotateCcw size={16} /> Nouvelle partie
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {cards.map((c) => {
            const open = c.flipped || c.matched;
            return (
              <button
                key={c.uid}
                onClick={() => flip(c.uid)}
                className={`aspect-square rounded-2xl text-4xl grid place-items-center transition-all duration-200 active:scale-95 ${
                  open
                    ? "bg-white shadow-[var(--shadow-card)]"
                    : "bg-leaf shadow-[var(--shadow-soft)]"
                } ${c.matched ? "ring-4 ring-leaf/40" : ""}`}
                aria-label={open ? c.emoji : "Carte cachée"}
              >
                <span className={open ? "" : "opacity-30"}>{open ? c.emoji : "🌱"}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
