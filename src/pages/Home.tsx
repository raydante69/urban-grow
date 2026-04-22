import { motion } from "motion/react";
import { ArrowRight, ShoppingCart, Leaf, Users, GraduationCap, Heart, Star, Truck } from "lucide-react";
import { siteData } from "../data";
import { Link } from "react-router-dom";

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-32 lg:pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={siteData.hero.image} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-top"
          />
          {/* Darker overlay for text visibility */}
          <div className="absolute inset-0 bg-[#0A2E18]/75"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-display font-bold leading-tight"
          >
            {siteData.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {siteData.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary px-10 py-4 text-brand-dark bg-white hover:bg-gray-100">
              {siteData.hero.cta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: INFOCARDS (id: bce5337) */}
      <section className="relative z-20 container-boxed -mt-20">
        <div className="glass-card rounded-[24px] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-heading/10">
            {siteData.infocards.map((card, i) => (
              <div key={card.id} className="flex flex-col items-center text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                   {i === 0 && <Leaf size={32} />}
                   {i === 1 && <Truck size={32} />}
                   {i === 2 && <Star size={32} />}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-heading">{card.title}</h3>
                <p className="text-body text-sm md:text-base leading-relaxed max-w-[280px]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT (id: c748273) */}
      <section className="section-padding bg-accent px-6 overflow-hidden">
        <div className="container-boxed grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-heading">
            <div className="space-y-4">
              <h2 className="text-heading text-4xl md:text-5xl font-display">{siteData.about.title}</h2>
              <p className="text-lg text-heading/80 leading-relaxed">{siteData.about.description1}</p>
            </div>
            <p className="text-lg font-bold text-heading">{siteData.about.description2}</p>
            <div className="pt-4">
               <Link to="/contact/" className="btn-secondary bg-heading text-white border-none hover:bg-heading/90 px-10 py-4 shadow-xl">
                 En savoir plus
               </Link>
            </div>
          </div>
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={siteData.about.image} 
                alt="About UrbanGrow" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INITIATIVES (id: 01487cf) */}
      <section className="section-padding bg-bg-base px-6">
        <div className="container-boxed space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">{siteData.initiatives.title}</h2>
            <p className="text-xl text-body leading-relaxed">{siteData.initiatives.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {siteData.initiatives.items.map((item, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-bg-alt hover:bg-white hover:shadow-lux transition-all duration-500 border border-transparent hover:border-heading/5 text-left">
                <div className="w-16 h-16 bg-heading/5 rounded-2xl flex items-center justify-center text-heading mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                   {i === 0 && <Users size={32} />}
                   {i === 1 && <GraduationCap size={32} />}
                   {i === 2 && <Heart size={32} />}
                </div>
                <h4 className="text-2xl lg:text-3xl font-display mb-4">{item.title}</h4>
                <div className="w-12 h-1 bg-accent mb-6 rounded-full"></div>
                <p className="text-body text-base lg:text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: COMMUNITY CTA (id: 6f86b2c) */}
      <section className="py-12 bg-bg-base px-6">
        <div className="container-boxed flex flex-col md:flex-row items-center justify-between gap-8 bg-heading p-12 rounded-[20px] shadow-2xl">
          <div className="text-white space-y-4">
            <h3 className="text-3xl md:text-4xl font-display text-white">Rejoignez notre communauté</h3>
            <p className="opacity-90 font-medium text-lg max-w-xl text-white">Participez à nos initiatives et découvrez comment cultiver la nature chez vous tout en aidant les autres.</p>
          </div>
          <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary bg-white text-heading hover:bg-gray-100 px-10 py-4 whitespace-nowrap">
            Découvrir le kit
          </Link>
        </div>
      </section>

      {/* SECTION 6: STORIES (id: 993f5a2) */}
      <section className="section-padding bg-bg-alt px-6">
        <div className="container-boxed space-y-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">{siteData.stories.title}</h2>
            <p className="text-xl text-body leading-relaxed">{siteData.stories.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {siteData.stories.items.map((story) => (
              <motion.div 
                key={story.title}
                whileHover={{ y: -10 }}
                className="glass-card rounded-[32px] overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-1/2 h-72 sm:h-auto overflow-hidden">
                   <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="sm:w-1/2 p-10 flex flex-col justify-center space-y-6">
                  <h4 className="text-2xl lg:text-3xl font-display text-heading">{story.title}</h4>
                  <p className="text-body text-base lg:text-lg leading-relaxed">{story.description}</p>
                  <div className="flex items-center gap-1.5 text-accent">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA (id: d887d17) */}
      <section className="relative py-48 flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={siteData.finalCta.bg} alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0A2E18]/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
           <h2 className="text-white text-5xl md:text-7xl font-display leading-tight">{siteData.finalCta.title}</h2>
           <p className="text-white/90 text-2xl font-medium max-w-2xl mx-auto">{siteData.finalCta.subtitle}</p>
           <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary px-12 py-5 text-xl">
             Découvrir le kit
           </Link>
        </div>
      </section>
    </div>
  );
}
