import { FuncService } from './services/func.service';
import { ToastService } from './services/toast.service';
import { UiService } from './services/ui.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoaderComponent } from './misc/loader/loader.component';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './misc/sidenav/sidenav.component';
import { NavbarComponent } from './misc/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authmain/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsComponent } from './subpages/settings/settings.component';
import { VideosComponent } from './subpages/videos/videos.component';
import { HealthCentersComponent } from './subpages/health-centers/health-centers.component';
import { FeedsComponent } from './subpages/feeds/feeds.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    LoaderComponent,
    DashboardComponent,
    LoginComponent,
    SettingsComponent,
    VideosComponent,
    HealthCentersComponent,
    FeedsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthGuard, AuthService, UiService, ToastService, FuncService],
  bootstrap: [AppComponent]
})
export class AppModule { }
