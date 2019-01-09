import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// App Modules
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PackagesModule } from './packages/packages.module';
import { BookingModule } from './booking/booking.module';
import { SpecialistModule } from './specialists/specialist.module';

// Core Components

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    SharedModule,
    UserModule,
    DashboardModule,
    PackagesModule,
    BookingModule,
    SpecialistModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
