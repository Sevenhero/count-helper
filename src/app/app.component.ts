import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Helper } from "./Helper";
import { Month } from "./month";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { DayOfWeek } from "./DayOfWeek.enum";

const baseUrl = "http://localhost/indextest.php";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "count-helper";
  months: Month[] = [];
  editMode: boolean = false;
  nextDayId: string;
  constructor(private http: HttpClient) {
    this.months = new Helper().daysOfMonth();
  }

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollToNextDate(), 500);
  }

  sendMail(month: Month) {
    let mailData = {
      body: JSON.stringify(month),
      mailreceiver: "sven.kernke@yahoo.de",
    };
    let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append("Content-Type", "application/json");
    let formData: FormData = new FormData();
    try {
      this.http
        .post("https://kernke.eu/mail/mail.php", JSON.stringify(mailData), {
          headers,
        })
        .subscribe((res) => {
          console.log(res);
          month.wasSend = true;
        });
      this.save();
    } catch (error) {
      console.log(error);
    }
  }

  //   fileChange(event) {
  //     let fileList: FileList = event.target.files;
  //     if(fileList.length > 0) {
  //         let file: File = fileList[0];

  //         headers.append('Accept', 'application/json');
  //         let options = new RequestOptions({ headers: headers });
  //         this.http.post(`${this.apiEndPoint}`, formData, options)
  //             .map(res => res.json())
  //             .catch(error => Observable.throw(error))
  //             .subscribe(
  //                 data => console.log('success'),
  //                 error => console.log(error)
  //             )
  //     }
  // }

  getNextDay(): number {
    var date = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    while (date.day() != DayOfWeek.Friday && date.day() != DayOfWeek.Sunday) {
      date = date.clone().add(1, "d");
    }
    return date.toDate().getTime() / 1000;
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  scrollToNextDate() {
    this.nextDayId = Math.round(this.getNextDay()).toString();
    let element = document.getElementById(this.nextDayId);
    if (!element) return;
    let top = this.getOffset(element).top;
    if (top) window.scrollTo(0, top);
  }

  isLastMonthPast(month) {
    let lastDayIndex = month.days.length - 1;
    let result = month.days[lastDayIndex].date <= new Date();
    return !result;
  }

  key = "gg";
  private load(): any {
    let saveData = localStorage.getItem(this.key);
    if (saveData) {
      let parsedData: SaveData = JSON.parse(saveData);
      for (let month of parsedData.months) {
        let foundMonth = this.months.find((m) => m.name === month.name);
        if (foundMonth) {
          let foundIndex = this.months.indexOf(foundMonth);
          this.months[foundIndex] = month;
        }
      }
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(new SaveData(this.months)));
  }
}

export class SaveData {
  constructor(months: Month[], settings?: any) {
    this.months = months;
    this.settings = settings;
  }
  months: Month[];
  settings: any;
}
