/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingCart, Leaf, Search, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { useState, useEffect, createContext, useContext } from "react";
import { siteData } from "./data";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import BlogPostDetail from "./pages/BlogPostDetail";
import WhitePaperDetail from "./pages/WhitePaperDetail";

// CREATE CART CONTEXT
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartContext = createContext({
  cartCount: 0,
  cartItems: [] as CartItem[],
  addToCart: (product: any, qty: number) => {},
  isCartOpen: false,
  setIsCartOpen: (open: boolean) => {}
});

export const useCart = () => useContext(CartContext);

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, isCartOpen, setIsCartOpen, cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  const isSolid = scrolled || isOpen;
  const subtotal = cartItems.reduce((acc, i) => acc + ((i.price || 0) * i.quantity), 0);

  // Search logic
  const allSearchableItems = [
    ...siteData.products.map(p => ({ id: p.id, title: p.name, link: `/products/${p.id}/`, category: p.category, image: p.image })),
    ...siteData.blog.map(b => ({ id: b.id, title: b.title, link: `/blog/${b.id}/`, category: 'Article', image: b.image })),
    ...siteData.whitePapers.map(w => ({ id: w.id, title: w.title, link: `/livres-blancs/${w.id}/`, category: 'Livre Blanc', image: w.image }))
  ];

  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : allSearchableItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isSolid ? "bg-white shadow-xl py-4" : "bg-white/80 backdrop-blur-md py-6 border-b border-gray-100"
        }`}
      >
        <nav className="container-boxed flex items-center justify-between">
          <div className="flex items-center gap-16">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-heading">
                UrbanGrow
              </span>
            </Link>

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {siteData.nav.map((item) => {
                const isActive = item.path === "/" 
                  ? location.pathname === "/" 
                  : location.pathname.startsWith(item.path);
                return (
                  <Link 
                     key={item.path} 
                     to={item.path} 
                     className={`text-[15px] font-bold transition-all duration-300 ${
                       isActive ? "text-accent" : "text-heading hover:text-heading/60"
                     }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-heading hover:text-accent transition-colors"
              >
                <Search size={22} />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-heading relative hover:text-accent transition-all"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            <Link 
              to="/products/potager-d-interieur-connecte-urbangrow/"
              className="hidden md:block bg-[#B9F5D0] text-heading px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#A3E9BE] transition-all shadow-sm"
            >
              Découvrir le kit
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-heading transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="container-boxed py-10 flex flex-col gap-8">
                 {siteData.nav.map((item) => {
                  const isActive = item.path === "/" 
                    ? location.pathname === "/" 
                    : location.pathname.startsWith(item.path);
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className={`text-lg font-bold transition-all flex items-center justify-between group ${
                        isActive ? "text-accent" : "text-heading hover:text-accent"
                      }`}
                    >
                      {item.title}
                      <ArrowRight size={16} className={`-rotate-45 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    </Link>
                  );
                })}
                <Link to="/products/potager-d-interieur-connecte-urbangrow/" className="btn-primary w-full text-center py-4 bg-[#B9F5D0] text-heading">
                   Découvrir le kit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[200] bg-heading/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="fixed inset-0 z-[201] flex flex-col p-8 md:p-20 pointer-events-none"
            >
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors pointer-events-auto"
              >
                <X size={40} />
              </button>
              
              <div className="w-full max-w-4xl mx-auto space-y-12 pointer-events-auto h-full flex flex-col">
                 <div className="relative shrink-0">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Qu'allez-vous cultiver aujourd'hui ?" 
                      autoFocus
                      className="w-full bg-transparent border-b-2 border-white/10 py-6 text-3xl md:text-5xl text-white outline-none focus:border-accent transition-colors placeholder:text-white/20 font-display"
                    />
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" size={40} />
                 </div>

                 {searchQuery.trim() === "" ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 shrink-0">
                      <div className="space-y-6">
                         <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Suggestions</h3>
                         <div className="space-y-4 flex flex-col items-start">
                            {[
                              { label: "Potager connecté", link: "/products/potager-d-interieur-connecte-urbangrow/" },
                              { label: "Basilic Bio", link: "/products/basilic/" },
                              { label: "Terreau fertile", link: "/collections/terreau/" },
                              { label: "Livres Blancs", link: "/blog/" }
                            ].map(s => (
                              <Link key={s.label} to={s.link} className="block text-white text-xl hover:text-accent transition-colors">
                                 {s.label}
                              </Link>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-6">
                         <h3 className="text-white/40 uppercase tracking-widest text-xs font-bold">Populaire</h3>
                         <div className="flex flex-wrap gap-3">
                            {[
                              { label: "Graines", link: "/collections/graines/" },
                              { label: "Kits", link: "/" },
                              { label: "Blog", link: "/blog/" },
                            ].map(c => (
                              <Link key={c.label} to={c.link} className="px-4 py-2 bg-white/5 rounded-full text-white text-sm hover:bg-accent hover:text-heading transition-colors cursor-pointer block">
                                 {c.label}
                              </Link>
                            ))}
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide space-y-4 pb-12">
                     {searchResults.length > 0 ? (
                       searchResults.map(result => (
                         <Link 
                           key={result.id} 
                           to={result.link}
                           className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                         >
                           {result.image && (
                             <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/10">
                               <img src={result.image} alt={result.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                             </div>
                           )}
                           <div className="space-y-1">
                             <h4 className="text-white text-xl md:text-2xl font-display group-hover:text-accent transition-colors">{result.title}</h4>
                             <p className="text-white/40 text-sm uppercase tracking-widest font-bold">{result.category}</p>
                           </div>
                         </Link>
                       ))
                     ) : (
                       <div className="text-center py-20">
                         <p className="text-white/40 text-2xl font-display">Aucun résultat trouvé pour "{searchQuery}".</p>
                       </div>
                     )}
                   </div>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-bg-alt">
                 <div>
                    <h2 className="text-2xl font-display text-heading">Votre Panier</h2>
                    <p className="text-sm text-body">{cartCount} article{cartCount > 1 ? 's' : ''}</p>
                 </div>
                 <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8">
                 {cartCount === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                       <div className="w-24 h-24 bg-bg-alt rounded-full flex items-center justify-center text-heading/20">
                          <ShoppingCart size={48} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-xl font-bold text-heading">Votre panier est vide</h3>
                          <p className="text-body text-sm max-w-[260px] mx-auto">Découvrez nos kits et commencez votre propre récolte à la maison.</p>
                       </div>
                       <button onClick={() => setIsCartOpen(false)} className="btn-primary w-full max-w-[200px] py-4 text-sm tracking-widest">
                          BOUTIQUE
                       </button>
                    </div>
                 ) : (
                    <div className="space-y-8">
                       {/* DYNAMIC CART ITEMS */}
                       {cartItems.map((item) => (
                         <div key={item.id} className="flex gap-4 p-4 border border-heading/5 rounded-2xl bg-bg-alt/50">
                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-heading/5">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow space-y-1">
                               <h4 className="font-bold text-heading leading-tight">{item.name}</h4>
                               <p className="text-sm text-accent font-bold">{(item.price || 0).toFixed(2)} €</p>
                               <div className="flex items-center justify-between pt-2">
                                  <span className="text-xs text-body">Quantité: {item.quantity}</span>
                                  <button onClick={() => {}} className="text-xs text-red-500 hover:underline">Supprimer</button>
                                </div>
                            </div>
                         </div>
                       ))}
                       
                       <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10">
                          <p className="text-sm text-accent font-medium text-center">🎉 Félicitations ! La livraison est offerte sur votre commande.</p>
                       </div>
                    </div>
                 )}
              </div>

              <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] space-y-6">
                 <div className="space-y-2">
                    <div className="flex items-center justify-between text-body text-sm">
                       <span>Sous-total</span>
                       <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center justify-between text-body text-sm">
                       <span>Livraison</span>
                       <span className="text-accent font-bold">OFFERTE</span>
                    </div>
                    <div className="flex items-center justify-between text-heading font-bold text-2xl pt-2">
                       <span>Total</span>
                       <span>{subtotal.toFixed(2)} €</span>
                    </div>
                 </div>
                 <Link 
                    to="/checkout/" 
                    onClick={() => setIsCartOpen(false)}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center ${cartCount > 0 ? "btn-primary shadow-xl" : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"}`}
                  >
                    Commander • {subtotal.toFixed(2)} €
                  </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-heading text-white pt-24 pb-12">
      <div className="container-boxed">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center md:text-left">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white">
                <Leaf size={24} />
              </div>
              <span className="font-display font-bold text-2xl">UrbanGrow</span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed">
              Rendre l'agriculture urbaine accessible à tous et promouvoir un mode de vie éco-conscient.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-accent">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/80">
              {siteData.nav.slice(0, 5).map(item => (
                <li key={item.title}><Link to={item.path} className="hover:text-accent transition-colors">{item.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-accent">Légal</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><Link to="#" className="hover:text-accent transition-colors">Mentions Légales</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">CGV</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-widest text-accent">Contact</h4>
            <div className="space-y-4 text-sm text-white/80">
              <p>Email: hello@urbangrow.fr</p>
              <p>Ateliers: Lyon & Paris</p>
              <div className="flex gap-4 pt-2">
                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram size={16} /></a>
                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook size={16} /></a>
                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Twitter size={16} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} UrbanGrow. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
             <span>Design by UrbanGrow Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: any, qty: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems: items, addToCart, isCartOpen, setIsCartOpen }}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans selection:bg-accent/30">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:productId/" element={<ProductPage />} />
              <Route path="/collections/graines/" element={<Catalog />} />
              <Route path="/collections/terreau/" element={<Catalog />} />
              <Route path="/a-propos/" element={<About />} />
              <Route path="/blog/" element={<Blog />} />
              <Route path="/blog/:id/" element={<BlogPostDetail />} />
              <Route path="/livres-blancs/:id/" element={<WhitePaperDetail />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="/checkout/" element={<Checkout />} />
              {/* Fallback to home for demo purposes */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  );
}
