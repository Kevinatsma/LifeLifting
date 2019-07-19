import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation, BodyFunctions } from '../../first-consultation.model';

@Component({
  selector: 'app-first-consult-body',
  templateUrl: './first-consult-body.component.html',
  styleUrls: ['./first-consult-body.component.scss', './../consultation-subviews.scss']
})
export class FirstConsultBodyComponent implements OnInit {
  @Input() firstConsultation: FirstConsultation;
  bodyFunctions: BodyFunctions;

  constructor() {
    setTimeout(() => this.bodyFunctions = this.firstConsultation.bodyFunctions);
  }

  ngOnInit() {
  }

}
