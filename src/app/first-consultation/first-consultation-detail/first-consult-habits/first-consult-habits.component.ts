import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation, Habits } from '../../first-consultation.model';

@Component({
  selector: 'app-first-consult-habits',
  templateUrl: './first-consult-habits.component.html',
  styleUrls: ['./first-consult-habits.component.scss', './../consultation-subviews.scss']
})
export class FirstConsultHabitsComponent implements OnInit {
  @Input() firstConsultation: FirstConsultation;
  habits: Habits;

  constructor() {
    setTimeout(() => this.habits = this.firstConsultation.habits);
  }

  ngOnInit() {
  }

}