import axios from "axios";
import { EventModel, EventDetailData } from "../models/event_model";
import {
  CategoryModel,
  GalleryModel,
  VideoModel,
  BannerModel,
} from "../models/image_video_model";
import { TestimonialModel } from "../models/contact_model";
import { VerifyOtpResponse } from "../models/user_model";
import { ProductModel } from "../models/product_model";
import { AddressModel, CartModel } from "../models/OrderModel";
import { config, json } from "zod";

export const IMAGEBASEURL = "http://localhost:3003";

export const getImageVideoUrl = (data: string) => {
  if (data.startsWith("https") || data.startsWith("http")) {
    return data;
  } else {
    return `${IMAGEBASEURL}${data}`;
  }
};

const api = axios.create({
  baseURL: "http://localhost:3003/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("userToken");
    }
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getEvents = async (deliverymode?: string, leveltype?: string) => {
  try {
    const payload: any = { status: "active" };
    if (deliverymode) payload.deliverymode = deliverymode;
    if (leveltype) payload.leveltype = leveltype;
    const response = await api.post("/event/get", payload);
    if (
      response.data.success &&
      response.data.data &&
      response.data.data.events
    ) {
      response.data.data.events = response.data.data.events.map(
        (event: any) => new EventModel(event),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventDetails = async (id: number) => {
  try {
    const response = await api.post("/event/details", { id });
    if (response.data.success && response.data.data) {
      return new EventDetailData(response.data.data);
    }
    return null;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.post("/category/get");
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(
        (cat: any) => new CategoryModel(cat),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getGallery = async (
  page: number = 1,
  categoryid: number | null = null,
) => {
  try {
    const response = await api.post("/gallery/get", { page, categoryid });
    if (response.data.success && response.data.data) {
      if (Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map(
          (img: any) => new GalleryModel(img),
        );
      } else if (response.data.data.images) {
        response.data.data.images = response.data.data.images.map(
          (img: any) => new GalleryModel(img),
        );
      } else if (response.data.data.gallery) {
        response.data.data.gallery = response.data.data.gallery.map(
          (img: any) => new GalleryModel(img),
        );
      }
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
};

export const getVideos = async (
  page: number = 1,
  categoryid: number | null = null,
) => {
  try {
    const response = await api.post("/video/get", { page, categoryid });
    if (
      response.data.success &&
      response.data.data &&
      response.data.data.videos
    ) {
      response.data.data.videos = response.data.data.videos.map(
        (vid: any) => new VideoModel(vid),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const addTestimonial = async (data: {
  rating: number;
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await api.post("/testimonial/add", data);
    return response.data;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await api.post("/testimonial/get", { status: "active" });
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(
        (t: any) => new TestimonialModel(t),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const addContactUs = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  message: string;
}) => {
  try {
    const response = await api.post("/contactus/add", data);
    return response.data;
  } catch (error) {
    console.error("Error adding contact us:", error);
    throw error;
  }
};

export const getBanners = async () => {
  try {
    const response = await api.post("/banner/get");
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(
        (b: any) => new BannerModel(b),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

export const signUpApi = async (data: {
  username: string;
  email: string;
}) => {
  try {
    const response = await api.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.post("/user/get");
    return response.data;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};

export const requestLogin = async (data: {
  username: string;
  email: string;
}) => {
  try {
    const response = await api.post("/user/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const submitForm = async (payload: any) => {
  try {
    const response = await api.post("/form/submit", payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

// Address APIs
export const addAddress = async (payload: any) => {
  try {
    // Assuming backend extracts userid from auth token, if needed it can be appended here.
    const response = await api.post("/address/add", payload);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const editAddress = async (payload: any) => {
  try {
    const response = await api.post("/address/edit", payload);
    return response.data;
  } catch (error) {
    console.error("Error editing address:", error);
    throw error;
  }
};

export const deleteAddress = async (id: number) => {
  try {
    // We send id in the data body as requested
    const response = await api.post("/address/delete", { id });
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    const response = await api.post("/address/get");
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(
        (addr: any) => new AddressModel(addr),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error getting addresses:", error);
    throw error;
  }
};

// Cart APIs
export const addToCart = async (payload: { productid: number }) => {
  try {
    const response = await api.post("/cart/add", payload);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartQuantity = async (payload: { productid: number; quantity: number }) => {
  try {
    const response = await api.post("/cart/quantity", payload);
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

export const removeFromCart = async (payload: { productid: number }) => {
  try {
    const response = await api.post("/cart/remove", payload);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const placeOrder = async (payload: { addressid: number; screenshot: string }) => {
  try {
    const response = await api.post("/order/place-order", payload);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const uploadPaymentScreenshot = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await api.post("/order/upload-payment-screenshot", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading payment screenshot:", error);
    throw error;
  }
};

export const getOrderHistory = async () => {
  try {
    const response = await api.post("/order/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const getOrderDetail = async (payload: { orderid: number }) => {
  try {
    const response = await api.post("/order/details", payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    // The user specified "both api's are post method", so we use POST for all.
    const response = await api.post("/cart/get");
    if (response.data.success && response.data.data) {
      response.data.data = new CartModel(response.data.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};

export const getCartCount = async () => {
  try {
    const response = await api.post("/cart/count");
    return response.data;
  } catch (error) {
    console.error("Error getting cart count:", error);
    throw error;
  }
};

export const verifyOtpApi = async (data: { email: string; otp: string }) => {
  try {
    const response = await api.post("/user/verify-otp", data);
    if (response.data.success && response.data.data) {
      response.data.data = new VerifyOtpResponse(response.data.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const getProducts = async (category: string = "") => {
  try {
    const response = await api.post("/product/get", { category });
    if (response.data.success && response.data.data) {
      response.data.data = response.data.data.map(
        (p: any) => new ProductModel(p),
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addBooking = async (data: any) => {
  try {
    console.log(JSON.stringify(data));

    const response = await api.post("/booking/add", data);
    return response.data;
  } catch (error) {
    console.error("Error booking event:", error);
    throw error;
  }
};

export default api;
