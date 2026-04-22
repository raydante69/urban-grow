import { siteData } from "../data";
import { motion } from "motion/react";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="bg-bg-alt min-h-screen">
      {/* Hero */}
      <section className="py-40 bg-heading text-white px-6">
        <div className="container-boxed text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white"
          >
            Contenu Pédagogique
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Apprenez à cultiver durablement et découvrez les secrets de l'agriculture urbaine.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6 md:pb-32">
        <div className="container-boxed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {siteData.blog.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-[32px] overflow-hidden hover:shadow-lux transition-all group flex flex-col h-full"
            >
              <div className="h-72 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-accent text-heading text-[10px] uppercase font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                   Education
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-body text-xs font-bold uppercase tracking-widest">
                    <Calendar size={14} className="text-accent" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display text-heading group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-body text-base lg:text-lg line-clamp-3 leading-relaxed opacity-85">
                    {post.excerpt}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-heading font-bold group/btn group-hover:text-accent transition-colors">
                  Lire la suite <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 md:pb-32">
        <div className="container-boxed bg-accent rounded-[30px] p-10 md:p-20 text-center space-y-8 relative overflow-hidden shadow-3xl shadow-accent/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <BookOpen className="mx-auto text-heading" size={60} />
          <div className="space-y-4 relative z-10">
            <h2 className="text-heading text-4xl md:text-5xl font-display leading-tight">Newsletter Pédagogique</h2>
            <p className="text-heading/80 text-xl max-w-2xl mx-auto">Recevez chaque mois des conseils exclusifs de nos experts botanistes.</p>
          </div>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="flex-grow px-6 py-4 rounded-xl bg-white focus:ring-2 focus:ring-heading outline-none font-medium" 
            />
            <button className="bg-heading text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform whitespace-nowrap">S'inscrire</button>
          </form>
        </div>
      </section>
    </div>
  );
}

