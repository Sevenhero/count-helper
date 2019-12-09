import * as moment from "moment";
export class Month {
  name: string;
  shortName: string;
  days: Day[] = [];
  constructor(days: moment.Moment[]) {
    let monthFormat = "MMMM";
    let monthShortFormat = "MMM";
    this.name = days[0].format(monthFormat);
    this.shortName = days[0].format(monthShortFormat);
    days.forEach(day => {
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
  constructor(public date: moment.Moment) {
    this.dateInMonth = date.date();
    this.weekDayName = date.format("ddd");
  }
}
