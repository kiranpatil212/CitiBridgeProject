import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  

  {
    path: "/userhistory",
    title: "User History",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-book-bookmark",
    class: ""
  },
  
  {
    path: "/recommendations",
    title: "Recommendations",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-tap-02",
    class: ""
  },

  {
    path: "/logout",
    title: "Log Out",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-button-power",
    class: ""
  },
  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
