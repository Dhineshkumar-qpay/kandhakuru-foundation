"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getAddresses,
  addAddress,
  getCart,
  placeOrder,
  uploadPaymentScreenshot,
  updatePaymentScreenshot,
  IMAGEBASEURL,
} from "../../services/api";
import { AddressModel, CartModel } from "../../models/OrderModel";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [cart, setCart] = useState<CartModel | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);

  const [isPaymentSidebarOpen, setIsPaymentSidebarOpen] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    place: "home",
    contactname: "",
    contactnumber: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const res = await getCart();
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCart(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await getAddresses();
      if (res.success && res.data) {
        setAddresses(res.data);
        if (res.data.length > 0) {
          setSelectedAddress(res.data[0].id);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...addressForm,
        pincode: Number(addressForm.pincode),
      };
      await addAddress(payload);
      setIsAddressFormOpen(false);
      setAddressForm({
        place: "home",
        contactname: "",
        contactnumber: "",
        address: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        country: "India",
      });
      fetchAddresses();
    } catch (error) {
      console.error(error);
      alert("Failed to save address");
    }
  };

  const handlePlaceOrderClick = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    const subtotal = cart?.subtotal || 0;
    const currentShipping = subtotal >= 3000 ? 0 : 70;
    try {
      setPlacingOrder(true);
      const response = await placeOrder({
        addressid: selectedAddress as number,
        shippingcost: currentShipping,
      });
      if (response.success && response.data?.orderid) {
        setOrderId(response.data.orderid);
        setIsPaymentSidebarOpen(true);
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!paymentScreenshot) {
      alert("Please upload your payment screenshot");
      return;
    }
    if (!orderId) {
      alert("Order ID missing. Please place order again.");
      return;
    }
    try {
      setPlacingOrder(true);
      const uploadRes = await uploadPaymentScreenshot(paymentScreenshot);

      if (!uploadRes.success || !uploadRes.data) {
        throw new Error("Failed to upload screenshot");
      }

      await updatePaymentScreenshot({
        id: orderId,
        screenshot: uploadRes.data,
      });

      window.dispatchEvent(new Event("cartUpdated"));

      setIsPaymentSidebarOpen(false);
      setOrderId(null);
      setShowSuccessAnimation(true);

      setTimeout(() => {
        router.push("/my-account");
      }, 2500);
    } catch (error) {
      console.error(error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const cartItems = cart?.cart || [];
  const subtotal = cart?.subtotal || 0;
  const shipping: number = subtotal >= 3000 ? 0 : 70;
  const total = subtotal + shipping;

  if (loadingCart) {
    return (
      <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[var(--color-deepgreen)] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading checkout details...</p>
      </main>
    );
  }

  if (!loadingCart && cartItems.length === 0) {
    return (
      <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items yet.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-xl hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-md cursor-pointer"
          >
            Explore Shop
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-deepgreen)] transition-colors mb-4 font-medium cursor-pointer"
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
                  <span className="bg-[var(--color-deepgreen)] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Delivery Address
                </h2>
                <div className="flex gap-4 items-center">
                  {!isAddressFormOpen && (
                    <button
                      onClick={() => setIsAddressFormOpen(true)}
                      className="text-sm font-bold text-[var(--color-deepgreen)] hover:underline cursor-pointer"
                    >
                      + Add New
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {isAddressFormOpen ? (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">
                      Add New Address
                    </h3>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Place Type
                        </label>
                        <select
                          value={addressForm.place}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              place: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                        >
                          <option value="home">Home</option>
                          <option value="office">Office</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Contact Name
                          </label>
                          <input
                            required
                            type="text"
                            value={addressForm.contactname}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                contactname: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Contact Number
                          </label>
                          <input
                            required
                            type="tel"
                            value={addressForm.contactnumber}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                contactnumber: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Address / Street
                        </label>
                        <textarea
                          required
                          value={addressForm.address}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              address: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          rows={2}
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            required
                            type="text"
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                city: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            District
                          </label>
                          <input
                            required
                            type="text"
                            value={addressForm.district}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                district: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            required
                            type="text"
                            value={addressForm.state}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                state: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Pincode
                          </label>
                          <input
                            required
                            type="number"
                            value={addressForm.pincode}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                pincode: e.target.value,
                              })
                            }
                            className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[var(--color-deepgreen)]/20 focus:border-[var(--color-deepgreen)] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setIsAddressFormOpen(false)}
                          className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-[0px] hover:bg-gray-200 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-4 bg-[var(--color-deepgreen)] text-white font-bold rounded-[0px] hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-md cursor-pointer"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                ) : loadingAddresses ? (
                  <p className="text-gray-500">Loading your addresses...</p>
                ) : addresses.length === 0 ? (
                  <p className="text-gray-500">
                    No saved addresses found. Please add one.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id
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
                          {addr.place}
                        </span>
                        <p className="font-bold text-gray-900 capitalize">
                          {addr.place} Address
                        </p>
                        <p className="text-sm font-bold text-gray-800 mt-2">
                          {addr.contactname}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {addr.contactnumber}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {addr.address}, {addr.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.state}, {addr.pincode}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-3">
                          {addr.country}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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
                  {loadingCart ? (
                    <p className="text-gray-500 text-sm">
                      Loading your cart...
                    </p>
                  ) : cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={`${IMAGEBASEURL}${item.product?.image}`}
                            alt={item.product?.productname || ""}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2">
                            {item.product?.productname}
                          </h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500 font-medium">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-bold text-[var(--color-deepgreen)]">
                              ₹{item.price?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-3 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-bold text-[var(--color-deepgreen)]">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>

                <div className="pt-2">
                  {shipping === 0 ? (
                    <p className="text-xs text-[var(--color-deepgreen)] font-bold bg-[var(--color-deepgreen)]/10 p-2.5 rounded-lg text-center flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      You've unlocked Free Shipping!
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 font-medium bg-gray-50 p-2.5 rounded-lg text-center border border-gray-100">
                      Add <span className="font-bold text-gray-800">₹{(3000 - subtotal).toLocaleString()}</span> more to get <span className="text-[var(--color-deepgreen)] font-bold">Free Shipping</span>!
                    </p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-2xl font-black text-[var(--color-deepgreen)]">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrderClick}
                  disabled={placingOrder}
                  className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-[0px] flex justify-center items-center gap-2 hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {placingOrder ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Place Order <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Payment Right Sidebar */}
      <AnimatePresence>
        {isPaymentSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-gray-900">
                  Make Payment
                </h2>
                <button
                  onClick={() => setIsPaymentSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col gap-8">
                <div className="text-center space-y-4">
                  <p className="text-gray-600 font-medium">
                    Scan the QR Code below to pay
                  </p>
                  <div className="bg-gray-50 rounded-xl border-2 border-gray-100 inline-block">
                    <img
                      src="/payment-qr.jpeg"
                      alt="Payment QR"
                      className="w-48 h-full object-contain rounded-xl shadow-sm"
                    />
                  </div>
                  <p className="text-2xl font-black text-[var(--color-deepgreen)] ">
                    ₹{total.toLocaleString()}
                  </p>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-500" /> Upload
                    Screenshot
                  </h3>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl bg-white hover:bg-blue-50/50 transition-colors cursor-pointer relative overflow-hidden group">
                    {paymentScreenshot ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <img
                          src={URL.createObjectURL(paymentScreenshot)}
                          alt="Screenshot"
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                          Change
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-blue-500">
                        <Upload className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm font-medium">
                          Click to upload screenshot
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPaymentScreenshot(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 sticky bottom-0 bg-white">
                <button
                  onClick={handlePaymentSubmit}
                  disabled={placingOrder}
                  className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-[0px] hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {placingOrder ? "Placing Order..." : "Submit Order"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Blur */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.6,
              }}
              className="relative z-10 flex flex-col items-center bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(34,197,94,0.2)] border border-green-50 max-w-md w-full mx-4 text-center"
            >
              <div className="relative mb-8">
                {/* Outer Ring Pulse */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-green-200 rounded-full blur-xl"
                />

                {/* SVG Tick Container */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0px 10px 20px -5px rgba(34, 197, 94, 0.3)",
                      "0px 20px 40px -5px rgba(34, 197, 94, 0.5)",
                      "0px 10px 20px -5px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center"
                >
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-black text-gray-900 mb-3 tracking-tight"
              >
                Order Placed Successfully!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-500 font-medium text-lg"
              >
                Thank you for your contribution.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
