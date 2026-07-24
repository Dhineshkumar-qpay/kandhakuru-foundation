export class VerifyOtpResponse {
  message: string;
  userid: number;
  token: string;

  constructor(data: any) {
    this.message = data.message;
    this.userid = data.userid;
    this.token = data.token;
  }
}

export class UserModel {
  userid: number;
  username: string;
  email: string;
  mobile: string;
  userType: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.userid = data.userid || 0;
    this.username = data.username || "";
    this.email = data.email || "";
    this.mobile = data.mobile || "";
    this.userType = data.userType || "";
    this.createdAt = data.createdAt || "";
    this.updatedAt = data.updatedAt || "";
  }
}
