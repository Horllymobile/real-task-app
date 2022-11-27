import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild,
  // ...
} from '@angular/animations';

export function fadeInRightAnimation(duration: number) {
  return trigger('fadeInRight', [
    transition('* => *', [
      style({
        transform: 'translateX(-20px)',
        opacity: 0,
      }),
      animate(
        `${duration}ms cubic-bezier(.17,.67,1,.37)`,
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
    ]),
  ]);
}

export const fadeInRight400ms = fadeInRightAnimation(400);
