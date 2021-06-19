import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth.guard";


import {TableModule} from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import {ChartModule} from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DialogModule } from "primeng/dialog";
import {InputTextModule} from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

import {CarouselModule} from 'primeng/carousel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [
    TableModule,
    DropdownModule,
    ChartModule,
    TabViewModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MessagesModule,
    CarouselModule,
    InputSwitchModule,
    ToastModule,
    TooltipModule,
    

    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {}
