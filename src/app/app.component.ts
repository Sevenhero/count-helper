import { Component } from "@angular/core";
import { Helper } from "./Helper";
import { Month } from "./month";
import { HttpClient } from '@angular/common/http';

const baseUrl="http://localhost/indextest.php";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "count-helper";
  months: Month[] = [];
  editMode: boolean = false;
  constructor(private http:HttpClient){
    this.months = new Helper().daysOfMonth();
  }

  async send(){
    let data ={test:"mimi"}
    await this.http.post(baseUrl,JSON.stringify(data)).toPromise();
  }
}
