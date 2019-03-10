import { trigger, animate, transition, style, state } from '@angular/animations';

export const openClose =

    trigger('openClose', [
        state('open', style({
            height: '100%',
            opacity: 1,
        })),
        state('closed', style({
            height: '0px',
            opacity: 0,
            display: 'none',
        })),
        transition('open => closed', [
            animate('0.2s'),
        ]),
        transition('closed => open', [
            animate('0.3s')
        ]),
    ]);
