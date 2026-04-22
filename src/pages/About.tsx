import { siteData } from "../data";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-bg-alt min-h-screen">
      {/* SECTION 1: HERO (id: 1df0150) */}
      <section className="relative py-48 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/gemini-generated-image-k4urdmk4urdmk4ur-scaled.png" 
             alt="About Hero" 
             className="w-full h-full object-cover" 
           />
           <div className="absolute inset-0 bg-[#0A2E18]/70"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-display font-bold"
          >
            À Propos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-xl max-w-2xl mx-auto"
          >
            Découvrez comment UrbanGrow révolutionne l'agriculture urbaine et vous aide à cultiver chez vous.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: ABOUT CONTENT (id: 13aa05d) */}
      <section className="py-24 bg-bg-alt px-6">
        <div className="container-boxed grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-heading">
                À propos d'UrbanGrow
              </h2>
              <p className="text-lg text-body leading-relaxed">
                UrbanGrow est la solution idéale pour tous ceux qui souhaitent cultiver leurs propres herbes aromatiques à la maison. Nous offrons des kits de jardinage d'intérieur innovants et éducatifs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 border-l border-heading/20 pl-8">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-heading uppercase tracking-wide">Nature Connectée</h4>
                <p className="text-body">Profitez d'une agriculture intérieure simplifiée avec notre technologie innovante et respectueuse de l'environnement.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-heading uppercase tracking-wide">Éducation Durable</h4>
                <p className="text-body">Apprenez les meilleures pratiques de jardinage urbain grâce à nos ressources et conseils adaptés à tous.</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/gemini-generated-image-cw4mf1cw4mf1cw4m1-scaled.png" 
              alt="Connected Garden" 
              className="rounded-2xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: VISION & MISSION (id: 5933ca3) */}
      <section className="section-padding bg-bg-base px-6">
        <div className="container-boxed space-y-20">
          <div className="w-full h-[500px] md:h-[650px] rounded-[32px] overflow-hidden shadow-lux relative group">
            <img 
              src="https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/home-garden-with-different-plants-1684004.jpeg" 
              alt="Garden" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-heading/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
             <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-display text-heading">Notre Vision</h3>
                <p className="text-lg lg:text-xl text-body leading-relaxed">
                  Créer un monde où chacun peut cultiver sa propre nourriture durable dans un environnement urbain, transformant chaque foyer en un sanctuaire vert.
                </p>
             </div>
             <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-display text-heading">Notre Mission</h3>
                <p className="text-lg lg:text-xl text-body leading-relaxed">
                  Faciliter l'accès à l'agriculture urbaine pour tous, en proposant des solutions de culture connectées, intuitives et éco-responsables.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA (id: 655763d) */}
      <section className="relative py-32 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/crop-gardener-hunkering-near-potted-plant-in-garden-5230918.jpeg" alt="Final CTA" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#0A2E18]/75"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
           <h2 className="text-white text-4xl md:text-5xl font-display leading-tight">Agissez maintenant</h2>
           <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto">Rejoignez notre mouvement vers un avenir plus vert et plus durable dès aujourd'hui.</p>
           <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary">
             Découvrir le kit
           </Link>
        </div>
      </section>
    </div>
  );
}
