export class CategoryModel {
  categoryid: number;
  categoryname: string;
  userid: number;

  constructor(data: any) {
    this.categoryid = data.categoryid;
    this.categoryname = data.categoryname;
    this.userid = data.userid;
  }
}

export class GalleryModel {
  id: number;
  title: string;
  image: string;
  categoryid: number;
  categoryname: string;
  userid: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.categoryid = data.categoryid;
    this.categoryname = data.categoryname;
    this.userid = data.userid;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class VideoModel {
  id: number;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  categoryid: number;
  categoryname: string;
  userid: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.video = data.video;
    this.thumbnail = data.thumbnail;
    this.categoryid = data.categoryid;
    this.categoryname = data.categoryname;
    this.userid = data.userid;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
export class BannerModel {
  id: number;
  image: string;
  userid: number;

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.userid = data.userid;
  }
}
