import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, Award, Users, Truck, Star, ArrowRight } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '5000+', label: 'Happy Customers' },
    { value: '200+', label: 'Suit Designs' },
    { value: '10+', label: 'Years Experience' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: 'Crafted with Love', desc: 'Every suit is handpicked with care, ensuring premium quality and exquisite craftsmanship.' },
    { icon: <Award className="w-6 h-6" />, title: 'Trusted Quality', desc: 'We source from the finest fabric houses in Punjab and across India, quality guaranteed.' },
    { icon: <Users className="w-6 h-6" />, title: 'Customer First', desc: 'Our customers are our family. We go above and beyond to ensure your satisfaction.' },
    { icon: <Truck className="w-6 h-6" />, title: 'Pan India Delivery', desc: 'Fast and secure shipping across India. Free delivery on orders above ₹500.' },
  ];

  const categories = [
    { name: 'Punjabi Suits', desc: 'Traditional embroidered phulkari & cotton suits' },
    { name: 'Pakistani Suits', desc: 'Chiffon, georgette & lawn fabric collections' },
    { name: 'Salwar Kameez', desc: 'Everyday wear in various fabrics' },
    { name: 'Designer Dupattas', desc: 'Silk, organza & embroidered dupattas' },
    { name: 'Bridal Wear', desc: 'Opulent bridal & wedding collection' },
    { name: 'Readymade Suits', desc: 'Ready-to-wear for busy women' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a0a00] to-[#5a2800] text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200')] bg-cover bg-center" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#d4a853] mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-5">About Aadyasbyanita</h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            A labor of love, built on a passion for beautiful ethnic fashion and a commitment to bringing the finest ladies suits to your doorstep.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5e9c8] py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-serif font-bold text-[#1a0a00]">{s.value}</p>
                <p className="text-[#5a3e28] text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#8b6914] mb-3">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00] mb-5">Passion for Ethnic Fashion</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aadyasbyanita was born from a deep love for Indian ethnic fashion. Founded in the heart of Punjab, we have been serving customers across India with handpicked, premium quality ladies suits and ethnic wear.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We specialize in Punjabi suits, Pakistani suits, Phulkari embroidery, designer dupattas, and a wide range of salwar kameez collections. Each piece is carefully curated to ensure it meets our high standards of quality and style.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you're looking for everyday wear or a special occasion outfit, we have something for every woman and every occasion.
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 bg-[#1a0a00] text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-[#3d1a00] transition">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=700&fit=crop"
                alt="About Aadyasbyanita"
                className="w-full rounded-2xl shadow-xl object-cover h-96"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#d4a853] text-[#1a0a00] p-5 rounded-xl shadow-lg">
                <p className="font-bold text-2xl font-serif">10+</p>
                <p className="text-sm font-semibold">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#8b6914] mb-3">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00]">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="w-12 h-12 bg-[#f5e9c8] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#8b6914]">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-[#1a0a00] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#8b6914] mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a0a00]">Our Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <Link key={i} to="/products" className="group flex items-center gap-4 p-5 bg-[#faf7f4] rounded-xl hover:bg-[#f5e9c8] transition border border-transparent hover:border-[#e8d5c4]">
                <div className="w-10 h-10 bg-[#1a0a00] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1a0a00] group-hover:text-[#8b6914] transition">{cat.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1a0a00] to-[#3d1a00] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-4">Ready to Shop?</h2>
          <p className="text-white/60 mb-8">Explore our latest collections and find your perfect suit today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="bg-[#d4a853] text-[#1a0a00] px-8 py-3 rounded-full font-bold hover:bg-[#c49040] transition">
              Shop Now
            </Link>
            <Link to="/contact" className="border border-white/40 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
