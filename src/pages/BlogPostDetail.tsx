import { useParams, Link } from "react-router-dom";
import { siteData } from "../data";
import { motion } from "motion/react";
import { Calendar, ArrowLeft } from "lucide-react";

export default function BlogPostDetail() {
  const { id } = useParams();
  const post = siteData.blog.find(b => b.id === id);

  if (!post) {
    return (
      <div className="py-40 text-center space-y-8">
        <h1 className="text-4xl font-display">Article non trouvé</h1>
        <Link to="/blog/" className="btn-primary px-8 py-4">Retour au blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end pb-20 px-6">
          <div className="container-boxed">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-6 max-w-4xl"
            >
              <Link to="/blog/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-all">
                <ArrowLeft size={16} /> Retour au blog
              </Link>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <Calendar size={18} className="text-accent" />
                <span className="font-bold">{post.date}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container-boxed max-w-3xl">
          <div className="prose prose-xl prose-slate mx-auto">
             {post.content ? (
               <div className="whitespace-pre-line text-lg lg:text-xl text-body leading-relaxed space-y-6">
                 {post.content}
               </div>
             ) : (
               <p className="text-xl text-body">Contenu en cours de rédaction...</p>
             )}
          </div>
        </div>
      </section>
    </div>
  );
}
