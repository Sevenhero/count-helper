import * as moment from "moment";
export class Month {
  name: string;
  shortName: string;
  wasSend: boolean;
  days: Day[] = [];
  toggle: false;
  constructor(days: moment.Moment[]) {
    let monthFormat = "MMMM";
    let monthShortFormat = "MMM";
    this.wasSend = false;
    this.name = days[0].format(monthFormat);
    this.shortName = days[0].format(monthShortFormat);
    days.forEach((day) => {
      this.days.push(new Day(day));
    });
  }
}

export class Day {
  persons: number = 0;
  phone: number = 0;
  dateInMonth: number = 0;
  weekDayName: string;
  editMode: boolean = false;
  date: Date;
  dateInSeconds: number;
  constructor(moment: moment.Moment) {
    this.dateInMonth = moment.date();
    this.weekDayName = moment.format("ddd");
    this.date = moment.toDate();
    this.dateInSeconds = moment.toDate().getTime() / 1000;
  }
}
