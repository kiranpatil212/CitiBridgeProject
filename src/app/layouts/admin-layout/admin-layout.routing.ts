import { Routes } from "@angular/router";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

import { AuthGuard } from "src/app/auth.guard";
import { UserHistoryComponent } from "src/app/components/user-history/user-history.component";
import { RecommendationsComponent } from "src/app/components/recommendations/recommendations.component";


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userhistory', component: UserHistoryComponent },
  { path: 'recommendations', component: RecommendationsComponent },
];
