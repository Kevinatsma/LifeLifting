import { trigger, animate, transition, style, query } from '@angular/animations';

export const slideUpDownAnimation =
    trigger('slideUpDown', [
        transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
    ]);
