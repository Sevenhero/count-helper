import * as moment from "moment";
import { DayOfWeek } from "./DayOfWeek.enum";
import { Month } from "./month";
export class Helper {
  private getDatesOfMonth(date: moment.Moment): moment.Moment[] {
    let daysInMonth = date.daysInMonth();
    let usedDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      let calculatedDate = date.clone().date(i);
      if (calculatedDate.day() === DayOfWeek.Friday || calculatedDate.day() === DayOfWeek.Sunday)
        usedDaysInMonth.push(calculatedDate);
    }
    return usedDaysInMonth;
  }

  daysOfMonth() {
    moment.locale("de");
    let firstDateOfCurrentMoth = moment()
      .startOf("month")
      .hours(0)
      .minutes(0);
    let firstDateOfLastMoth = firstDateOfCurrentMoth
      .clone()
      .subtract(1, "month");
    let lastMonth = new Month(this.getDatesOfMonth(firstDateOfLastMoth));
    let currentMonth = new Month(this.getDatesOfMonth(firstDateOfCurrentMoth));
    return [lastMonth, currentMonth];
  }
}
