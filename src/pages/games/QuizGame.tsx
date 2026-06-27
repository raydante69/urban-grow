import { useState } from "react";
import { Check, X, RotateCcw, Trophy, ArrowRight, Lightbulb } from "lucide-react";
import { quizQuestions } from "../../data";

export default function QuizGame() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[step];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= quizQuestions.length) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const perfect = score === quizQuestions.length;
    return (
      <div className="card text-center bg-leaf text-white py-8">
        <Trophy size={36} className="mx-auto" />
        <p className="mt-2 font-display font-semibold text-xl">
          {perfect ? "Sans-faute ! 🌟" : "Bien joué ! 🎉"}
        </p>
        <p className="text-4xl font-display font-bold mt-2">
          {score}/{quizQuestions.length}
        </p>
        <p className="text-sm text-white/85 mt-1">
          {perfect ? "Tu es un·e vrai·e expert·e du potager !" : "Rejoue pour décrocher le sans-faute."}
        </p>
        <button onClick={restart} className="btn-ghost mt-5 inline-flex text-leaf-dark">
          <RotateCcw size={16} /> Rejouer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progression */}
      <div className="flex items-center justify-between">
        <span className="pill bg-white text-leaf-dark shadow-[var(--shadow-soft)]">
          Question {step + 1}/{quizQuestions.length}
        </span>
        <span className="pill bg-leaf-soft text-leaf-dark">Score : {score}</span>
      </div>
      <div className="h-2 rounded-full bg-leaf-dark/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-leaf transition-all"
          style={{ width: `${((step + (picked !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card text-center">
        <span className="text-5xl">{q.emoji}</span>
        <h2 className="mt-3 text-lg leading-snug">{q.question}</h2>
      </div>

      {/* Réponses */}
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = picked === i;
          let style = "bg-white text-leaf-dark border-leaf-dark/10";
          if (picked !== null) {
            if (isAnswer) style = "bg-leaf-soft text-leaf-dark border-leaf";
            else if (isPicked) style = "bg-berry/10 text-berry border-berry/40";
            else style = "bg-white text-muted border-leaf-dark/5 opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={`w-full rounded-2xl border-2 px-4 py-4 text-left font-display font-semibold flex items-center justify-between transition active:scale-[0.99] ${style}`}
            >
              {opt}
              {picked !== null && isAnswer && <Check size={20} className="text-leaf" />}
              {picked !== null && isPicked && !isAnswer && <X size={20} className="text-berry" />}
            </button>
          );
        })}
      </div>

      {/* Anecdote + suivant */}
      {picked !== null && (
        <>
          <div className="card flex items-start gap-3 bg-sun/10 border-sun/20">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sun/30 text-leaf-dark">
              <Lightbulb size={18} />
            </span>
            <p className="text-sm font-semibold text-leaf-dark leading-snug">{q.fact}</p>
          </div>
          <button onClick={next} className="btn-leaf w-full">
            {step + 1 >= quizQuestions.length ? "Voir mon score" : "Question suivante"}
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
