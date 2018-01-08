import $ from 'jquery';
import { TimelineMax, Power1, Power2 } from 'gsap';
import getViewport from 'getviewport';

export function CaseEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax({
      onComplete: resolve,
    });
    tl.from($('.case'), 0.5, { autoAlpha: 0, y: -50 });
  })
}
