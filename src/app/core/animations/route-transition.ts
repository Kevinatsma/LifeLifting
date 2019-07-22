import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ opacity: '0' }),
        animate('1s ease', style({ opacity: '1' }))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: '1' }),
        animate('0.35s ease', style({ opacity: '0' }))
      ], { optional: true }),
    ])
  ])
]);
