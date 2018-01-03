import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LoginComponent } from './pages/login/login.component';
import { UserService } from './services/user/user.service';
import { AboutComponent } from './pages/about/about.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import {RegisterComponent } from './pages/register/register.component';
import { BusinessComponent } from './pages/business/business.component';
import { BusinessService } from './services/business/business.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  { path: '', component: AboutComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'business/:id', component: BusinessComponent},
  {path: 'register', component: RegisterComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SideNavComponent,
    LoginComponent,
    AboutComponent,
    RegisterComponent,
    BusinessComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,
      { enableTracing: true }// <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdDY3V1P4huRW3jhCMbXgClEHn5DB1gcs'
    })
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    BusinessService,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
