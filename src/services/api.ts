import axios from "axios";
import { EventModel, EventDetailData } from "../models/event_model";
import {
  CategoryModel,
  GalleryModel,
  VideoModel,
  BannerModel,
} from "../models/image_video_model";
import { TestimonialModel } from "../models/contact_model";

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

export const getEvents = async (page: number = 1) => {
  try {
    const response = await api.post("/event/get", { page, status: "active" });
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
    const response = await api.post("/testimonial/get",{status:"active"});
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

export default api;
