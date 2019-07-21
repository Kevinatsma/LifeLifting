import { trigger, animate, transition, style, state } from '@angular/animations';

export const openClose =

    trigger('openClose', [
        state('open', style({
            'max-height': '1500px',
            opacity: 1,
        })),
        state('closed', style({
            'max-height': '0px',
            opacity: 0,
            display: 'none',
        })),
        transition('open => closed', [
            animate('0.2s'),
        ]),
        transition('closed => open', [
            animate('0.2s')
        ]),
    ]);
