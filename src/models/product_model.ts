export class ProductModel {
  id: number;
  image: string;
  productname: string;
  description: string;
  category: string;
  price: number;
  sellingprice: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.image = data.image || "";
    this.productname = data.productname || "";
    this.description = data.description || "";
    this.category = data.category || "";
    this.price = data.price || 0;
    this.sellingprice = data.sellingprice || 0;
    this.createdAt = data.createdAt || "";
    this.updatedAt = data.updatedAt || "";
  }
}
