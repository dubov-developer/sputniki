import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function ContactEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const section = $('.section_contacts_1');
    const h1Background = section.find('h1 .animation-common-block');
    const addressBackground = section.find('.address .animation-common-block');
    const contactsInfoLinksBackground = section.find('.contacts-info-links .animation-common-block');

    tl.to(h1Background, 0.8, { xPercent: 100, ease: Power2.easeOut }, 0.2);
    tl.to(addressBackground, 1.2, { xPercent: 100, ease: Power2.easeOut }, 0.8);
    tl.to(contactsInfoLinksBackground, 1.2, { xPercent: 100, ease: Power2.easeOut }, 1.4);

  })
}
