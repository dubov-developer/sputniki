import $ from 'jquery';
import { TimelineMax, Power1, Power2, Power4 } from 'gsap';

export function ContactEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const section = $('.section_contacts_1');
    const h1 = section.find('h1');
    const address = section.find('.address');
    const contactsInfoLinks = section.find('.contacts-info-links');

    tl.from(h1, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.3);
    tl.from(address, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.7);
    tl.from(contactsInfoLinks, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 1);
  })
}
