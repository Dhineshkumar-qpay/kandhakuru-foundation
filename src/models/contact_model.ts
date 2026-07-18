export class TestimonialModel {
  id: number;
  rating: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.rating = data.rating;
    this.name = data.name;
    this.email = data.email;
    this.message = data.message;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}


