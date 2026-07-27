export class AddressModel {
  id: number;
  userid: number;
  contactname: string;
  contactnumber: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: number;
  country: string;
  place: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.userid = data.userid || 0;
    this.contactname = data.contactname || "";
    this.contactnumber = data.contactnumber || "";
    this.address = data.address || "";
    this.city = data.city || "";
    this.district = data.district || "";
    this.state = data.state || "";
    this.pincode = data.pincode || 0;
    this.country = data.country || "";
    this.place = data.place || "";
    this.createdAt = data.createdAt || "";
    this.updatedAt = data.updatedAt || "";
  }
}

import { ProductModel } from "./product_model";

export class CartItemModel {
  id: number;
  userid: number;
  productid: number;
  quantity: number;
  price: number;
  totalprice: number;
  createdAt: string;
  updatedAt: string;
  product: ProductModel | null;

  constructor(data: any) {
    this.id = data.id || 0;
    this.userid = data.userid || 0;
    this.productid = data.productid || 0;
    this.quantity = data.quantity || 0;
    this.price = data.price || 0;
    this.totalprice = data.totalprice || 0;
    this.createdAt = data.createdAt || "";
    this.updatedAt = data.updatedAt || "";
    this.product = data.product ? new ProductModel(data.product) : null;
  }
}

export class CartModel {
  totalquantity: number;
  subtotal: number;
  cart: CartItemModel[];

  constructor(data: any) {
    this.totalquantity = data.totalquantity || 0;
    this.subtotal = data.subtotal || 0;
    this.cart = data.cart ? data.cart.map((item: any) => new CartItemModel(item)) : [];
  }
}

export class OrderHistoryItemModel {
  productname: string;
  productimage: string;
  price: number;
  sellingprice: number | null;

  constructor(data: any) {
    this.productname = data.productname || "";
    this.productimage = data.productimage || "";
    this.price = data.price || 0;
    this.sellingprice = data.sellingprice || null;
  }
}

export class OrderHistoryModel {
  id: number;
  userid: number;
  addressid: number;
  totalamount: number;
  orderstatus: string;
  items: OrderHistoryItemModel[];

  constructor(data: any) {
    this.id = data.id || 0;
    this.userid = data.userid || 0;
    this.addressid = data.addressid || 0;
    this.totalamount = data.totalamount || 0;
    this.orderstatus = data.orderstatus || "";
    this.items = data.items ? data.items.map((item: any) => new OrderHistoryItemModel(item)) : [];
  }
}

export class OrderDetailItemModel {
  id: number;
  productid: number;
  productname: string;
  productimage: string;
  price: number;
  sellingprice: number | null;
  quantity: number;
  totalprice: number;

  constructor(data: any) {
    this.id = data.id || 0;
    this.productid = data.productid || 0;
    this.productname = data.productname || "";
    this.productimage = data.productimage || "";
    this.price = data.price || 0;
    this.sellingprice = data.sellingprice || null;
    this.quantity = data.quantity || 0;
    this.totalprice = data.totalprice || 0;
  }
}

export class OrderDetailModel {
  id: number;
  screenshot: string;
  totalamount: number;
  subtotal: number;
  shippingcost: number;
  paymentstatus: string;
  orderstatus: string;
  createdAt: string;

  constructor(data: any) {
    this.id = data.id || 0;
    this.screenshot = data.screenshot || "";
    this.totalamount = data.totalamount || 0;
    this.subtotal = data.subtotal || 0;
    this.shippingcost = data.shippingcost || 0;
    this.paymentstatus = data.paymentstatus || "";
    this.orderstatus = data.orderstatus || "";
    this.createdAt = data.createdAt || "";
  }
}

export class OrderDetailResponseModel {
  order: OrderDetailModel;
  address: AddressModel;
  items: OrderDetailItemModel[];

  constructor(data: any) {
    this.order = new OrderDetailModel(data.order || {});
    this.address = new AddressModel(data.address || {});
    this.items = data.items ? data.items.map((item: any) => new OrderDetailItemModel(item)) : [];
  }
}
