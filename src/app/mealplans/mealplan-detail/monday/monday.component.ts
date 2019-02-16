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
    const sections: NodeListOf<Element> = document.querySelectorAll('.meals__container');
    const toggleButton = document.getElementById(id).querySelector('.indicator');
    console.log(toggleButton);
    sections.forEach(section => {
      if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        toggleButton.classList.remove('closed');
      } else {
        section.classList.add('hidden');
        toggleButton.classList.add('closed');
      }
    });
  }

}
