import { useState, FormEvent } from "react";
import { Send, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteData } from "../data";
import { Link } from "react-router-dom";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-bg-alt min-h-screen">
      {/* SECTION 1: HERO (id: bb1c753) */}
      <section className="relative py-48 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={siteData.contact.heroImg} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-heading/65"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            Contactez-nous
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-xl max-w-2xl mx-auto"
          >
            Nous sommes là pour répondre à toutes vos questions sur l'agriculture urbaine.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: FORM (id: 58c6bf0) */}
      <section className="relative z-20 -mt-20 mb-32 px-6">
        <div className="container-boxed">
           <div className="glass-card rounded-[32px] p-8 md:p-16 border-heading/10">
              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-700">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent mb-10">
                    <Send size={48} />
                  </div>
                  <h2 className="text-5xl font-display mb-6">Merci !</h2>
                  <p className="text-xl text-body mb-10 max-w-lg mx-auto">Votre message a bien été envoyé. Nos botanistes vous répondront prochainement.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary border-heading/20">Retour</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
                  <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-display text-heading">Parlons de votre projet</h3>
                      <p className="text-lg text-body leading-relaxed">Une question sur nos kits ? Un projet d'atelier collaboratif ? Notre équipe est à votre écoute pour vous accompagner.</p>
                    </div>
                    <div className="space-y-6 pt-6 pt-10 border-t border-heading/10">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Email</h4>
                        <p className="text-xl font-medium text-heading">hello@urbangrow.fr</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Instagram</h4>
                        <p className="text-xl font-medium text-heading">@urbangrow_official</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-xs font-bold text-accent uppercase tracking-widest">Nom *</label>
                        <input required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all text-heading" />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-xs font-bold text-accent uppercase tracking-widest">Prénom *</label>
                        <input required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all text-heading" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                        <label className="block text-xs font-bold text-accent uppercase tracking-widest">Email *</label>
                        <input required type="email" placeholder="votre@email.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all text-heading" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                        <label className="block text-xs font-bold text-accent uppercase tracking-widest">Message *</label>
                        <textarea required rows={6} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none transition-all resize-none text-heading"></textarea>
                    </div>
                    <div className="md:col-span-2 pt-4">
                        <button type="submit" className="w-full btn-primary py-5 text-xl">Envoyer mon message</button>
                    </div>
                  </form>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* SECTION 3: FAQ (id: c4cc4d1) */}
      <section className="section-padding px-6 bg-white">
        <div className="max-w-[800px] mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-display">Questions Fréquemment Posées</h2>
            <p className="text-body text-xl max-w-xl mx-auto leading-relaxed">Tout ce que vous devez savoir pour démarrer votre potager d'intérieur.</p>
          </div>
          
          <div className="space-y-6">
            {siteData.contact.faq.map((item, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lux transition-all duration-500">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left transition-colors"
                >
                  <span className="text-lg lg:text-xl font-bold text-heading pr-8 leading-tight">{item.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-accent" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-lg text-body leading-relaxed border-t border-heading/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA (id: 5e4b3cf) */}
      <section className="relative py-24 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/gemini-generated-image-mvupp4mvupp4mvup1-scaled.png" alt="CTA BG" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-heading/65"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
           <h2 className="text-white text-4xl md:text-5xl font-display leading-tight">Agissez maintenant</h2>
           <p className="text-white/80 text-xl">Rejoignez notre mouvement vers un avenir plus vert et plus durable dès aujourd'hui.</p>
           <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary bg-white text-heading hover:bg-gray-100">
             Découvrir le kit
           </Link>
        </div>
      </section>
    </div>
  );
}
