import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function ContactEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const section = $('.section_contacts_1');

    tl.from(section, 1, { autoAlpha: 0, yPercent: '10%', ease: Power2.easeOut }, 0);
  })
}
