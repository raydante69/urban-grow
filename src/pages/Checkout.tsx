import { useState } from "react";
import { motion } from "motion/react";
import { useCart } from "../App";
import { siteData } from "../data";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const subtotal = cartItems.reduce((acc, i) => acc + ((i.price || 0) * i.quantity), 0);
  const shipping = 0; // Free shipping as per previous discussions
  const total = subtotal + shipping;

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-alt px-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-display text-heading font-bold">Votre panier est vide</h1>
          <p className="text-body text-lg">Veuillez ajouter des produits avant de passer commande.</p>
          <Link to="/collections/graines/" className="btn-primary block">
            Découvrir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-alt min-h-screen pt-32 pb-24">
      <div className="container-boxed">
        <div className="mb-12 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-heading font-bold hover:text-accent transition-colors">
            <ArrowLeft size={20} />
            Retour
          </button>
          <div className="hidden md:flex items-center gap-4">
             {[1, 2, 3].map(s => (
               <div key={s} className="flex items-center gap-2">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? "bg-accent text-heading" : "bg-heading/10 text-heading/40"}`}>
                   {s}
                 </div>
                 <span className={`text-xs font-bold uppercase tracking-widest ${step >= s ? "text-heading" : "text-heading/30"}`}>
                   {s === 1 ? "Livraison" : s === 2 ? "Paiement" : "Confirmation"}
                 </span>
                 {s < 3 && <div className="w-8 h-[2px] bg-heading/10 mx-2" />}
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-heading/5">
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-display text-heading font-bold">Informations de livraison</h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Email *</label>
                      <input required type="email" placeholder="votre@email.com" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Téléphone *</label>
                      <input required type="tel" placeholder="06 12 34 56 78" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Prénom *</label>
                      <input required type="text" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Nom *</label>
                      <input required type="text" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Adresse complète *</label>
                      <input required type="text" placeholder="123 rue de la Nature" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Code Postal *</label>
                      <input required type="text" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Ville *</label>
                      <input required type="text" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                    </div>
                    <div className="md:col-span-2 pt-6">
                      <button type="submit" className="w-full btn-primary py-5 text-xl font-bold">
                        Continuer vers le paiement
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-display text-heading font-bold">Méthode de paiement</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border-2 border-accent bg-accent/5 rounded-2xl flex items-center gap-4 cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center">
                        <div className="w-3 h-3 bg-accent rounded-full" />
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-accent" />
                        <span className="font-bold text-heading">Carte Bancaire</span>
                      </div>
                    </div>
                    <div className="p-6 border border-heading/10 rounded-2xl flex items-center gap-4 cursor-not-allowed opacity-50">
                      <div className="w-6 h-6 rounded-full border-2 border-heading/20" />
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-heading">PayPal</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-heading/10">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Numéro de carte *</label>
                        <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-heading/60">Date d'expiration *</label>
                          <input required type="text" placeholder="MM / AA" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-heading/60">CVC *</label>
                          <input required type="text" placeholder="123" className="w-full px-6 py-4 bg-bg-alt border border-heading/10 rounded-xl focus:bg-white focus:ring-2 focus:ring-accent outline-none font-medium transition-all" />
                        </div>
                     </div>
                  </div>

                  <div className="pt-6">
                    <button onClick={() => setStep(3)} className="w-full btn-primary py-5 text-xl font-bold">
                      Valider ma commande ({total.toFixed(2)} €)
                    </button>
                    <button onClick={() => setStep(1)} className="w-full mt-4 text-heading/50 font-bold hover:text-heading transition-colors">
                      Revenir à la livraison
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-1000">
                    <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto text-heading mb-10 shadow-3xl shadow-accent/40">
                      <ShieldCheck size={64} />
                    </div>
                    <h2 className="text-5xl font-display font-bold text-heading mb-6">Merci pour votre confiance !</h2>
                    <p className="text-xl text-body mb-12 max-w-lg mx-auto">Votre commande est validée. Vous recevrez un email de confirmation d'ici quelques instants.</p>
                    <Link to="/" className="btn-primary px-12 py-5 text-xl">
                      Retour à l'accueil
                    </Link>
                </div>
              )}
            </div>

            {step < 3 && (
              <div className="flex flex-col md:flex-row items-center gap-8 px-8 py-6 bg-white/50 rounded-3xl border border-heading/5">
                <div className="flex items-center gap-3">
                   <Truck className="text-accent" />
                   <span className="text-sm font-bold text-heading">Livraison Gratuite</span>
                </div>
                <div className="flex items-center gap-3">
                   <ShieldCheck className="text-accent" />
                   <span className="text-sm font-bold text-heading">Paiement 100% Sécurisé</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Resume */}
          <div className="lg:col-span-4 sticky top-32">
             <div className="bg-white rounded-[32px] p-8 shadow-sm border border-heading/5 flex flex-col gap-8">
                <h3 className="text-xl font-bold text-heading">Résumé de la commande</h3>
                
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                   {cartItems.map((item) => (
                     <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl bg-bg-alt overflow-hidden shrink-0 border border-heading/5">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                           <h4 className="text-sm font-bold text-heading leading-tight line-clamp-1">{item.name}</h4>
                           <p className="text-xs text-body">Quantité: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-heading">{(item.price * item.quantity).toFixed(2)} €</p>
                     </div>
                   ))}
                </div>

                <div className="pt-8 border-t border-heading/10 space-y-4">
                   <div className="flex justify-between text-body">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                   </div>
                   <div className="flex justify-between text-body">
                      <span>Livraison</span>
                      <span className="text-accent font-bold">Gratuite</span>
                   </div>
                   <div className="flex justify-between text-2xl font-bold text-heading pt-4">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                   </div>
                </div>

                <div className="p-4 bg-bg-alt rounded-2xl">
                   <p className="text-xs text-center text-body italic">
                      "Cultivez le futur directement dans votre cuisine."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
