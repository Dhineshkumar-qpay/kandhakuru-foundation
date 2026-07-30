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
} from "lucide-react";
import { getEventBookings, getUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { UserModel } from "../../models/user_model";

export default function ProfilePage() {
  const [eventBookings, setEventBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const { isLoggedIn, isLoading } = useAuth();
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

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <main className="pt-32 pb-20 bg-[#FAFAF9] min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black font-semibold text-gray-900 tracking-tight">
            {user?.username ? `Welcome, ${user.username}` : "My Profile"}
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_50px_-10px_rgba(0,0,0,0.04)] border border-white p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-orange-500 flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Event Bookings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingBookings ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">
                  Loading your bookings...
                </p>
              </div>
            ) : eventBookings.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  You haven't booked any events yet. Check out our upcoming
                  events!
                </p>
                <button
                  onClick={() => router.push("/events")}
                  className="mt-6 px-6 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-md cursor-pointer"
                >
                  Browse Events
                </button>
              </div>
            ) : (
              eventBookings.map((booking: any) => (
                <motion.div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-100 shadow-[0_2px_10px_-3px_rgba(245,158,11,0.1)] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <div className="bg-amber-50/50 px-5 py-4 border-b border-amber-100/50 flex justify-between items-center group-hover:bg-amber-100/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Booking ID
                      </span>
                      <span className="font-extrabold text-gray-900">
                        #{booking.id}
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                        booking.deliverymode?.toLowerCase() === "online"
                          ? "text-pink-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {booking.deliverymode || "OFFLINE"}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    <h5 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {booking.eventname || "Special Event"}
                    </h5>

                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">
                          Participants
                        </span>
                        <span className="font-bold text-gray-900">
                          {booking.participants}
                        </span>
                      </div>

                      {booking.totalamount && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">
                            Total Amount
                          </span>
                          <span className="font-bold text-brand-primary">
                            ₹{Number(booking.totalamount).toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50">
                        <span className="text-gray-500 font-medium">
                          Date Booked
                        </span>
                        <span className="font-semibold text-gray-700">
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-center items-center text-[11px] pt-3 mt-1 border-t border-gray-50/50">
                        {booking.bookingstatus?.toLowerCase() === "pending" ? (
                          <span className="font-bold text-amber-700 bg-amber-100/80 px-3 py-2 rounded-lg text-center w-full shadow-sm">
                            Waiting for approval .It will take 24 hrs
                          </span>
                        ) : booking.bookingstatus?.toLowerCase() ===
                          "cancelled" ? (
                          <span className="font-bold text-red-700 bg-red-100/80 px-3 py-2 rounded-lg text-center w-full shadow-sm">
                            Booking Cancelled. The amount will be refunded
                            within 24 hours.
                          </span>
                        ) : (
                          <span className="font-bold text-emerald-700 bg-emerald-100/80 px-3 py-2 rounded-lg text-center w-full shadow-sm">
                            Booking Confirmed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar for Booking Details */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <div className="bg-amber-50 px-6 py-5 border-b border-amber-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    Booking Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    ID: #{selectedBooking.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Event Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">
                        {selectedBooking.eventname}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span>
                          Event Date:{" "}
                          {selectedBooking.eventdate !== "0000-00-00"
                            ? new Date(
                                selectedBooking.eventdate,
                              ).toLocaleDateString()
                            : "TBD"}
                        </span>
                      </div>
                      {selectedBooking.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                          <MapPin
                            size={14}
                            className="text-gray-400 mt-0.5 shrink-0"
                          />
                          <span>{selectedBooking.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                {/* Participant Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <User size={16} /> Contact Details
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Full Name
                      </span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.fullname}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Email</span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Phone</span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.phone}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        Location
                      </span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.city
                          ? `${selectedBooking.city}, `
                          : ""}
                        {selectedBooking.state}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Receipt size={16} /> Booking Summary
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Participants
                      </span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.participants}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Adults / Children
                      </span>
                      <span className="font-bold text-gray-900">
                        {selectedBooking.adultcount} /{" "}
                        {selectedBooking.childrencount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">
                        Delivery Mode
                      </span>
                      <span className="font-bold text-gray-900 capitalize">
                        {selectedBooking.deliverymode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200/60">
                      <span className="text-gray-500 font-medium">
                        Total Amount
                      </span>
                      <span className="font-black text-brand-primary text-base">
                        ₹{Number(selectedBooking.totalamount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-center items-center text-sm pt-2">
                      {selectedBooking.bookingstatus?.toLowerCase() ===
                      "pending" ? (
                        <span className="font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-xl text-center w-full shadow-sm">
                          Waiting for approval .It will take 24 hrs
                        </span>
                      ) : selectedBooking.bookingstatus?.toLowerCase() ===
                        "cancelled" ? (
                        <span className="font-bold text-red-700 bg-red-100 px-4 py-2 rounded-xl text-center w-full shadow-sm">
                          Booking Cancelled. The amount will be refunded within
                          24 hours.
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl text-center w-full shadow-sm">
                          Booking Confirmed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Health Issues */}
                {selectedBooking.ishealthissue &&
                  selectedBooking.healthissues?.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                        <Activity size={16} /> Health Issues
                      </h4>
                      <div className="bg-red-50 rounded-xl p-4 space-y-3 border border-red-100">
                        {selectedBooking.healthissues.map(
                          (hi: any, idx: number) => (
                            <div key={idx} className="text-sm flex flex-col">
                              <span className="font-bold text-gray-900">
                                {hi.name}
                              </span>
                              <span className="text-red-600 font-medium">
                                {hi.issue}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-white">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </main>
  );
}
