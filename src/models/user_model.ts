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
