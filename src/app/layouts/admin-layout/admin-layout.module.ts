import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,

    CarouselModule,
    ButtonModule
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class AdminLayoutModule {}
