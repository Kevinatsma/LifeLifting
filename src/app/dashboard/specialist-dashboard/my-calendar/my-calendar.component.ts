import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';

@Component({
  selector: 'app-my-calendar-component',
  styleUrls: ['./my-calendar.component.scss'],
  templateUrl: './my-calendar.component.html',
})

export class MyCalendarComponent implements OnInit {

  constructor( public auth: AuthService) {}



  ngOnInit() {
  }
}
