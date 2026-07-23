import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  // Placeholder cart items
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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                        <p className="text-[var(--color-deepgreen)] font-bold mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-[var(--color-deepgreen)] rounded-md px-2 py-1">
                          <button className="text-gray-500 hover:text-[var(--color-deepgreen)] font-medium">-</button>
                          <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                          <button className="text-gray-500 hover:text-[var(--color-deepgreen)] font-medium">+</button>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                  <p className="font-medium text-lg text-gray-900">Your cart is empty</p>
                  <p className="text-sm mt-1 mb-6 text-center">Looks like you haven't added any items to your cart yet.</p>
                  <button onClick={onClose} className="px-6 py-2 bg-[var(--color-deepgreen)] text-white font-bold rounded-full hover:bg-[var(--color-deepgreen)]/90 transition-colors">
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
                  <span className="text-xl font-black text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[var(--color-deepgreen)]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
