import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const FadeIn = trigger('fadeIn', [
    transition(':enter', [
        query(':enter', [
            style({ opacity: 0 }),
            stagger('50ms', [
                animate('250ms', style({ opacity: 1 }))
            ])
        ])
    ])
]);
