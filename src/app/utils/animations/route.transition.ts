import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          transform: 'translateX(100%)',
          display: 'none',
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'translateX(0)', display: 'block' }),
        animate(
          '300ms 100ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(-100%)',
            display: 'none',
          })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '300ms 100ms ease-in',
          style({
            opacity: 1,
            transform: 'translateX(0)',
            display: 'block',
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
