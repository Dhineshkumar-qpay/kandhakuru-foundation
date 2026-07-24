"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Search,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProducts, getImageVideoUrl, addToCart } from "../../services/api";
import { ProductModel } from "../../models/product_model";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = ["All Products", "spiritual", "accessories", "book"];

export default function ShopPage() {
  const { isLoggedIn, openLogin } = useAuth();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  const [buyingNowId, setBuyingNowId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryParam =
          activeCategory === "All Products" ? "" : activeCategory;
        const response = await getProducts(categoryParam);
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="bg-gray-50 min-h-screen pt-0  text-[var(--foreground)]">
      {/* Corporate Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center py-16 lg:py-24 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">
                Premium Spiritual Resources <br />
                <span className="text-brand-secondary">
                  Curated for Your Journey
                </span>
              </h1>
              <p className="text-md text-gray-600 max-w-xl leading-relaxed">
                Explore our official selection of authentic spiritual tools,
                literature, and wellness items. Every purchase supports the
                foundation's global initiatives.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[var(--color-deepgreen)] text-white px-8 py-3.5 font-bold tracking-wide shadow-[0_4px_14px_0_rgba(6,95,70,0.39)] hover:bg-[var(--color-deepgreen)]/90 transition-all hover:shadow-[0_6px_20px_rgba(6,95,70,0.23)] rounded-[0px] cursor-pointer"
                >
                  Shop Collection
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full hidden md:flex justify-end relative"
            >
              {products.length > 0 ? (
                <div
                  className="relative w-150 h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
                  onClick={() => setSelectedProduct(products[0])}
                >
                  {/* Background Image */}
                  <img
                    src={getImageVideoUrl(products[0].image)}
                    alt={products[0].productname}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
                      {products[0].category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h2 className="text-4xl font-bold leading-tight mb-3">
                      {products[0].productname}
                    </h2>

                    <p className="text-white/80 text-sm leading-6 line-clamp-3 mb-6">
                      {products[0].description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                          Starting From
                        </p>

                        <div className="flex items-center gap-3">
                          {products[0].sellingprice &&
                          products[0].sellingprice < products[0].price ? (
                            <span className="text-white/60 line-through text-lg">
                              ₹{products[0].price}
                            </span>
                          ) : (
                            <></>
                          )}
                          <span className="text-3xl font-black text-[#FFD54A]">
                            ₹{products[0].sellingprice || products[0].price}
                          </span>
                        </div>
                      </div>

                      <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[var(--color-deepgreen)] animate-spin" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="products-section" className="py-16">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-10">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-md p-6 sticky top-28 shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-6">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-sm text-sm font-medium transition-colors capitalize ${
                        activeCategory === category
                          ? "bg-[var(--color-deepgreen)]/10 text-[var(--color-deepgreen)] border-l-2 border-[var(--color-deepgreen)]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeCategory}
                </h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {
                    products.filter((p) =>
                      p.productname
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    ).length
                  }{" "}
                  Results
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-deepgreen)] focus:border-transparent transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(
                  (product, idx) =>
                    idx !== 0 &&
                    product.productname
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )
                .map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white group border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={getImageVideoUrl(product.image)}
                        alt={product.productname}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-gray-900 font-bold px-4 py-2 rounded-full text-sm shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          View Details
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[var(--color-deepgreen)] uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                        {product.productname}
                      </h3>

                      <p className="text-sm text-gray-600 font-normal mb-6 flex-grow line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-col">
                          {product.sellingprice && product.sellingprice > 0 ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price}
                              </span>
                              <span className="text-xl font-extrabold text-gray-900">
                                ₹{product.sellingprice}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-extrabold text-gray-900">
                              ₹{product.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={addingToCartId === product.id}
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (!isLoggedIn) {
                                openLogin();
                              } else {
                                try {
                                  setAddingToCartId(product.id);
                                  await addToCart({ productid: product.id });
                                  window.dispatchEvent(
                                    new Event("cartUpdated"),
                                  );
                                  // alert("Added to cart!");
                                } catch (error) {
                                  console.error(error);
                                } finally {
                                  setAddingToCartId(null);
                                }
                              }
                            }}
                            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[var(--color-deepgreen)] hover:bg-[var(--color-deepgreen)] hover:text-white hover:border-[var(--color-deepgreen)] transition-all shadow-sm cursor-pointer disabled:opacity-50"
                            title="Add to Cart"
                          >
                            {addingToCartId === product.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <ShoppingCart size={18} />
                            )}
                          </button>
                          <button
                            disabled={buyingNowId === product.id}
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (!isLoggedIn) {
                                openLogin();
                              } else {
                                try {
                                  setBuyingNowId(product.id);
                                  await addToCart({ productid: product.id });
                                  window.dispatchEvent(
                                    new Event("cartUpdated"),
                                  );
                                  router.push(`/checkout`);
                                } catch (error) {
                                  console.error(error);
                                  setBuyingNowId(null);
                                }
                              }
                            }}
                            className="hidden sm:flex items-center gap-2 text-sm font-bold bg-[var(--color-deepgreen)] text-white px-4 py-2 rounded-[0px] hover:bg-[var(--color-deepgreen)]/90 transition-colors shadow-md cursor-pointer disabled:opacity-75"
                          >
                            {buyingNowId === product.id ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />{" "}
                                Processing...
                              </>
                            ) : (
                              "Buy Now"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stylish Professional Trust Indicators */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-[var(--color-deepgreen)]/5 hover:border-[var(--color-deepgreen)]/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <ShieldCheck className="text-[var(--color-deepgreen)] w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                100% Authentic Quality
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Verified and blessed directly by the foundation masters.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-[var(--color-deepgreen)]/5 hover:border-[var(--color-deepgreen)]/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <Truck className="text-[var(--color-deepgreen)] w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                Reliable Logistics
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Secure and fast nationwide delivery for all spiritual tools.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-[var(--color-deepgreen)]/5 hover:border-[var(--color-deepgreen)]/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <Clock className="text-[var(--color-deepgreen)] w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                24/7 Dedicated Support
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Our service team is always here to assist with your journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-[0px] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative">
              <img
                src={getImageVideoUrl(selectedProduct.image)}
                alt={selectedProduct.productname}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
              <span className="text-xs font-bold text-[var(--color-deepgreen)] uppercase tracking-widest mb-2 inline-block bg-[var(--color-deepgreen)]/10 px-3 py-1 rounded-full w-fit">
                {selectedProduct.category}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                {selectedProduct.productname}
              </h2>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex flex-col">
                  {selectedProduct.sellingprice &&
                  selectedProduct.sellingprice > 0 ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-gray-900">
                        ₹{selectedProduct.sellingprice}
                      </span>
                      <span className="text-lg text-gray-400 line-through font-medium">
                        ₹{selectedProduct.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-black text-gray-900">
                      ₹{selectedProduct.price}
                    </span>
                  )}
                </div>
                {selectedProduct.sellingprice &&
                selectedProduct.sellingprice > 0 &&
                selectedProduct.price > selectedProduct.sellingprice ? (
                  <span className="bg-red-50 text-red-600 font-bold px-2 py-1 rounded text-sm">
                    {Math.round(
                      ((selectedProduct.price - selectedProduct.sellingprice) /
                        selectedProduct.price) *
                        100,
                    )}
                    % OFF
                  </span>
                ) : (
                  <></>
                )}
              </div>
              {selectedProduct.size && (
                <>
                  <div className="mb-2">
                    Size : <strong>{selectedProduct.size}</strong>
                  </div>
                </>
              )}

              <div className="prose prose-sm text-gray-600 mb-8 flex-grow">
                <p className="leading-relaxed">{selectedProduct.description}</p>
                {selectedProduct.benefits &&
                  selectedProduct.benefits.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {selectedProduct.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2
                              size={16}
                              className="text-[var(--color-deepgreen)] shrink-0 mt-1"
                            />
                            <div>
                              <span className="font-bold text-gray-800">
                                {benefit.title}
                              </span>
                              {benefit.description && (
                                <span className="text-gray-600 ml-1">
                                  - {benefit.description}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  disabled={addingToCartId === selectedProduct.id}
                  onClick={async () => {
                    if (!isLoggedIn) {
                      openLogin();
                    } else {
                      try {
                        setAddingToCartId(selectedProduct.id);
                        await addToCart({ productid: selectedProduct.id });
                        window.dispatchEvent(new Event("cartUpdated"));
                        setSelectedProduct(null);
                      } catch (error) {
                        console.error(error);
                      } finally {
                        setAddingToCartId(null);
                      }
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[var(--color-deepgreen)] text-[var(--color-deepgreen)] font-bold py-4 rounded-[0px] hover:bg-[var(--color-deepgreen)]/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {addingToCartId === selectedProduct.id ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={20} />
                  )}
                  {addingToCartId === selectedProduct.id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
                <button
                  disabled={buyingNowId === selectedProduct.id}
                  onClick={async () => {
                    if (!isLoggedIn) {
                      openLogin();
                    } else {
                      try {
                        setBuyingNowId(selectedProduct.id);
                        await addToCart({ productid: selectedProduct.id });
                        window.dispatchEvent(new Event("cartUpdated"));
                        router.push(`/checkout`);
                      } catch (error) {
                        console.error(error);
                        setBuyingNowId(null);
                      }
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-deepgreen)] text-white font-bold py-4 rounded-[0px] hover:bg-[var(--color-deepgreen)]/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer disabled:opacity-75"
                >
                  {buyingNowId === selectedProduct.id ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : null}
                  {buyingNowId === selectedProduct.id
                    ? "Processing..."
                    : "Buy Now"}
                  {!buyingNowId || buyingNowId !== selectedProduct.id ? (
                    <ArrowRight size={20} />
                  ) : null}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
