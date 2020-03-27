import { HealthCentersComponent } from './subpages/health-centers/health-centers.component';
import { FeedsComponent } from './subpages/feeds/feeds.component';
import { SettingsComponent } from './subpages/settings/settings.component';
import { VideosComponent } from './subpages/videos/videos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authmain/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "videos", component: VideosComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "feeds", component: FeedsComponent, canActivate: [AuthGuard] },
  { path: "health-centers", component: HealthCentersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
