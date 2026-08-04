"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { requestLogin, verifyOtpApi, registerUser } from "../services/api";
import { useLanguage } from "../i18n/LanguageContext";
import {
  X,
  User,
  Mail,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Phone,
  AlertCircle,
} from "lucide-react";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const { t } = useLanguage();
  // Login form state
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openLogin = () => {
    setStep("details");
    setAuthMode("login");
    setUsername("");
    setEmail("");
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    setErrorMessage(null);
    setIsSidebarOpen(true);
  };
  const closeLogin = () => setIsSidebarOpen(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (authMode === "login") {
      if (email) {
        setIsSubmitting(true);
        try {
          const response = await requestLogin({ email });
          if (response.success) {
            setStep("otp");
          } else {
            setErrorMessage(response.message || response.data?.message || "Login failed");
          }
        } catch (error: any) {
          console.error("Login request error", error);
          const msg = error.response?.data?.data?.message || error.response?.data?.message || error.message || "An error occurred. Please try again.";
          setErrorMessage(msg);
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      if (username && email && mobile) {
        setIsSubmitting(true);
        try {
          const response = await registerUser({ username, email, mobile });
          if (response.success) {
            setStep("otp");
          } else {
            setErrorMessage(response.message || response.data?.message || "Registration failed");
          }
        } catch (error: any) {
          console.error("Registration error", error);
          const msg = error.response?.data?.data?.message || error.response?.data?.message || error.message || "An error occurred. Please try again.";
          setErrorMessage(msg);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setIsSubmitting(true);
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
          setErrorMessage(response.message || response.data?.message || "Invalid OTP");
        }
      } catch (error: any) {
        console.error("Verify OTP error", error);
        const msg = error.response?.data?.data?.message || error.response?.data?.message || error.message || "An error occurred verifying OTP.";
        setErrorMessage(msg);
      } finally {
        setIsSubmitting(false);
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
      value={{ isLoggedIn, isLoading, openLogin, closeLogin, login, logout }}
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
                    {step === "details" && authMode === "login" && t("auth.welcome_back")}
                    {step === "details" && authMode === "register" && t("auth.create_account")}
                    {step === "otp" && t("auth.verify_otp")}
                    {step === "success" && t("auth.success")}
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
                  <div className="space-y-6">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setAuthMode("login")}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                          authMode === "login"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {t("auth.login_tab")}
                      </button>
                      <button
                        onClick={() => setAuthMode("register")}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                          authMode === "register"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {t("auth.register_tab")}
                      </button>
                    </div>

                    <form onSubmit={handleRequestOtp} className="space-y-6">
                      <p className="text-sm text-gray-500 mb-6">
                        {authMode === "login" ? t("auth.login_desc") : t("auth.register_desc")}
                      </p>

                      {errorMessage && (
                        <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-md flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {authMode === "register" && (
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900">
                            {t("auth.username")}
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
                              placeholder={t("auth.enter_username")}
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">
                          {t("auth.email_address")}
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
                            placeholder={t("auth.enter_email")}
                          />
                        </div>
                      </div>

                      {authMode === "register" && (
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-900">
                            {t("auth.mobile")}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              required
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-gray-900"
                              placeholder={t("auth.enter_mobile")}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3.5 rounded-md hover:bg-brand-primary/90 transition-all shadow-md hover:shadow-lg mt-8 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            {authMode === "login" ? t("auth.sending_otp") : t("auth.registering")}
                          </>
                        ) : (
                          <>
                            {authMode === "login" ? t("auth.request_otp") : t("auth.register_btn")} <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="h-8 w-8 text-brand-primary" />
                      </div>
                      <p className="text-sm text-gray-500">
                        {t("auth.sent_otp_to")} <br />
                        <span className="font-bold text-gray-900">{email}</span>
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-md flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

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
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3.5 rounded-md hover:bg-brand-primary/90 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            {t("auth.verifying")}
                          </>
                        ) : (
                          t("auth.verify_login")
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep("details")}
                        className="w-full text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {t("auth.back_to_details")}
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
                      {t("auth.login_successful")}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t("auth.welcome")}{username ? `, ${username}` : ""}!
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
