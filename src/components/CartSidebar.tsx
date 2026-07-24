import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  IMAGEBASEURL,
} from "../services/api";
import { CartModel } from "../models/OrderModel";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cart, setCart] = useState<CartModel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (
    productid: number,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    try {
      await updateCartQuantity({ productid, quantity: newQuantity });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (productid: number) => {
    try {
      await removeFromCart({ productid });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const cartItems = cart?.cart || [];
  const subtotal = cart?.subtotal || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--color-deepgreen)]" />
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading your cart...</p>
                </div>
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-50 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={`${IMAGEBASEURL}${item.product?.image}`}
                        alt={item.product?.productname || ""}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                          {item.product?.productname}
                        </h4>
                        <p className="text-[var(--color-deepgreen)] font-bold mt-1">
                          ₹{item.price?.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-[var(--color-deepgreen)] rounded-md px-2 py-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productid,
                                item.quantity,
                                -1,
                              )
                            }
                            className="text-gray-500 hover:text-[var(--color-deepgreen)] font-medium cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-gray-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productid,
                                item.quantity,
                                1,
                              )
                            }
                            className="text-gray-500 hover:text-[var(--color-deepgreen)] font-medium cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.productid)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="font-medium text-lg text-gray-900">
                    Your cart is empty
                  </p>
                  <p className="text-sm mt-1 mb-6 text-center">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-[var(--color-deepgreen)] text-white font-bold rounded-[0px] hover:bg-[var(--color-deepgreen)]/90 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-black text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-6 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-[0px] flex justify-center items-center gap-2 hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
