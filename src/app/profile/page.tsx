"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Loader2,
  X,
  MapPin,
  Receipt,
  Phone,
  Mail,
  Activity,
  LogOut,
  ChevronRight,
  Users,
  IndianRupee,
  Clock,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { getEventBookings, getUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { UserModel } from "../../models/user_model";
import { BookingData, Healthissue } from "../../models/booking_model";

export default function ProfilePage() {
  const [eventBookings, setEventBookings] = useState<BookingData[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );

  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn === false) {
      router.push("/");
      return;
    }

    if (isLoggedIn) {
      fetchUser();
      fetchEventBookings();
    }
  }, [isLoggedIn, isLoading, router]);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      if (res.success && res.data) {
        setUser(new UserModel(res.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await getEventBookings();
      if (res.success && res.data) {
        setEventBookings(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    router.push("/");
  };

  const getStatusConfig = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "pending")
      return {
        icon: <Clock className="w-3.5 h-3.5" />,
        label: "Waiting for approval. It will take 24 hrs",
        className: "text-amber-700 bg-amber-50 border border-amber-200",
      };
    if (s === "cancelled")
      return {
        icon: <XCircle className="w-3.5 h-3.5" />,
        label:
          "Booking Cancelled. The amount will be refunded within 24 hours.",
        className: "text-red-700 bg-red-50 border border-red-200",
      };
    return {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      label: "Booking Confirmed",
      className: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    };
  };

  if (isLoading || !isLoggedIn) {
    return null;
  }

  const confirmedCount = eventBookings.filter(
    (b) => b.bookingstatus?.toLowerCase() === "confirmed",
  ).length;
  const pendingCount = eventBookings.filter(
    (b) => b.bookingstatus?.toLowerCase() === "pending",
  ).length;

  return (
    <main className="pt-24 pb-20 min-h-screen bg-[#FFFDF7] relative overflow-hidden selection:bg-brand-primary/20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-orange-50 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590050762110-8c2cb5792900?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-100/50 to-[#FFFDF7]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-orange-900/5 border border-orange-100 mt-12 mb-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full text-center md:text-left">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-brand-primary to-amber-400 p-1 shadow-lg shadow-brand-primary/20 flex-shrink-0">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-white overflow-hidden">
                  <User className="w-10 h-10 md:w-12 md:h-12 text-slate-300" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                 <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="flex-1 pt-2 md:pt-4">
              <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">Member Profile</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                {user?.username ? user.username : "My Profile"}
              </h1>
              {user?.email && (
                <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-slate-400" /> {user.email}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-[0px] transition-all duration-300 shadow-sm font-semibold whitespace-nowrap mt-4 md:mt-4 w-full md:w-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {[
            {
              label: "Total Bookings",
              value: eventBookings.length,
              icon: <Receipt className="w-5 h-5" />,
              color: "text-brand-primary",
              bg: "bg-white",
              iconBg: "bg-brand-primary/10",
              border: "border-slate-100",
            },
            {
              label: "Confirmed",
              value: confirmedCount,
              icon: <CheckCircle2 className="w-5 h-5" />,
              color: "text-emerald-600",
              bg: "bg-white",
              iconBg: "bg-emerald-50",
              border: "border-slate-100",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: <Clock className="w-5 h-5" />,
              color: "text-amber-500",
              bg: "bg-white",
              iconBg: "bg-amber-50",
              border: "border-slate-100",
            },
          ].map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-6 border ${stat.border} shadow-sm hover:shadow-md transition-shadow flex items-center gap-5`}
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} ${stat.color} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bookings Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-primary" /> Event History
              </h2>
              <p className="text-sm text-slate-500 mt-1">Manage and view all your past and upcoming event bookings.</p>
            </div>
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase border border-slate-200">
              {eventBookings.length} Records
            </span>
          </div>

          <div className="p-6 md:p-8">
            {loadingBookings ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-brand-primary animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading your itinerary...</p>
              </div>
            ) : eventBookings.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Your Journey Awaits</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">You haven't registered for any events yet. Discover our upcoming sessions and begin your path.</p>
                <button
                  onClick={() => router.push("/events")}
                  className="px-8 py-3.5 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/30"
                >
                  Explore Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventBookings.map((booking: BookingData, index: number) => {
                  const statusConfig = getStatusConfig(booking.bookingstatus || "");
                  const isOnline = booking.deliverymode?.toLowerCase() === "online";
                  
                  return (
                    <div
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="group relative bg-white border border-slate-200 hover:border-brand-primary/40 rounded-2xl p-5 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${isOnline ? "bg-indigo-50 text-indigo-600" : "bg-teal-50 text-teal-600"}`}>
                          {isOnline ? "Online" : "In-Person"}
                        </div>
                        <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${statusConfig.className}`}>
                          {statusConfig.label.includes("Confirmed") ? "Confirmed" : statusConfig.label.includes("Cancel") ? "Cancelled" : "Pending"}
                        </div>
                      </div>

                      <h5 className="font-bold text-slate-900 text-lg leading-tight mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {booking.eventname || "Special Event"}
                      </h5>

                      <div className="space-y-3 mb-6 flex-grow">
                        {isOnline && booking.eventdate && booking.eventdate !== "0000-00-00" && (
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                              <Calendar className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="font-medium">{new Date(booking.eventdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="font-medium">{booking.participants} Participant{booking.participants && booking.participants > 1 ? 's' : ''}</span>
                        </div>
                        {booking.totalamount && (
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                              <IndianRupee className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="font-bold text-slate-900">₹{Number(booking.totalamount).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm mt-auto">
                        <span className="text-slate-400 font-medium text-xs">
                          Booked: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                        <span className="text-brand-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Details <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Right Sidebar for Booking Details ── */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden border-l border-slate-200"
            >
              {/* Sidebar header */}
              <div className="relative px-6 py-8 bg-brand-primary border-b border-slate-200">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors shadow-sm"
                >
                  <X size={16} />
                </button>
                <div className="pr-8">
                  <p className="text-white text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Receipt size={14} /> Booking Details
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {selectedBooking.eventname}
                  </h3>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="p-6 space-y-8">
                  
                  {/* Status Banner */}
                  {(() => {
                    const cfg = getStatusConfig(selectedBooking.bookingstatus ?? "");
                    return (
                      <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-bold border ${cfg.className}`}>
                        <div className="shrink-0 bg-white p-1.5 rounded-lg shadow-sm">{cfg.icon}</div>
                        <span>{cfg.label}</span>
                      </div>
                    );
                  })()}

                  {/* Event Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Event Information</h4>
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar size={18} className="text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-500 font-medium mb-0.5">Date</p>
                          <p className="text-sm font-bold text-slate-900">
                            {selectedBooking.eventdate !== "0000-00-00"
                              ? new Date(selectedBooking.eventdate ?? "").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                              : "TBD"}
                          </p>
                        </div>
                      </div>
                      {selectedBooking.address && (
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-slate-500 font-medium mb-0.5">Location</p>
                            <p className="text-sm font-bold text-slate-900 leading-relaxed">{selectedBooking.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Participant Details</h4>
                    <div className="grid gap-3">
                      {[
                        { label: "Name", value: selectedBooking.fullname },
                        { label: "Email", value: selectedBooking.email },
                        { label: "Phone", value: selectedBooking.phone },
                        { label: "WhatsApp", value: selectedBooking.whatsapp },
                        { label: "Gender & Age", value: selectedBooking.gender && selectedBooking.age ? `${selectedBooking.gender}, ${selectedBooking.age} yrs` : null },
                        { label: "Location", value: selectedBooking.state ? `${selectedBooking.city ? selectedBooking.city + ", " : ""}${selectedBooking.state}` : null },
                      ].map(({ label, value }) =>
                        value ? (
                          <div key={label} className="flex justify-between items-start text-sm">
                            <span className="text-slate-500">{label}</span>
                            <span className="font-semibold text-slate-900 text-right">{value}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Payment & Summary</h4>
                    <div className="grid gap-3">
                      {[
                        { label: "Total Participants", value: selectedBooking.participants },
                        { label: "Adults / Children", value: `${selectedBooking.adultcount} / ${selectedBooking.childrencount}` },
                        { label: "Delivery Mode", value: selectedBooking.deliverymode, capitalize: true },
                        { label: "Booking Date", value: selectedBooking.bookingdate ? new Date(selectedBooking.bookingdate).toLocaleDateString() : "" },
                        { label: "Payment Status", value: selectedBooking.paymentstatus, capitalize: true },
                        { label: "Transaction ID", value: selectedBooking.transactionid },
                      ].map(({ label, value, capitalize }) =>
                        value ? (
                          <div key={label} className="flex justify-between items-start text-sm">
                            <span className="text-slate-500">{label}</span>
                            <span className={`font-semibold text-slate-900 text-right ${capitalize ? "capitalize" : ""}`}>{value}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                    
                    <div className="mt-6 bg-slate-50 p-4 rounded-xl flex justify-between items-center border border-slate-100">
                      <span className="text-slate-600 font-medium">Total Amount</span>
                      <span className="text-2xl font-black text-brand-primary">
                        ₹{Number(selectedBooking.totalamount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Health Issues */}
                  {selectedBooking?.ishealthissue && (selectedBooking.healthissues?.length ?? 0) > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest border-b border-red-100 pb-2 flex items-center gap-2">
                        <Activity size={14} /> Health Declarations
                      </h4>
                      <div className="grid gap-3">
                        {(selectedBooking.healthissues || []).map((hi: Healthissue, idx: number) => (
                          <div key={idx} className="bg-red-50 p-3 rounded-lg border border-red-100">
                            <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">{hi.name}</p>
                            <p className="text-sm text-red-900 font-medium">{hi.issue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </main>
  );
}
