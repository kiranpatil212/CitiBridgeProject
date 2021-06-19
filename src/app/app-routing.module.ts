import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserHistoryComponent } from "./components/user-history/user-history.component";
import { RecommendationsComponent } from "./components/recommendations/recommendations.component";

const routes: Routes = [

  // { path:'', redirectTo:'/login', pathMatch:'full' },

  // { path:'', component:LoginComponent },

  { path: 'login', component: LoginComponent },

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
