import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function ServicesEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const services = $('.services');

    tl.from(services, 1, { autoAlpha: 0, yPercent: '10%', ease: Power2.easeOut }, 0);
  })
}
