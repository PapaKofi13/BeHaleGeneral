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
import { ReportsComponent } from './subpages/reports/reports.component';
import { TracerComponent } from './subpages/tracer/tracer.component';
import { LivefeedComponent } from './subpages/livefeed/livefeed.component';
import { UsersettingsComponent } from './subpages/usersettings/usersettings.component';
import { AnnouncementsComponent } from './subpages/announcements/announcements.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    LoaderComponent,
    DashboardComponent,
    LoginComponent,
    ReportsComponent,
    TracerComponent,
    LivefeedComponent,
    UsersettingsComponent,
    AnnouncementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
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
