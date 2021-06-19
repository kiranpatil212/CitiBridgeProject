import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },


  {
    path: "userhistory",
    title: "User History",
    icon: "icon-book-bookmark",
    class: ""
  },

  {
    path: "recommendations",
    title: "Propositions",
    icon: "icon-tap-02",
    class: ""
  },

  {
    path: "logout",
    title: "Log Out",
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
  userName: string;
  
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userName = sessionStorage.getItem("loggedInUser");
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}