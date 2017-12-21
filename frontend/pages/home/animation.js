import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

export function HomeEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();
    const item = $('.promo__item_1');
    const socialIcons = $('.social-list__link');
    const scrollDown = $('.scroll-down');

    tl.from(item, 1.5, { scale: 0.5, autoAlpha: 0, ease: Power2.easeOut }, 0.5);
    tl.to(scrollDown, 1.5, { autoAlpha: 1, ease: Power2.easeOut }, 2);
  })
}

export function HomeLeaveAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const scrollDown = $('.scroll-down');

    tl.to(scrollDown, 0.5, { autoAlpha: 0, ease: Power2.easeOut }, 0);
  })
}
