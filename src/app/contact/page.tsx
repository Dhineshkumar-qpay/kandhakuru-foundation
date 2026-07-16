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
  whatsapp: z
    .string()
    .min(10, { message: "Valid WhatsApp number is required" }),
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
    <div className="pt-10 bg-white">
      {/* Corporate Foundation Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs font-bold mb-6 uppercase tracking-[0.2em] rounded-full shadow-lg"
          >
            Contact & Registration
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md"
          >
            Get in Touch <span className="text-brand-primary"> With Us</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-brand-primary mb-6 rounded-full shadow-sm"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-sm"
          >
            Reach out to our administrative team for inquiries or register
            directly for our upcoming foundation programs.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Left Column: Contact Info & Map */}
            <div className="w-full lg:w-1/3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-brand-primary rounded-full"></div>
                  Foundation Office
                </h4>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                        Location
                      </h5>
                      <p className="text-gray-600 leading-relaxed font-light text-sm">
                        211, Kandhaguru Garden, <br />
                        Koothampatti, Sanniyasipatti Post,
                        <br />
                        Bhavani, Erode, 638311
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                        Phone
                      </h5>
                      <p className="text-gray-600 font-light text-sm mb-1">
                        +91 98420 23346
                      </p>
                      <p className="text-gray-600 font-light text-sm">
                        +91 94423 54431
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                        Email
                      </h5>
                      <p className="text-gray-600 font-light text-sm">
                        info@srikandhaguru.org
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-64 relative overflow-hidden rounded-3xl"
              >
                <iframe
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sri%20Kandhaguru%20Foundation,%20211,%20Kandhaguru%20Garden,%20Koothampatti,%20Sanniyasipatti%20Post,%20Bhavani,%20Erode,%20638311&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0  hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
                ></iframe>
              </motion.div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full lg:w-2/3" id="register">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl"
              >
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight ">
                    Program Registration Application
                  </h4>
                </div>

                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px] rounded-2xl">
                    <div className="w-16 h-16 bg-white border border-green-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <Send className="w-6 h-6 text-green-600" />
                    </div>
                    <h5 className="text-2xl font-bold mb-3 tracking-tight">
                      Application Submitted
                    </h5>
                    <p className="text-gray-600 font-light mb-8 max-w-md">
                      Your registration has been securely logged in our system.
                      A foundation representative will contact you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-full shadow-md"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Full Name{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Age <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("age")}
                          type="number"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.age ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter your age"
                        />
                        {errors.age && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.age.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Phone Number{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          WhatsApp Number{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("whatsapp")}
                          type="tel"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.whatsapp ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter WhatsApp number"
                        />
                        {errors.whatsapp && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.whatsapp.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Email Address{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          District <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("district")}
                          type="text"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.district ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter your district"
                        />
                        {errors.district && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.district.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          State <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("state")}
                          type="text"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter your state"
                        />
                        {errors.state && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Country <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("country")}
                          type="text"
                          className={`w-full px-5 py-3.5 rounded-xl border ${errors.country ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all duration-300 text-gray-900 shadow-sm hover:border-gray-300`}
                          placeholder="Enter your country"
                        />
                        {errors.country && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-8 mt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                      <p className="text-xs text-gray-500 font-light max-w-xs leading-relaxed">
                        By submitting this application, you agree to the
                        foundation's terms and privacy directives.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-brand-primary text-white font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-[0rem] shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-brand-primary transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-gray-900 flex items-center justify-center gap-3 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        ) : (
                          <>
                            Submit Application <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
