import axios from 'axios';
import { EventModel, EventDetailData } from '../models/event_model';

const api = axios.create({
  baseURL: 'http://localhost:3003/api', // Adjust base URL as needed based on environment
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEvents = async (page: number = 1) => {
  try {
    const response = await api.post('/event/get', { page });
    if (response.data.success && response.data.data && response.data.data.events) {
      response.data.data.events = response.data.data.events.map((event: any) => new EventModel(event));
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventDetails = async (id: number) => {
  try {
    const response = await api.post('/event/details', { id });
    if (response.data.success && response.data.data) {
      return new EventDetailData(response.data.data);
    }
    return null;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export default api;
