import { useParams, Link } from "react-router-dom";
import { siteData } from "../data";
import { motion } from "motion/react";
import { Calendar, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

export default function WhitePaperDetail() {
  const { id } = useParams();
  const doc = siteData.whitePapers.find(w => w.id === id);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!doc) {
    return (
      <div className="py-40 text-center space-y-8">
        <h1 className="text-4xl font-display">Livre blanc non trouvé</h1>
        <Link to="/blog/" className="btn-primary px-8 py-4">Retour au contenu pédagogique</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, this would trigger a backend function to send the PDF/Link
      console.log(`Sending white paper ${doc.title} to ${email}`);
    }, 1500);
  };

  return (
    <div className="bg-bg-alt min-h-screen">
      <section className="relative h-[50vh] overflow-hidden">
        <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-heading/60 flex items-end pb-16 px-6">
          <div className="container-boxed">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-6 max-w-4xl"
            >
              <Link to="/blog/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all">
                <ArrowLeft size={16} /> Retour
              </Link>
              <div className="inline-block bg-accent text-heading text-[10px] uppercase font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                 Livre Blanc
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                {doc.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Teaser Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-body font-bold uppercase tracking-widest text-sm">
                <Calendar size={18} className="text-accent" />
                <span>Publié le {doc.date}</span>
              </div>
              <div className="prose prose-xl prose-slate">
                <p className="text-2xl font-medium text-heading leading-relaxed italic border-l-4 border-accent pl-6">
                  {doc.excerpt}
                </p>
                <div className="whitespace-pre-line text-lg lg:text-xl text-body leading-relaxed pt-8">
                  {doc.teaser}
                </div>
              </div>
            </div>

            {/* Right: Lead Gen Form */}
            <div className="glass-card p-10 md:p-14 rounded-[40px] shadow-3xl shadow-heading/5 sticky top-32">
              {!isSubmitted ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display text-heading">Recevoir le livre blanc</h2>
                    <p className="text-body text-lg">Inscrivez-vous pour recevoir gratuitement ce guide complet directement dans votre boîte mail.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-heading uppercase tracking-wider ml-1">Votre Email</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@mail.com"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg"
                      />
                    </div>
                    <button 
                      disabled={isLoading}
                      className={`w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Envoyer le guide <Send size={20} /></>
                      )}
                    </button>
                    <p className="text-xs text-body/60 text-center">En vous inscrivant, vous acceptez de recevoir nos conseils pédagogiques. Désinscription en un clic.</p>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-10"
                >
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display text-heading">C'est en route !</h2>
                    <p className="text-body text-xl">
                      Le livre blanc <strong>"{doc.title}"</strong> a été envoyé avec succès à <span className="text-heading font-bold">{email}</span>.
                    </p>
                    <p className="text-body text-lg">Vérifiez vos spams si vous ne le voyez pas arriver d'ici 2 minutes.</p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent font-bold hover:underline"
                  >
                    Utiliser une autre adresse mail
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
