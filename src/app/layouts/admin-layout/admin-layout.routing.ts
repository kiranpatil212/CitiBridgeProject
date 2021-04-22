import { Routes } from "@angular/router";

import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { AuthGuard } from "src/app/auth.guard";
import { UserHistoryComponent } from "src/app/components/user-history/user-history.component";
import { RecommendationsComponent } from "src/app/components/recommendations/recommendations.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  // { path: "icons", component: IconsComponent },
  // { path: "maps", component: MapComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "user", component: UserComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "typography", component: TypographyComponent },

  { path:'userhistory', component:UserHistoryComponent},

  { path:'recommendations',  component:RecommendationsComponent},
  // { path: "rtl", component: RtlComponent }
];
