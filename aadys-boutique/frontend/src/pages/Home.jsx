import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import apiClient from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import {
  Truck, Shield, Undo2, Headphones,
  ChevronLeft, ChevronRight, ArrowRight, Instagram
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Reusable Hero Slider component
   ───────────────────────────────────────────── */
function HeroSlider({ banners, navigate }) {
  const [current, setCurrent] = useState(0);

  /* Auto-advance every 5 s */
  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  const prev = () => setCurrent(c => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent(c => (c + 1) % banners.length);

  if (!banners.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#f0e8df]" style={{ height: '90vh', minHeight: 480 }}>
      {banners.map((b, i) => (
        <div
          key={b._id || i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 10 : 0 }}
        >
          {/* Desktop two-column */}
          <div className="hidden md:flex w-full h-full">
            {/* Left text */}
            <div
              className="flex flex-col justify-center px-12 lg:px-20 w-1/2"
              style={{ background: 'linear-gradient(135deg,#f0e8df 0%,#e8d5c4 100%)' }}
            >
              <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#8b6914] bg-[#f5e9c8] border border-[#d4a853] rounded-full px-4 py-1 mb-5 w-fit">
                NEW COLLECTION
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-[#1a0a00] leading-tight mb-4">
                {b.title || 'Timeless Ethnic Wear'}
              </h1>
              <p className="text-[#5a3e28] text-base lg:text-lg mb-8 max-w-sm">
                {b.description || 'Crafted with heritage. Worn with grace.'}
              </p>
              <button
                onClick={() => b.cta_link ? navigate(b.cta_link) : navigate('/products')}
                className="group flex items-center gap-3 bg-[#1a0a00] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#3d1a00] transition-all w-fit shadow-lg"
              >
                {b.cta_text || 'Explore Collection'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {/* Right image */}
            <div className="w-1/2 h-full relative overflow-hidden">
              {b.image?.match(/\.(mp4|webm|mov)$/i) ? (
                <video src={b.image} className="w-full h-full object-cover object-center" muted loop autoPlay playsInline />
              ) : (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover object-center"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&fit=crop'; }}
                />
              )}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#e8d5c4] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Mobile full-bleed */}
          <div
            className="md:hidden absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: b.image?.match(/\.(mp4|webm|mov)$/i) ? 'none' : `url(${b.image})` }}
          >
            {b.image?.match(/\.(mp4|webm|mov)$/i) && (
              <video src={b.image} className="absolute inset-0 w-full h-full object-cover" muted loop autoPlay playsInline />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f0e8df]/95 via-[#f0e8df]/75 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full px-8">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#8b6914] bg-[#f5e9c8] border border-[#d4a853] rounded-full px-3 py-1 mb-4 w-fit">
                NEW COLLECTION
              </span>
              <h1 className="text-3xl font-serif text-[#1a0a00] leading-tight mb-3">{b.title || 'Ethnic Wear'}</h1>
              <p className="text-[#5a3e28] text-sm mb-6">{b.description || 'Crafted with heritage.'}</p>
              <button
                onClick={() => b.cta_link ? navigate(b.cta_link) : navigate('/products')}
                className="flex items-center gap-2 bg-[#1a0a00] text-white px-6 py-3 rounded-full font-semibold text-sm w-fit"
              >
                {b.cta_text || 'Shop Now'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition">
            <ChevronLeft className="w-5 h-5 text-[#1a0a00]" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition">
            <ChevronRight className="w-5 h-5 text-[#1a0a00]" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#8b6914]' : 'w-2 h-2 bg-[#8b6914]/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reusable Wide Banner (promo / sale / seasonal)
   ───────────────────────────────────────────── */
function WideBanner({ banner, label, navigate }) {
  if (!banner) return null;
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative rounded-2xl overflow-hidden cursor-pointer group ${banner.bannerType === 'seasonal' ? 'w-full' : 'h-52 md:h-64'}`}
          onClick={() => banner.link ? window.open(banner.link, '_blank') : navigate('/products')}
        >
          {banner.image?.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={banner.image} className={`w-full group-hover:scale-105 transition-transform duration-700 ${banner.bannerType === 'seasonal' ? 'h-auto block' : 'h-full object-cover'}`} muted loop autoPlay playsInline />
          ) : (
            <img
              src={banner.image}
              alt={banner.title}
              className={`w-full group-hover:scale-105 transition-transform duration-700 ${banner.bannerType === 'seasonal' ? 'h-auto block' : 'h-full object-cover'}`}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent flex flex-col justify-center px-8 md:px-16 pointer-events-none">
            {label && (
              <p className="text-[#d4a853] text-[11px] font-bold tracking-widest uppercase mb-2">{label}</p>
            )}
            <h3 className="text-white text-2xl md:text-4xl font-serif mb-2">
              {banner.title}
            </h3>
            {banner.description && (
              <p className="text-white/75 text-sm mb-4">{banner.description}</p>
            )}
            <button className="bg-[#d4a853] text-[#1a0a00] px-6 py-2 rounded-full text-sm font-bold w-fit hover:bg-[#c49040] transition">
              {banner.cta_text || 'Shop Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Main Home page
   ───────────────────────────────────────────── */
export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /* Separate banner buckets */
  const [heroBanners, setHeroBanners] = useState([]);
  const [promoBanner, setPromoBanner] = useState(null);
  const [saleBanner, setSaleBanner] = useState(null);
  const [seasonalBanner, setSeasonalBanner] = useState(null);
  const [colBanners, setColBanners] = useState([]);
  const [instaBanners, setInstaBanners] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes, bannerRes] = await Promise.all([
        apiClient.get('/products/trending'),
        apiClient.get('/categories'),
        apiClient.get('/banners'),
      ]);

      setTrendingProducts(prodRes.data.products || []);
      setCategories(catRes.data.categories || []);

      const all = bannerRes.data.banners || [];

      /* ── Hero banners ── */
      const heroes = all.filter(b => b.bannerType === 'hero');
      // Fallback: if admin hasn't set any hero, show ALL active banners in slider
      setHeroBanners(heroes.length ? heroes : all.filter(b => b.isActive).slice(0, 5));

      /* ── Other types ── */
      setPromoBanner(all.find(b => b.isActive && b.bannerType === 'promotion') || null);
      setSaleBanner(all.find(b => b.isActive && b.bannerType === 'sale') || null);
      setSeasonalBanner(all.find(b => b.isActive && b.bannerType === 'seasonal') || null);
      setColBanners(all.filter(b => b.isActive && b.bannerType === 'collection'));
      setInstaBanners(all.filter(b => b.isActive && b.bannerType === 'instagram'));

    } catch (err) {
      console.error('Error fetching home data:', err);
    }
  };

  const categoryIcons = ['👗', '👘', '🧣', '👙', '🪡', '🎀', '✂️', '💎'];

  /* ────── FALLBACK HERO (when no banners uploaded) ────── */
  const FallbackHero = (
    <div className="relative w-full overflow-hidden bg-[#f0e8df] flex" style={{ height: '90vh', minHeight: 480 }}>
      <div
        className="flex flex-col justify-center px-12 md:px-20 w-full md:w-1/2"
        style={{ background: 'linear-gradient(135deg,#f0e8df 0%,#e8d5c4 100%)' }}
      >
        <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#8b6914] bg-[#f5e9c8] border border-[#d4a853] rounded-full px-4 py-1 mb-5 w-fit">
          NEW COLLECTION
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-[#1a0a00] leading-tight mb-4">Aadyasbyanita</h1>
        <p className="text-[#5a3e28] text-base md:text-lg mb-8 max-w-sm">
          Premium Ladies Suits &amp; Ethnic Wear — crafted with love, worn with pride.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="group flex items-center gap-3 bg-[#1a0a00] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#3d1a00] transition-all w-fit shadow-lg"
        >
          Shop Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="hidden md:block w-1/2 h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&fit=crop"
          alt="Ladies Suits"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  /* ────── DEFAULT PROMO (if none uploaded) ────── */
  const DefaultPromo = (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden h-52 md:h-64 cursor-pointer group"
          onClick={() => navigate('/products')}
          style={{ background: 'linear-gradient(135deg,#1a0a00 0%,#3d1a00 50%,#8b3a00 100%)' }}
        >
          <div className="absolute inset-0 opacity-20 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200')" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
            <p className="text-[#d4a853] text-[11px] font-bold tracking-widest uppercase mb-2">SPECIAL OFFER</p>
            <h3 className="text-white text-2xl md:text-4xl font-serif mb-2">Flat 30% Off on New Arrivals</h3>
            <p className="text-white/70 text-sm mb-4">Use code <strong>AADYAS30</strong> at checkout</p>
            <button className="bg-[#d4a853] text-[#1a0a00] px-6 py-2 rounded-full text-sm font-bold w-fit hover:bg-[#c49040] transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Navbar />

      {/* ══════════ 1. HERO SLIDER ══════════ */}
      {heroBanners.length > 0
        ? <HeroSlider banners={heroBanners} navigate={navigate} />
        : FallbackHero
      }

      {/* ══════════ 2. FEATURES BAR ══════════ */}
      <section className="bg-[#1a0a00] text-white py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center text-sm">
            {[
              { icon: <Truck className="w-5 h-5" />, title: 'Free Shipping', sub: 'On orders above ₹500' },
              { icon: <Shield className="w-5 h-5" />, title: 'Secure Payment', sub: '100% Safe Transactions' },
              { icon: <Undo2 className="w-5 h-5" />, title: 'Easy Returns', sub: '7 Days Return Policy' },
              { icon: <Headphones className="w-5 h-5" />, title: '24/7 Support', sub: '+91-9029411841' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="text-[#d4a853]">{f.icon}</div>
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-white/55 text-xs">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. SEASONAL BANNER (above categories) ══════════ */}
      {seasonalBanner && (
        <WideBanner banner={seasonalBanner} label="SEASONAL SPECIAL" navigate={navigate} />
      )}

      {/* ══════════ 4. CATEGORIES – CIRCULAR ══════════ */}
      {categories.length > 0 && (
        <section className="py-14 bg-[#faf7f4]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#8b6914] mb-2">Browse By</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00]">Shop Categories</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {categories.slice(0, 8).map((cat, idx) => (
                <Link key={cat._id} to={`/products?category=${cat._id}`}
                  className="flex flex-col items-center gap-3 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#e8d5c4] group-hover:border-[#8b6914] transition-all duration-300 shadow-md group-hover:shadow-xl">
                    {cat.image
                      ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      : <div className="w-full h-full bg-gradient-to-br from-[#f5e9c8] to-[#e8d5c4] flex items-center justify-center text-3xl">
                        {categoryIcons[idx % categoryIcons.length]}
                      </div>
                    }
                  </div>
                  <span className="text-sm font-semibold text-[#1a0a00] group-hover:text-[#8b6914] transition-colors text-center">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ 5. TRENDING NOW ══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#8b6914] mb-2">What's Hot</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00]">Trending Now</h2>
            </div>
            <Link to="/products?tag=trending"
              className="flex items-center gap-1 text-sm font-semibold text-[#8b6914] hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {trendingProducts.length === 0
            ? <div className="text-center py-12 text-gray-400">
              <p className="text-5xl mb-3">👗</p>
              <p>No trending products yet. Add some from the admin panel!</p>
            </div>
            : <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trendingProducts.slice(0, 8).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          }
        </div>
      </section>

      {/* ══════════ 6. PROMO BANNER ══════════ */}
      {promoBanner
        ? <WideBanner banner={promoBanner} label="SPECIAL OFFER" navigate={navigate} />
        : DefaultPromo
      }

      {/* ══════════ 7. SALE BANNER ══════════ */}
      {saleBanner && (
        <WideBanner banner={saleBanner} label="🔥 SALE" navigate={navigate} />
      )}

      {/* ══════════ 8. OUR COLLECTIONS GRID ══════════ */}
      <section className="py-16 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-start mb-0">
            <div className="md:w-1/4 md:sticky md:top-24">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#8b6914] mb-2">BROWSE BY</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00] mb-4">Our Collections</h2>
              <p className="text-[#5a3e28] text-sm leading-relaxed">
                Finest ladies ethnic wear — embroidered suits, elegant dupattas, bridal wear &amp; more.
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#8b6914] hover:gap-3 transition-all">
                View All Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="md:w-3/4">
              {colBanners.length > 0
                ? <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {colBanners.slice(0, 6).map(b => (
                    <Link key={b._id} to={b.cta_link || b.link || '/products'}
                      className="group relative rounded-xl overflow-hidden h-72 md:h-[22rem] bg-gray-100 block">
                      {b.image?.match(/\.(mp4|webm|mov)$/i) ? (
                        <video src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop autoPlay playsInline />
                      ) : (
                        <img
                          src={b.image}
                          alt={b.title || 'Collection'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex flex-col justify-end p-4">
                        {b.title && <p className="text-white text-sm font-semibold line-clamp-1">{b.title}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
                : trendingProducts.length > 0
                  ? <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trendingProducts.slice(0, 6).map(p => (
                      <Link key={p._id} to={`/product/${p._id}`}
                        className="group relative rounded-xl overflow-hidden h-72 md:h-[22rem] bg-gray-100 block">
                        <img
                          src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400'}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex flex-col justify-end p-4">
                          <p className="text-white text-sm font-semibold line-clamp-1">{p.name}</p>
                          <p className="text-[#d4a853] text-sm font-bold">₹{p.price?.toLocaleString('en-IN')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  : <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Punjabi Suits', 'Pakistani Suits', 'Salwar Kameez', 'Phulkari Suits', 'Designer Dupattas', 'Bridal Wear'].map((n, i) => (
                      <Link key={i} to="/products"
                        className="group relative rounded-xl overflow-hidden h-72 md:h-[22rem] bg-gradient-to-br from-[#f5e9c8] to-[#e8d5c4] flex items-center justify-center hover:shadow-lg transition">
                        <span className="text-[#1a0a00] font-semibold text-center px-4">{n}</span>
                      </Link>
                    ))}
                  </div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 9. WHY CHOOSE US ══════════ */}
      <section className="py-16 bg-[#1a0a00] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[#d4a853] mb-2">WHY US</p>
            <h2 className="text-3xl md:text-4xl font-serif">Exclusive Range Of Ladies Suits</h2>
            <p className="text-white/55 mt-3 max-w-lg mx-auto text-sm">
              Best quality ladies designer suits worldwide — join our WhatsApp group for weekly updates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '👗', label: 'Punjabi Suits', sub: 'Traditional Embroidered' },
              { icon: '🥻', label: 'Pakistani Suits', sub: 'Chiffon & Georgette' },
              { icon: '🪡', label: 'Phulkari Work', sub: 'Handcrafted Heritage' },
              { icon: '🎀', label: 'Designer Dupattas', sub: 'Silk & Organza' },
              { icon: '🧵', label: 'Salwar Kameez', sub: 'Cotton & Lawn' },
              { icon: '💎', label: 'Bridal Wear', sub: 'Luxurious & Elegant' },
              { icon: '⚡', label: 'Readymade Suits', sub: 'Ready to Wear' },
              { icon: '🌸', label: 'Pashmina Shawls', sub: 'Winter Collection' },
            ].map((item, i) => (
              <Link key={i} to="/products"
                className="group text-center p-5 rounded-xl border border-white/10 hover:border-[#d4a853]/50 hover:bg-white/5 transition-all duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-semibold text-sm mb-1 group-hover:text-[#d4a853] transition-colors">{item.label}</p>
                <p className="text-white/45 text-xs">{item.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10. INSTAGRAM FEED ══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Instagram className="w-5 h-5 text-[#8b6914]" />
              <h2 className="text-2xl md:text-3xl font-serif text-[#1a0a00]">@aadyasbyanita</h2>
            </div>
            <p className="text-gray-400 text-sm">Stay updated with latest arrivals on Instagram</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {instaBanners.length > 0
              ? instaBanners.slice(0, 6).map((b, i) => (
                <a key={b._id || i} href={b.link || "https://instagram.com/aadyasbyanita"} target="_blank" rel="noopener noreferrer"
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 block">
                  {b.image?.match(/\.(mp4|webm|mov)$/i) ? (
                    <video src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop autoPlay playsInline />
                  ) : (
                    <img src={b.image} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))
              : (trendingProducts.length > 0 ? trendingProducts.slice(0, 6) : Array(6).fill(null)).map((p, i) => (
                <a key={i} href="https://instagram.com/aadyasbyanita" target="_blank" rel="noopener noreferrer"
                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 block">
                  {p
                    ? <img src={p.images?.[0]?.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    : <div className="w-full h-full bg-gradient-to-br from-[#f5e9c8] to-[#e8d5c4]" />
                  }
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))
            }
          </div>
          <div className="text-center mt-6">
            <a href="https://instagram.com/aadyasbyanita" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#8b6914] text-[#8b6914] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#8b6914] hover:text-white transition">
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ 11. NEWSLETTER ══════════ */}
      <section className="py-12 bg-gradient-to-r from-[#1a0a00] to-[#3d1a00] text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-2">Join Our Inner Circle</h2>
          <p className="text-white/55 text-sm mb-6">Get exclusive offers, new arrivals &amp; style tips delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a853]" />
            <button className="bg-[#d4a853] text-[#1a0a00] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#c49040] transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
