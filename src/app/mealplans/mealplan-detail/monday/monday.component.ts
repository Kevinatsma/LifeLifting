import { Component, OnInit, Input } from '@angular/core';
import { MondayFormComponent } from 'src/app/shared/dialogs/add-meal-dialog/monday-form/monday-form.component';

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.scss']
})
export class MondayComponent implements OnInit {
  @Input() monday;

  constructor() { }

  ngOnInit() {
  }

}
