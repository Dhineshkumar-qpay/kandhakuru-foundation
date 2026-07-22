export class EventModel {
  id: number;
  image: string;
  title: string;
  eventdate: string;
  address: string;
  city: string;
  state: string;
  eventtype: string;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title;
    this.eventdate = data.eventdate;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.eventtype = data.eventtype;
    this.status = data.status;
  }
}

export class EventDetailData {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  eventdate: string;
  starttime: string;
  endtime: string;
  partcipants: number;
  registrationfee: string;
  venuename: string;
  address: string;
  city: string;
  state: string;
  maplink: string;
  eventtype: string;
  status: string;
  userid: number;
  ajanta: any;
  instructions: string;
  registrationactive: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.eventdate = data.eventdate;
    this.starttime = data.starttime;
    this.endtime = data.endtime;
    this.partcipants = data.partcipants;
    this.registrationfee = data.registrationfee;
    this.venuename = data.venuename;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.maplink = data.maplink;
    this.eventtype = data.eventtype;
    this.status = data.status;
    this.userid = data.userid;
    this.ajanta = data.ajanta;
    this.instructions = data.instructions;
    this.registrationactive = data.registrationactive;
  }
}
