"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MapPin, Heart, Package, LogOut, ChevronRight, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "address" | "wishlist" | "orders">("profile");
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "address", label: "Saved Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "orders", label: "Order History", icon: Package },
  ] as const;

  return (
    <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your personal information and orders.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-[var(--color-deepgreen)]/5 border-b border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-deepgreen)]/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-[var(--color-deepgreen)]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Hello, User</h3>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
              </div>
              
              <nav className="p-4 flex flex-col gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between w-full p-4 rounded-xl transition-all font-medium ${
                        isActive
                          ? "bg-[var(--color-deepgreen)] text-white shadow-md shadow-[var(--color-deepgreen)]/20"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-deepgreen)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-white/80" : "text-gray-400"}`} />
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-xl text-red-500 font-bold bg-red-50 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                      <button className="flex items-center gap-2 text-[var(--color-deepgreen)] font-semibold bg-[var(--color-deepgreen)]/10 px-4 py-2 rounded-full hover:bg-[var(--color-deepgreen)] hover:text-white transition-colors">
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                        <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">User Name</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                        <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">user@example.com</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                        <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">+91 98765 43210</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Gender</label>
                        <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">Not Specified</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                      <button className="text-[var(--color-deepgreen)] font-semibold bg-[var(--color-deepgreen)]/10 px-4 py-2 rounded-full hover:bg-[var(--color-deepgreen)] hover:text-white transition-colors">
                        + Add New
                      </button>
                    </div>
                    <div className="border border-[var(--color-deepgreen)]/30 bg-[var(--color-deepgreen)]/5 rounded-xl p-6 relative">
                      <span className="absolute top-4 right-4 bg-[var(--color-deepgreen)] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">Default</span>
                      <h3 className="font-bold text-gray-900 mb-2">Home</h3>
                      <p className="text-gray-600 leading-relaxed max-w-sm">
                        123, Spiritual Path, Temple Road,
                        <br />Chennai, Tamil Nadu, 600001
                        <br />India
                      </p>
                      <div className="flex gap-4 mt-6">
                        <button className="text-[var(--color-deepgreen)] font-bold hover:underline">Edit</button>
                        <button className="text-red-500 font-bold hover:underline">Delete</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "wishlist" && (
                  <motion.div
                    key="wishlist"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h2>
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <Heart className="w-16 h-16 text-gray-200 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-500 mb-6">Explore our shop and save items you love.</p>
                      <button className="bg-[var(--color-deepgreen)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-md">
                        Explore Shop
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "orders" && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>
                    <div className="flex flex-col gap-4">
                      <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
                          <div>
                            <p className="text-sm font-bold text-gray-500">Order #ORD-2026-8921</p>
                            <p className="text-sm text-gray-400 mt-1">Placed on July 15, 2026</p>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-green-700 font-bold text-sm rounded-full w-fit">
                            Delivered
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0"></div>
                          <div>
                            <p className="font-bold text-gray-900">Spiritual Healing Crystals</p>
                            <p className="text-[var(--color-deepgreen)] font-bold mt-1">₹1,200</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
