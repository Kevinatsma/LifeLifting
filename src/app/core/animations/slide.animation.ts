import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

export const slideTransition = trigger('slideTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
]);
