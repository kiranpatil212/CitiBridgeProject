import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserHistoryComponent } from './user-history/user-history.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { FormsModule, NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DashboardService } from "../services/dashboard.service";
import { RecommendationsService } from "../services/recommendations.service";
import { UserHistoryService } from "../services/user-history.service";

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, DropdownModule, TableModule, ChartModule, TabViewModule, ButtonModule,
    FormsModule, ConfirmDialogModule, DialogModule, InputTextModule, MessagesModule, InputSwitchModule, ToastModule, TooltipModule],
  declarations: [SidebarComponent, UserHistoryComponent, RecommendationsComponent],
  providers:[DashboardService, RecommendationsService, UserHistoryService],
  exports: [SidebarComponent]
})
export class ComponentsModule { }
