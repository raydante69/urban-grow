import { useLocation, Link } from "react-router-dom";
import { siteData } from "../data";
import { ShoppingCart, Plus, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../App";

export default function Catalog() {
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Determine current products based on exact location
  let currentCategory = "Graines";
  if (location.pathname.includes("potager-d-interieur")) currentCategory = "Kits";
  if (location.pathname.includes("terreau")) currentCategory = "Terreau";

  const products = siteData.products.filter(p => p.category === currentCategory);

  return (
    <div className="bg-bg-alt min-h-screen">
      <section className="relative py-40 bg-heading text-white px-6">
        <div className="container-boxed text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white"
          >
            {currentCategory === "Kits" ? "Le Kit UrbanGrow" : `Nos ${currentCategory}`}
          </motion.h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            {currentCategory === "Kits" 
              ? "L'innovation au service de votre intérieur. Découvrez notre kit hydroponique intelligent." 
              : "Tout le nécessaire pour une culture réussie, saine et durable."}
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:pb-32">
        <div className="container-boxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-8">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col glass-card rounded-[32px] overflow-hidden hover:shadow-lux transition-all duration-500"
              >
                <Link 
                  to={`/products/${product.id}/`}
                  className="aspect-square overflow-hidden relative bg-bg-alt inline-block"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-heading px-4 py-2 rounded-full text-sm font-black shadow-xl">
                    {product.price.toFixed(2)} €
                  </div>
                </Link>
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-accent">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                    <Link to={`/products/${product.id}/`}>
                      <h3 className="text-2xl font-display text-heading leading-tight group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    {product.description && (
                      <p className="text-body text-base line-clamp-3 leading-relaxed">{product.description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product, 1)}
                    className="w-full btn-primary px-4 py-4 text-base"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="container-boxed bg-accent rounded-[40px] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-3xl shadow-accent/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="text-heading text-center lg:text-left space-y-6 relative z-10">
             <h2 className="text-4xl md:text-5xl font-display text-heading">Besoin d'un conseil ?</h2>
             <p className="text-heading/80 text-xl max-w-xl">Nos experts botanistes vous guident gratuitement dans le choix de vos cultures.</p>
           </div>
           <Link to="/contact/" className="btn-primary bg-heading text-white hover:bg-heading/90 px-12 py-5 text-xl relative z-10">
             Nous contacter
           </Link>
        </div>
      </section>
    </div>
  );
}

