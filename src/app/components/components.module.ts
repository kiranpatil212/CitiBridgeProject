import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserHistoryComponent } from './user-history/user-history.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { FormsModule, NgForm } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, DropdownModule, TableModule, ChartModule, ButtonModule,
    FormsModule, ConfirmDialogModule, DialogModule, InputTextModule, MessagesModule, InputSwitchModule, TooltipModule, ProgressSpinnerModule, ToastModule],
  declarations: [SidebarComponent, UserHistoryComponent, RecommendationsComponent],
  exports: [SidebarComponent]
})
export class ComponentsModule { }
