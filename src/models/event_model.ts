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
  programtype: string;
  deliverymode: string;
  eventdate: string | null;
  starttime: string | null;
  endtime: string | null;
  duration: string | null;
  benefits: string[] | null;
  agenda: { starttime: string; endtime: string; title: string }[] | null;
  instructions: string;
  eligibility: string;
  dresscode: string;
  thingstobring: string[] | null;
  participants: number | null;
  partcipants?: number | null;
  registrationfee: string;
  registrationlastdate: string | null;
  registrationactive: boolean;
  venuename: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  maplink: string | null;
  eventtype: string;
  status: string;
  userid: number;

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.programtype = data.programtype;
    this.deliverymode = data.deliverymode;
    this.eventdate = data.eventdate;
    this.starttime = data.starttime;
    this.endtime = data.endtime;
    this.duration = data.duration;
    this.benefits = data.benefits;
    this.agenda = data.agenda || data.ajanta?.schedule || data.ajanta;
    this.instructions = data.instructions;
    this.eligibility = data.eligibility;
    this.dresscode = data.dresscode;
    this.thingstobring = data.thingstobring;
    this.participants = data.participants;
    this.partcipants = data.partcipants;
    this.registrationfee = data.registrationfee;
    this.registrationlastdate = data.registrationlastdate;
    this.registrationactive = data.registrationactive;
    this.venuename = data.venuename;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.maplink = data.maplink;
    this.eventtype = data.eventtype;
    this.status = data.status;
    this.userid = data.userid;
  }
}
