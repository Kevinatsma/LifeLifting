import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { BookingModule } from './../booking/booking.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BookingModule,
    TranslateModule
  ],
  declarations: [
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
