import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (integrate with backend if needed)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1a0a00] to-[#3d1a00] text-white py-16 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#d4a853] mb-3">We'd Love to Hear From You</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-3">Contact Us</h1>
        <p className="text-white/60 max-w-md mx-auto text-sm">Reach out for orders, inquiries, bulk purchases, or just to say hello!</p>
      </section>

      <section className="py-16 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-[#1a0a00] mb-6">Get In Touch</h2>
              </div>

              {[
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: 'Phone / WhatsApp',
                  lines: ['+91-9029411841', '+91-7402528888'],
                  color: 'bg-green-100 text-green-700'
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: 'Email',
                  lines: ['nazaqatsuits1313@gmail.com', 'jaspreetsingh1284@gmail.com'],
                  color: 'bg-blue-100 text-blue-700'
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  title: 'Address',
                  lines: ['Aadyasbyanita', 'Punjab, India'],
                  color: 'bg-red-100 text-red-700'
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: 'Working Hours',
                  lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: 11:00 AM – 5:00 PM'],
                  color: 'bg-amber-100 text-amber-700'
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a0a00] text-sm mb-1">{item.title}</p>
                    {item.lines.map((l, j) => (
                      <p key={j} className="text-gray-600 text-sm">{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p className="font-semibold text-[#1a0a00] text-sm mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/aadyasbyanita" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href="https://wa.me/919029411841" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-serif text-[#1a0a00] mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm mb-4">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-[#1a0a00] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#3d1a00] transition"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Priya Sharma"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="priya@example.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                        <select
                          required
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent bg-white"
                        >
                          <option value="">Select subject...</option>
                          <option value="order">Order Inquiry</option>
                          <option value="product">Product Question</option>
                          <option value="bulk">Bulk / Wholesale Purchase</option>
                          <option value="return">Return / Exchange</option>
                          <option value="custom">Custom Order</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us about your requirement, order details, or any questions..."
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8b6914] focus:border-transparent resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-[#1a0a00] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#3d1a00] transition disabled:opacity-60"
                    >
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#8b6914]" />
              <div>
                <p className="font-semibold text-[#1a0a00]">Find Us</p>
                <p className="text-sm text-gray-500">Aadyasbyanita — Punjab, India</p>
              </div>
            </div>
            <div className="h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.3218234789046!2d75.85071287612268!3d30.900965174574424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9f9b7e9c12f1%3A0x5a5baff77e2a50c5!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aadyasbyanita Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
