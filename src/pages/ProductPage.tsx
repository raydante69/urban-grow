import { motion } from "motion/react";
import { Star, Truck, ShieldCheck, ShoppingCart, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { siteData } from "../data";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../App";

export default function ProductPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = siteData.products.find(p => p.id === productId) || siteData.products.find(p => p.id === "potager-d-interieur-connecte-urbangrow") || siteData.products[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const upsellProducts = siteData.products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="bg-bg-base min-h-screen">
      {/* SECTION 1: PRODUCT HERO BACKGROUND */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={product.category === "Graines" ? "https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/gemini-generated-image-k4urdmk4urdmk4ur-scaled.png" : "https://royalblue-chinchilla-815450.hostingersite.com/wp-content/uploads/2026/03/gemini-generated-image-td1k3ztd1k3ztd1k-scaled.png"} 
          alt="Product Context" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A2E18]/60"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-20">
           <h1 className="text-white text-5xl md:text-7xl font-display font-bold text-center px-6">{product.name}</h1>
        </div>
      </section>

      {/* SECTION 2: PRODUCT DETAILS */}
      <section className="relative z-10 -mt-20 container-boxed pb-24 px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-lux p-8 md:p-16 border border-heading/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Product Image */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
            >
              <div className="aspect-square rounded-[32px] overflow-hidden bg-bg-alt relative group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {product.category === "Kits" && (
                  <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full font-bold shadow-xl">
                    Best-Seller
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {[product.image, product.image, product.image].map((img, i) => (
                   <div key={i} className="aspect-square rounded-2xl bg-bg-alt overflow-hidden cursor-pointer hover:ring-2 ring-accent transition-all">
                      <img src={img} alt="prev" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                   </div>
                 ))}
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent">
                   <div className="flex">
                      {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                   </div>
                   <span className="text-sm font-bold text-body">(48 avis certifiés)</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-display text-heading leading-tight">{product.name}</h2>
                <p className="text-3xl font-display text-accent font-bold">{product.price.toFixed(2)} €</p>
              </div>

              <p className="text-lg text-body leading-relaxed">
                {product.description} Vivez l'expérience UrbanGrow : des produits de haute qualité conçus pour apporter la nature directement dans votre maison urbaine.
              </p>

              <div className="space-y-6 pt-6 border-t border-heading/10">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center bg-bg-alt rounded-xl p-1 shrink-0">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:text-accent transition-colors">
                        <Minus size={20} />
                     </button>
                     <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:text-accent transition-colors">
                        <Plus size={20} />
                     </button>
                  </div>
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="flex-grow btn-primary flex items-center justify-center gap-3 py-6 shadow-2xl"
                  >
                     <ShoppingCart size={24} />
                     Ajouter au panier
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 p-4 bg-bg-alt rounded-2xl">
                      <Truck className="text-accent" size={24} />
                      <span className="text-sm font-bold text-heading">Livraison Gratuite (48h)</span>
                   </div>
                   <div className="flex items-center gap-3 p-4 bg-bg-alt rounded-2xl">
                      <ShieldCheck className="text-accent" size={24} />
                      <span className="text-sm font-bold text-heading">Paiement sécurisé</span>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-heading font-bold uppercase tracking-widest text-xs">Pourquoi choisir UrbanGrow ?</h4>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Agriculture urbaine", "Facile d'utilisation", "Qualité premium", "Support français", "Design épuré", "Garantie satisfaction"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-body">
                         <div className="w-2 h-2 bg-accent rounded-full shrink-0"></div>
                         {f}
                      </li>
                    ))}
                 </ul>
              </div>
            </motion.div>
          </div>

          {/* Details Tabs placeholder */}
          <div className="mt-24 pt-24 border-t border-heading/10 grid grid-cols-1 lg:grid-cols-3 gap-16">
             <div className="space-y-4">
                <h3 className="text-2xl font-display text-heading">Qualité</h3>
                <p className="text-body leading-relaxed">Nos produits sont sélectionnés pour leur durabilité et leur performance, garantissant une expérience de jardinage sans faille.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-display text-heading">Engagement</h3>
                <p className="text-body leading-relaxed">UrbanGrow s'engage pour une planète plus verte en proposant des solutions locales et éco-responsables.</p>
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-display text-heading">Conseil</h3>
                <p className="text-body leading-relaxed">Une question ? Nos experts botanistes sont à votre disposition pour vous accompagner dans votre aventure végétale.</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: RELATED PRODUCTS (UPSELL) */}
      <section className="section-padding px-6 lg:px-8 bg-bg-alt">
        <div className="container-boxed space-y-16">
          <div className="text-center space-y-4">
             <h2 className="text-4xl md:text-5xl font-display">Complétez votre commande</h2>
             <p className="text-xl text-body">Découvrez nos autres pépites pour votre jardin d'intérieur.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {upsellProducts.map(upsell => (
               <Link 
                 key={upsell.id} 
                 to={`/products/${upsell.id}/`} 
                 className="group glass-card rounded-[32px] overflow-hidden shadow-sm hover:shadow-lux transition-all flex flex-col h-full"
               >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img src={upsell.image} alt={upsell.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <h5 className="text-xl font-display text-heading group-hover:text-accent transition-colors leading-tight mb-4">{upsell.name}</h5>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-heading/5">
                      <p className="text-accent font-bold text-lg">{upsell.price.toFixed(2)} €</p>
                      <Plus size={20} className="text-heading group-hover:text-accent group-hover:rotate-90 transition-all" />
                    </div>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
