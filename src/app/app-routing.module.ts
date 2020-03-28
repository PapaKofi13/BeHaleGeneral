import { ReportsComponent } from './subpages/reports/reports.component';
import { LivefeedComponent } from './subpages/livefeed/livefeed.component';
import { UsersettingsComponent } from './subpages/usersettings/usersettings.component';
import { TracerComponent } from './subpages/tracer/tracer.component';
import { AnnouncementsComponent } from './subpages/announcements/announcements.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authmain/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent, canActivate: [AuthGuard] },
  { path: "tracer", component: TracerComponent, canActivate: [AuthGuard] },
  { path: "settings", component: UsersettingsComponent, canActivate: [AuthGuard] },
  { path: "livefeed", component: LivefeedComponent, canActivate: [AuthGuard] },
  { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
