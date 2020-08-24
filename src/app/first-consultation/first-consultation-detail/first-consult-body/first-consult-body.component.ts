import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation, BodyFunctions } from '../../first-consultation.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-first-consult-body',
  templateUrl: './first-consult-body.component.html',
  styleUrls: ['./first-consult-body.component.scss', './../consultation-subviews.scss']
})
export class FirstConsultBodyComponent implements OnInit {
  @Input() firstConsultation: FirstConsultation;
  bodyFunctions: BodyFunctions;
  isFemale: boolean;

  ngOnInit() {
    this.bodyFunctions = _.get(this.firstConsultation, 'bodyFunctions');
    this.isFemale = _.chain(this.firstConsultation).get('basicData.sex').eq('Feminine').value();
  }
}
