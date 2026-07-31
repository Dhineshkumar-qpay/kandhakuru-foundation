export interface BookingModel {
  success?: boolean;
  data?: BookingData[];
}

export interface BookingData {
  id?: number;
  eventid?: number;
  userid?: number;
  fullname?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  occupation?: string;
  gender?: string;
  age?: number;
  city?: string;
  state?: string;
  country?: string;
  ishealthissue?: boolean;
  healthissues?: Healthissue[];
  adultcount?: number;
  childrencount?: number;
  participants?: number;
  bookingdate?: Date | null;
  bookingtime?: null | string;
  remarks?: string;
  totalamount?: string;
  deliverymode?: string;
  paymentstatus?: string;
  transactionid?: null;
  bookingstatus?: string;
  screenshot?: string;
  createdAt?: Date;
  eventname?: string;
  eventdate?: string;
  address?: string;
  registrationfee?: number;
}

export interface Healthissue {
  name?: string;
  issue?: string;
}
