import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isToggle: boolean = false;
  isShowSubmenu: boolean = false;
  showSubmenu: any;

  constructor() {}

  ngOnInit() {}

  //
  toggleSidebar() {
    return { width: this.isToggle ? "60px" : "250px" };
  }

  toggleMainTop() {
    return {
      width: this.isToggle ? "calc(100% - 60px" : "calc(100% - 250px)",
      "margin-left": this.isToggle ? "60px" : "250px",
    };
  }

  toggleSubmenu(e: Event) {
    e.preventDefault();
    if (this.isShowSubmenu === false) {
      this.showSubmenu = { "height.px": "127" };
      this.isShowSubmenu = true;
    } else {
      this.showSubmenu = { "height.px": "0" };
      this.isShowSubmenu = false;
    }
  }

}
