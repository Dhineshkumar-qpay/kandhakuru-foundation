"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addContactUs } from "../../services/api";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10, { message: "Valid mobile number is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
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
    try {
      const res = await addContactUs({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        mobile: data.mobile,
        message: data.message,
      });
      if (res.success) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(res.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-10 bg-white">
      {/* Corporate Foundation Header */}
      <section className="pt-25 pb-0 relative overflow-hidden bg-[#FAFAF9]">
        {/* Luxurious Background Elements */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-200/50 to-orange-200/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-300/30 to-orange-300/30 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div> */}

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full min-h-[150px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-500"></span>
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-700 text-xs font-normal tracking-[0.2em] uppercase border border-amber-200/50 shadow-sm">
              Get In Touch
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-500"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight text-center font-normal"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 font-normal">Us</span>
          </motion.h1>
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
                viewport={{ once: true, margin: "-50px" }}
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
                        srikandhagurufoundation@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl"
              >
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight ">
                    Send Us a Message
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
                      Your message has been securely sent to our team. A
                      foundation representative will contact you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 bg-brand-primary text-white text-sm font-bold tracking-widest uppercase hover:bg-brand-primary transition-colors rounded-[0px] shadow-md"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          First Name{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("firstName")}
                          type="text"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.firstName ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Last Name{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("lastName")}
                          type="text"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.lastName ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.lastName.message}
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
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.email ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                          placeholder="Email Address"
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                          Mobile Number{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("mobile")}
                          type="tel"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.mobile ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                          placeholder="Mobile Number"
                        />
                        {errors.mobile && (
                          <p className="mt-1.5 text-xs text-red-500 font-medium">
                            {errors.mobile.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Message <span className="text-brand-primary">*</span>
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm resize-none ${errors.message ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder="Your Message..."
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-500 font-medium">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-8 mt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                      <p className="text-xs text-gray-500 font-light max-w-xs leading-relaxed">
                        By submitting this application, you agree to the
                        foundation's terms and privacy directives.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-brand-primary text-white font-black text-sm tracking-widest uppercase px-10 py-4 rounded-[0px] shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-brand-primary transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-gray-900 flex items-center justify-center gap-3 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        ) : (
                          <>
                            Send Message <Send size={16} />
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
