"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().min(1, { message: "Age is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  whatsapp: z.string().min(10, { message: "Valid WhatsApp number is required" }),
  district: z.string().min(2, { message: "District is required" }),
  state: z.string().min(2, { message: "State is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">Get in Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Contact & Registration</h3>
          <p className="text-lg text-gray-600">
            Reach out to us for any inquiries or register for our upcoming programs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info & Map */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <h4 className="text-2xl font-bold text-foreground mb-6">Foundation Address</h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Sri Kandhaguru Foundation</h5>
                    <p className="text-gray-600 leading-relaxed">
                      211, Kandhaguru Garden, <br />
                      Koothampatti, Sanniyasipatti Post,<br />
                      Bhavani, Erode, 638311
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center shrink-0 text-brand-secondary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Phone Numbers</h5>
                    <p className="text-gray-600">+91 98420 23346</p>
                    <p className="text-gray-600">+91 94423 54431</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Email</h5>
                    <p className="text-gray-600">info@srikandhaguru.org</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-lg h-64 relative border border-gray-100"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1m2!1s0x3ba9bdc12235c03f%3A0x6b490412852ebfa4!2sBhavani%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </div>

          {/* Registration Form */}
          <div className="w-full lg:w-2/3" id="register">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              
              <h4 className="text-2xl font-bold text-foreground mb-8 border-b pb-4">Program Registration Form</h4>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h5 className="text-2xl font-bold mb-2">Registration Successful!</h5>
                  <p>Thank you for registering. We will contact you shortly with program details.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input 
                        {...register("name")}
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                      <input 
                        {...register("age")}
                        type="number" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter your age"
                      />
                      {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input 
                        {...register("phone")}
                        type="tel" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                      <input 
                        {...register("whatsapp")}
                        type="tel" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter WhatsApp number"
                      />
                      {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input 
                        {...register("email")}
                        type="email" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                      <input 
                        {...register("district")}
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.district ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter your district"
                      />
                      {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input 
                        {...register("state")}
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter your state"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <input 
                        {...register("country")}
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors bg-gray-50`}
                        placeholder="Enter your country"
                      />
                      {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-primary text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brand-primary/30 hover:bg-brand-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></span>
                      ) : (
                        <>Submit Registration <Send size={20} /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                      By submitting this form, you agree to our terms and conditions.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919842023346" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
      >
        <MessageCircle size={32} />
      </a>
    </section>
  );
}
