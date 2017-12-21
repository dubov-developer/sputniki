import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function HomeEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();
    const item = $('.promo__item_1');
    const socialIcons = $('.social-list__link');

    tl.from(item, 1.5, { scale: 0.5, autoAlpha: 0, ease: Power2.easeOut }, 0);
  })
}
