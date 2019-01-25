import { Component, OnInit, Input } from '@angular/core';
import { Guideline } from '../../guidelines/guideline.model';

@Component({
  selector: 'app-guideline-item',
  templateUrl: './guideline-item.component.html',
  styleUrls: ['./guideline-item.component.scss']
})
export class GuidelineItemComponent implements OnInit {
  @Input() guideline: Guideline;

  constructor() { }

  ngOnInit() {
  }

}
