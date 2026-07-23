"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, ChevronRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  // Placeholder cart items (matching CartSidebar)
  const cartItems = [
    {
      id: 1,
      name: "Spiritual Healing Crystals",
      price: 1200,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      id: 2,
      name: "Meditation Mat",
      price: 850,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200&h=200",
    },
  ];

  // Placeholder addresses
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "User Name",
      address: "123, Spiritual Path, Temple Road",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      type: "Work",
      name: "User Name",
      address: "456, Corporate Ave, IT Park",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600113",
      phone: "+91 98765 43210",
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-deepgreen)] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-[var(--color-deepgreen)]" />
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="flex-grow space-y-6">
            
            {/* Step 1: Delivery Address */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-[var(--color-deepgreen)]/5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="bg-[var(--color-deepgreen)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Delivery Address
                </h2>
                <button className="text-sm font-bold text-[var(--color-deepgreen)] hover:underline">
                  + Add New
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddress === addr.id 
                        ? "border-[var(--color-deepgreen)] bg-[var(--color-deepgreen)]/5" 
                        : "border-gray-100 hover:border-[var(--color-deepgreen)]/40 bg-gray-50"
                    }`}
                  >
                    {selectedAddress === addr.id && (
                      <div className="absolute top-4 right-4 text-[var(--color-deepgreen)]">
                        <CheckCircle2 className="w-5 h-5 fill-[var(--color-deepgreen)] text-white" />
                      </div>
                    )}
                    <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest rounded mb-3">
                      {addr.type}
                    </span>
                    <p className="font-bold text-gray-900">{addr.name}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {addr.address}, {addr.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addr.state}, {addr.pincode}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-3">
                      {addr.phone}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Step 2: Payment Method */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-[var(--color-deepgreen)]/5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="bg-[var(--color-deepgreen)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[var(--color-deepgreen)] bg-[var(--color-deepgreen)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 text-[var(--color-deepgreen)] focus:ring-[var(--color-deepgreen)]" />
                    <span className="font-bold text-gray-900">UPI (GPay, PhonePe, Paytm)</span>
                  </div>
                </label>
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[var(--color-deepgreen)] bg-[var(--color-deepgreen)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-[var(--color-deepgreen)] focus:ring-[var(--color-deepgreen)]" />
                    <span className="font-bold text-gray-900">Credit / Debit Card</span>
                  </div>
                </label>
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[var(--color-deepgreen)] bg-[var(--color-deepgreen)]/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-[var(--color-deepgreen)] focus:ring-[var(--color-deepgreen)]" />
                    <span className="font-bold text-gray-900">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </section>

          </div>

          {/* Right Column - Order Summary */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-32">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[var(--color-deepgreen)]" />
                  Order Summary
                </h3>
              </div>
              
              {/* Product List */}
              <div className="p-6 border-b border-gray-100 max-h-[40vh] overflow-y-auto">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</span>
                          <span className="text-sm font-bold text-[var(--color-deepgreen)]">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-3 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-bold text-gray-900">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
              </div>

              {/* Total */}
              <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-2xl font-black text-[var(--color-deepgreen)]">₹{total.toLocaleString()}</span>
                </div>
                
                <button 
                  className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Place Order <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
