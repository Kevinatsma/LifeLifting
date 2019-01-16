import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
// import { ChatModule } from './chat/chat.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ChatModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // ChatModule
  ],
  declarations: [
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
