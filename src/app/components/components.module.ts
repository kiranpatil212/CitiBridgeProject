import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserHistoryComponent } from './user-history/user-history.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import {NgForm} from '@angular/forms';
import {ChartModule} from 'primeng/chart';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, DropdownModule, TableModule, ChartModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, UserHistoryComponent, RecommendationsComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
