import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Zap, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from './supabase';
import * as Constants from './constants';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState(Constants.PRODUCT_TYPES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    city: 'Darbhanga',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = Constants.PRICE_PER_UNIT * quantity;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name) newErrors.customer_name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: formData.customer_name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            address: formData.address,
            country: Constants.DEFAULT_COUNTRY,
            product_name: Constants.PRODUCT_NAME,
            product_variant: serviceType,
            quantity: quantity,
            notes: formData.notes,
            status: 'pending',
            service_type: serviceType.toLowerCase(),
            payment_type: 'cash'
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        city: 'Darbhanga',
        address: '',
        notes: ''
      });
      setQuantity(1);
    } catch (err) {
      console.error('Error submitting order:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/src/shubh-transparent-logo.png" 
                  alt={Constants.STORE_NAME} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
                {Constants.STORE_NAME}
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How Works</button>
              <button onClick={() => scrollToSection('benefits')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Benefits</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">FAQ</button>
              <button 
                onClick={() => scrollToSection('order-form')}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                Order Now
              </button>
            </nav>

            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-base font-medium text-slate-600">How Works</button>
                <button onClick={() => scrollToSection('benefits')} className="block w-full text-left px-4 py-2 text-base font-medium text-slate-600">Benefits</button>
                <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-2 text-base font-medium text-slate-600">FAQ</button>
                <button 
                  onClick={() => scrollToSection('order-form')}
                  className="block w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-center font-semibold"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_100%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                Premium Water Solutions in {Constants.STORE_LOCATION}
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                {Constants.PRODUCT_NAME}
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                {Constants.PRODUCT_DESCRIPTION}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => scrollToSection('order-form')}
                  className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                >
                  Book Service Now
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95"
                >
                  How it Works
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
              <p className="text-slate-600">We provide the best RO services in Darbhanga with a focus on quality and trust.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Constants.BENEFITS.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-[#F9FAFB] border border-slate-100 transition-all"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6">
                    {benefit.icon === 'ShieldCheck' && <ShieldCheck size={28} />}
                    {benefit.icon === 'Settings' && <Settings size={28} />}
                    {benefit.icon === 'Zap' && <Zap size={28} />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How Delivery Works</h2>
              <p className="text-slate-600">Simple, transparent, and risk-free ordering process.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              
              {Constants.HOW_IT_WORKS.map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-xl shadow-blue-100 mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 max-w-xs">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Form Side */}
                <div className="lg:col-span-3 p-8 sm:p-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Your Service</h2>
                  <p className="text-slate-500 mb-10">Fill in your details and pay after service.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Full Name *</label>
                        <input 
                          type="text"
                          placeholder="Your Name"
                          className={cn(
                            "w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
                            errors.customer_name && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          value={formData.customer_name}
                          onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                        />
                        {errors.customer_name && <p className="text-xs text-red-500 ml-1">{errors.customer_name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number *</label>
                        <input 
                          type="tel"
                          placeholder="Mobile Number"
                          className={cn(
                            "w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
                            errors.phone && "border-red-500 ring-2 ring-red-500/10"
                          )}
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 ml-1">Email Address (Optional)</label>
                      <input 
                        type="email"
                        placeholder="email@example.com"
                        className={cn(
                          "w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
                          errors.email && "border-red-500 ring-2 ring-red-500/10"
                        )}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 ml-1">Address *</label>
                      <textarea 
                        placeholder="House No, Street, Landmark..."
                        rows={3}
                        className={cn(
                          "w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none",
                          errors.address && "border-red-500 ring-2 ring-red-500/10"
                        )}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                      {errors.address && <p className="text-xs text-red-500 ml-1">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 ml-1">Additional Notes</label>
                      <input 
                        type="text"
                        placeholder="Any specific instructions..."
                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Processing...
                        </>
                      ) : (
                        'Confirm Order (Delivery)'
                      )}
                    </button>

                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700"
                        >
                          <CheckCircle2 size={20} />
                          <span className="text-sm font-medium">Order placed successfully! We'll call you soon.</span>
                        </motion.div>
                      )}
                      {submitStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700"
                        >
                          <AlertCircle size={20} />
                          <span className="text-sm font-medium">Something went wrong. Please try again.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>

                {/* Summary Side */}
                <div className="lg:col-span-2 bg-slate-50 p-8 sm:p-12 border-l border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">Order Summary</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-slate-700">Select Service Type</label>
                      <div className="grid grid-cols-1 gap-2">
                        {Constants.PRODUCT_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setServiceType(type)}
                            className={cn(
                              "px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left flex justify-between items-center",
                              serviceType === type 
                                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" 
                                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                            )}
                          >
                            {type}
                            {serviceType === type && <CheckCircle2 size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <label className="text-sm font-semibold text-slate-700">Quantity</label>
                      <div className="flex items-center gap-4">
                        <button 
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold text-slate-900 w-8 text-center">{quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 space-y-3">
                      <div className="flex justify-between text-slate-600">
                        <span>Price per unit</span>
                        <span>{Constants.CURRENCY} {Constants.PRICE_PER_UNIT}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Quantity</span>
                        <span>x {quantity}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Delivery Fee</span>
                        <span className="text-emerald-600 font-medium">FREE</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-slate-900 pt-3">
                        <span>Total</span>
                        <span>{Constants.CURRENCY} {totalPrice}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                      <p className="text-xs text-blue-700 leading-relaxed">
                        <strong>Protection:</strong> You only pay when our technician arrives and completes the service. No advance payment required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-[#F9FAFB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Everything you need to know about our services.</p>
            </div>
            <div className="space-y-4">
              {Constants.FAQ.map((item, idx) => (
                <details key={idx} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                    <span className="font-bold text-slate-900">{item.question}</span>
                    <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform" size={20} />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/src/shubh-v.2.png" 
                    alt={Constants.STORE_NAME} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-xl tracking-tight">{Constants.STORE_NAME}</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                Providing high-quality water purification services in Darbhanga. We are committed to your family's health through pure water.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Phone size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How it Works</button></li>
                <li><button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors">Benefits</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => scrollToSection('order-form')} className="hover:text-white transition-colors">Order Now</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 text-blue-500" />
                  <span>{Constants.STORE_LOCATION}, Bihar, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-blue-500" />
                  <span>7033414666 | 7033415666</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-blue-500" />
                  <span>shubhservices.multi@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} {Constants.STORE_NAME}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
