import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.scss']
})
export class MondayComponent implements OnInit {
  @Input() monday;
  @Input() mealTimes;

  constructor() {
   }

  ngOnInit() {
  }

  toggleSection(e) {
    const id = e.target.parentNode.getAttribute('id');
    const targetSection = document.querySelector(`.${id}`);
    const toggleButton = document.getElementById(id).querySelector('.indicator');

    if (targetSection.classList.contains('hidden')) {
      if (targetSection.classList.contains(id)) {
        targetSection.classList.remove('hidden');
        toggleButton.classList.remove('closed');
      }
    } else {
      targetSection.classList.add('hidden');
      toggleButton.classList.add('closed');
    }
  }
}
