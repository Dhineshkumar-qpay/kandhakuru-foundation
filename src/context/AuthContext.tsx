"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { requestLogin, verifyOtpApi } from "../services/api";
import {
  X,
  User,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface AuthContextType {
  isLoggedIn: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login form state
  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const openLogin = () => {
    setStep("details");
    setUsername("");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setIsSidebarOpen(true);
  };
  const closeLogin = () => setIsSidebarOpen(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email) {
      try {
        const response = await requestLogin({ username, email });
        if (response.success) {
          setStep("otp");
        } else {
          alert(response.message || "Login failed");
        }
      } catch (error) {
        console.error("Login request error", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      try {
        const response = await verifyOtpApi({ email, otp: otpValue });
        if (response.success && response.data) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userId", response.data.userid.toString());
          
          setStep("success");
          setTimeout(() => {
            setIsLoggedIn(true);
            closeLogin();
          }, 1500);
        } else {
          alert(response.message || "Invalid OTP");
        }
      } catch (error) {
        console.error("Verify OTP error", error);
        alert("An error occurred verifying OTP.");
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, openLogin, closeLogin, login, logout }}
    >
      {children}

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLogin}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                    <img
                      src="/appLogo.png"
                      alt="Sri Kandhaguru Foundation"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    {step === "details" && "Welcome Back"}
                    {step === "otp" && "Verify OTP"}
                    {step === "success" && "Success"}
                  </h2>
                </div>
                <button
                  onClick={closeLogin}
                  className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {step === "details" && (
                  <form onSubmit={handleRequestOtp} className="space-y-6">
                    <p className="text-sm text-gray-500 mb-6">
                      Please enter your details to login or create an account.
                    </p>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-gray-900"
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-gray-900"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3.5 rounded-md hover:bg-brand-primary/90 transition-all shadow-md hover:shadow-lg mt-8"
                    >
                      Request OTP <ArrowRight size={18} />
                    </button>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="h-8 w-8 text-brand-primary" />
                      </div>
                      <p className="text-sm text-gray-500">
                        We have sent a 6-digit OTP to <br />
                        <span className="font-bold text-gray-900">{email}</span>
                      </p>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-gray-900"
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3.5 rounded-md hover:bg-brand-primary/90 transition-all shadow-md hover:shadow-lg"
                      >
                        Verify & Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep("details")}
                        className="w-full text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        Back to details
                      </button>
                    </div>
                  </form>
                )}

                {step === "success" && (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-brand-secondary" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-gray-900">
                      Login Successful
                    </h3>
                    <p className="text-sm text-gray-500">
                      Welcome, {username}!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
