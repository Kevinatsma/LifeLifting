import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation, GeneralData } from '../../first-consultation.model';

@Component({
  selector: 'app-first-consult-general',
  templateUrl: './first-consult-general.component.html',
  styleUrls: ['./first-consult-general.component.scss', './../consultation-subviews.scss']
})
export class FirstConsultGeneralComponent implements OnInit {
  @Input() firstConsultation: FirstConsultation;
  generalData: GeneralData;

  constructor() {
    setTimeout(() => {
      this.generalData = this.firstConsultation.generalData;
    });
  }

  ngOnInit() {
  }

}
