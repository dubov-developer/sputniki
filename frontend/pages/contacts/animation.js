import $ from 'jquery';
import { TimelineMax, Power2, Power4 } from 'gsap';

export function ContactEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const section = $('.section_contacts_1');
    const h1span = section.find('h1 span');
    const h1Background = section.find('h1 .animation-common-block');
    const addressWrapper = section.find('.address__wrapper');
    const contactsInfoLinksWrapper = section.find('.contacts-info-links__wrapper');

    tl.from(h1span, 0.7, { yPercent: 100, ease: Power4.easeOut }, 0.3);
    tl.from(addressWrapper, 0.7, { yPercent: 100, ease: Power4.easeOut }, 0.5);
    tl.from(contactsInfoLinksWrapper, 0.7, { yPercent: 100, ease: Power4.easeOut }, 0.9);
  })
}
