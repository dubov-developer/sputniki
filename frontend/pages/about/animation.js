import $ from 'jquery';
import { TimelineMax, Power1, Power2, Power4 } from 'gsap';

export function AboutEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const section = $('.page_about');
    const title = section.find('.title');
    const description = section.find('.description');

    tl.from(title, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.3);
    tl.from(description, 0.7, { yPercent: 10, autoAlpha: 0, ease: Power1.easeOut }, 0.7);
  })
}
