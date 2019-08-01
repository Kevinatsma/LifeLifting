import { Component, OnInit, Input } from '@angular/core';
import { Supplementation } from '../../mealplan.model';

@Component({
  selector: 'app-print-supps',
  templateUrl: './print-supps.component.html',
  styleUrls: ['./print-supps.component.scss']
})
export class PrintSuppsComponent implements OnInit {
  @Input() supplementation: Supplementation;

  constructor() { }

  ngOnInit() {

  }

}
