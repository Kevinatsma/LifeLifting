import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wednesday',
  templateUrl: './wednesday.component.html',
  styleUrls: ['./../monday/monday.component.scss']
})
export class WednesdayComponent implements OnInit {
  @Input() wednesday;
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
