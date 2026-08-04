"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Heart,
  Package,
  LogOut,
  ChevronRight,
  Edit3,
  X,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getAddresses,
  addAddress,
  editAddress,
  deleteAddress,
  getUser,
  getOrderHistory,
  BASEURL,
} from "../../services/api";
import { AddressModel, OrderHistoryModel } from "../../models/OrderModel";
import { UserModel } from "../../models/user_model";

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"profile" | "address" | "orders">(
    "profile",
  );
  const { logout } = useAuth();
  const router = useRouter();

  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [orders, setOrders] = useState<OrderHistoryModel[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
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
    if (activeTab === "address") {
      fetchAddresses();
    } else if (activeTab === "profile") {
      fetchUser();
    } else if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await getOrderHistory();
      if (res.success && res.data) {
        setOrders(res.data.map((order: any) => new OrderHistoryModel(order)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const res = await getUser();
      if (res.success && res.data) {
        setUser(new UserModel(res.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await getAddresses();
      if (res.success && res.data) {
        setAddresses(res.data);
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
      if (editingAddressId) {
        await editAddress({ ...payload, id: editingAddressId });
      } else {
        await addAddress(payload);
      }
      setIsAddressModalOpen(false);
      setEditingAddressId(null);
      fetchAddresses();
    } catch (error) {
      console.error(error);
      alert("Failed to save address");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        fetchAddresses();
      } catch (error) {
        console.error(error);
        alert("Failed to delete address");
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const tabs = [
    { id: "profile", label: t("my_account.my_profile"), icon: User },
    { id: "address", label: t("my_account.saved_addresses"), icon: MapPin },
    { id: "orders", label: t("my_account.order_history"), icon: Package },
  ] as const;

  return (
    <main className="pt-24 pb-20 bg-[#FAFAF9] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {t("my_account.my_account")}
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            {t("my_account.manage_info")}
          </p>
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
                  <h3 className="font-bold text-gray-900 text-lg">
                    {user?.username}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
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
                      className={`flex items-center justify-between w-full p-4 rounded-xl transition-all font-medium cursor-pointer ${isActive
                        ? "bg-[var(--color-deepgreen)] text-white shadow-md shadow-[var(--color-deepgreen)]/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-deepgreen)]"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${isActive ? "text-white/80" : "text-gray-400"}`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-xl text-red-500 font-bold bg-red-50 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  {t("my_account.logout")}
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
                      <h2 className="text-2xl font-bold text-gray-900">
                        {t("my_account.personal_info")}
                      </h2>
                      {/* <button className="flex items-center gap-2 text-[var(--color-deepgreen)] font-semibold bg-[var(--color-deepgreen)]/10 px-4 py-2 rounded-full hover:bg-[var(--color-deepgreen)] hover:text-white transition-colors cursor-pointer">
                        <Edit3 className="w-4 h-4" /> Edit
                      </button> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loadingUser ? (
                        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-10 h-10 text-[var(--color-deepgreen)] animate-spin mb-4" />
                          <p className="text-gray-500 font-medium">
                            Loading profile...
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              {t("my_account.full_name")}
                            </label>
                            <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                              {user?.username || t("my_account.not_provided")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              {t("my_account.email_address")}
                            </label>
                            <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                              {user?.email || t("my_account.not_provided")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              {t("my_account.phone_number")}
                            </label>
                            <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                              {user?.mobile ? `+91 ${user.mobile}` : "N/A"}
                            </p>
                          </div>
                        </>
                      )}
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
                    {isAddressModalOpen ? (
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {editingAddressId
                              ? t("my_account.edit_address")
                              : t("checkout.add_new_address")}
                          </h2>
                          <button
                            onClick={() => setIsAddressModalOpen(false)}
                            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <form
                          onSubmit={handleAddressSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              {t("checkout.place_type")}
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
                              <option value="home">{t("checkout.home")}</option>
                              <option value="office">{t("checkout.office")}</option>
                              <option value="others">{t("checkout.others")}</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                {t("checkout.contact_name")}
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
                                {t("checkout.contact_number")}
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
                              {t("checkout.address_street")}
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
                                {t("checkout.city")}
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
                                {t("checkout.district")}
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
                                {t("checkout.state")}
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
                                {t("checkout.pincode")}
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
                              onClick={() => setIsAddressModalOpen(false)}
                              className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
                            >
                              {t("checkout.cancel")}
                            </button>
                            <button
                              type="submit"
                              className="flex-1 py-4 bg-[var(--color-deepgreen)] text-white font-bold rounded-xl hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-md cursor-pointer"
                            >
                              {t("checkout.save_address")}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {t("my_account.saved_addresses")}
                          </h2>
                          <button
                            onClick={() => {
                              setEditingAddressId(null);
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
                              setIsAddressModalOpen(true);
                            }}
                            className="text-[var(--color-deepgreen)] font-semibold bg-[var(--color-deepgreen)]/10 px-4 py-2 rounded-full hover:bg-[var(--color-deepgreen)] hover:text-white transition-colors cursor-pointer"
                          >
                            + Add New
                          </button>
                        </div>
                        {loadingAddresses ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-10 h-10 text-[var(--color-deepgreen)] animate-spin mb-4" />
                            <p className="text-gray-500 font-medium">
                              Loading addresses...
                            </p>
                          </div>
                        ) : addresses.length === 0 ? (
                          <p className="text-gray-500">
                            {t("my_account.no_saved_addresses")}
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map((addr) => (
                              <div
                                key={addr.id}
                                className="border border-gray-100 bg-gray-50/50 hover:border-[var(--color-deepgreen)]/30 transition-all rounded-xl p-6 relative"
                              >
                                <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-widest">
                                  {addr.place}
                                </span>
                                <h3 className="font-bold text-gray-900 mb-2 capitalize">
                                  {addr.place}
                                </h3>
                                <p className="text-sm font-bold text-gray-800 mt-2">
                                  {addr.contactname}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                  {addr.contactnumber}
                                </p>
                                <p className="text-gray-600 leading-relaxed max-w-sm text-sm">
                                  {addr.address},
                                  <br />
                                  {addr.city}, {addr.district},
                                  <br />
                                  {addr.state}, {addr.pincode}
                                  <br />
                                  {addr.country}
                                </p>
                                <div className="flex gap-4 mt-6">
                                  <button
                                    onClick={() => {
                                      setEditingAddressId(addr.id);
                                      setAddressForm({
                                        place: addr.place,
                                        contactname: addr.contactname,
                                        contactnumber: addr.contactnumber,
                                        address: addr.address,
                                        city: addr.city,
                                        district: addr.district,
                                        state: addr.state,
                                        pincode: addr.pincode.toString(),
                                        country: addr.country,
                                      });
                                      setIsAddressModalOpen(true);
                                    }}
                                    className="text-[var(--color-deepgreen)] font-bold hover:underline cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAddress(addr.id)}
                                    className="text-red-500 font-bold hover:underline cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      {t("my_account.order_history")}
                    </h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {loadingOrders ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-10 h-10 text-[var(--color-deepgreen)] animate-spin mb-4" />
                          <p className="text-gray-500 font-medium">
                            Loading orders...
                          </p>
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="text-center py-12">
                          <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {t("my_account.no_orders_found")}
                          </h3>
                          <p className="text-gray-500">
                            {t("my_account.no_orders_yet")}
                          </p>
                        </div>
                      ) : (
                        orders.map((order) => (
                          <div
                            key={order.id}
                            onClick={() => router.push(`/order/${order.id}`)}
                            className="bg-white border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col"
                          >
                            {/* Header Section */}
                            <div className="bg-gray-50/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-deepgreen)]/10 flex items-center justify-center shrink-0">
                                  <Package className="w-4 h-4 text-[var(--color-deepgreen)]" />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-gray-900 text-sm tracking-wide">
                                    ORDER{" "}
                                    <span className="text-[var(--color-deepgreen)]">
                                      #{order.id}
                                    </span>
                                  </h4>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-4">
                                <div className="text-left sm:text-right">
                                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">
                                    Total Amount
                                  </p>
                                  <p className="font-black text-gray-900 text-sm">
                                    ₹{order.totalamount.toLocaleString()}
                                  </p>
                                </div>
                                <div
                                  className={`px-3 py-1 font-bold text-[10px] rounded-[0px] uppercase tracking-widest ${order.orderstatus.toLowerCase() === "pending" ? "bg-amber-100 text-amber-700 border border-amber-200" :
                                    order.orderstatus.toLowerCase() === "confirmed" ? "bg-sky-100 text-sky-700 border border-sky-200" :
                                      order.orderstatus.toLowerCase() === "packed" ? "bg-indigo-100 text-indigo-700 border border-indigo-200" :
                                        order.orderstatus.toLowerCase() === "shipped" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                                          order.orderstatus.toLowerCase() === "delivered" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                                            order.orderstatus.toLowerCase() === "cancelled" ? "bg-red-100 text-red-700 border border-red-200" :
                                              "bg-gray-100 text-gray-700 border border-gray-200"
                                    }`}
                                >
                                  {order.orderstatus}
                                </div>
                              </div>
                            </div>

                            {/* Items List */}
                            <div className="p-4 flex flex-col gap-4 flex-grow">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 group">
                                  <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0 relative">
                                    <img
                                      src={BASEURL + item.productimage}
                                      alt={item.productname}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="flex flex-col justify-center flex-grow">
                                    <h5 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-[var(--color-deepgreen)] transition-colors">
                                      {item.productname}
                                    </h5>
                                    <div className="mt-2 flex items-baseline gap-2">
                                      <span className="text-base font-black text-[var(--color-deepgreen)]">
                                        ₹
                                        {(
                                          item.sellingprice || item.price
                                        ).toLocaleString()}
                                      </span>
                                      {item.sellingprice && (
                                        <span className="text-xs font-bold text-gray-400 line-through">
                                          ₹{item.price.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
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
