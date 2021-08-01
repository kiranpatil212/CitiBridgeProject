import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  userName: string;

  constructor(private router: Router) { }

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
  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"])
  }
}
