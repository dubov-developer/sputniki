import Barba from 'barba.js';
import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function ServicesEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax({
      onComplete: resolve
    });

    const service = $('.service').eq(0);
    const header = service.find('.service__header');
    const actionLine = service.find('.action-line');

    tl.from(header, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.3);
    tl.from(actionLine, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.7);
  })
}
