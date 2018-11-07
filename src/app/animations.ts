import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([

  animate('0.5s',  style({
    transform: '{{offset}}'
    }))
]);
