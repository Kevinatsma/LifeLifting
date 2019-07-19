import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation, BasicData } from '../../first-consultation.model';

@Component({
  selector: 'app-first-consult-basic',
  templateUrl: './first-consult-basic.component.html',
  styleUrls: ['./first-consult-basic.component.scss', './../consultation-subviews.scss']
})
export class FirstConsultBasicComponent implements OnInit {
  @Input() firstConsultation: FirstConsultation;
  basicData: BasicData;

  constructor() {
    setTimeout(() => this.basicData = this.firstConsultation.basicData);
  }

  ngOnInit() {
  }

}
