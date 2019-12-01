import { Component } from "@angular/core";
import { Helper } from "./Helper";
import { Month } from "./month";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "count-helper";
  months: Month[] = [];
  editMode: boolean = false;
  constructor() {
    this.months = new Helper().daysOfMonth();
  }
}
