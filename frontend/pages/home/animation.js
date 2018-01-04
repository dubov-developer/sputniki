import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import Router from '../../router.js';

export function HomeEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax({
      onComplete: () => {
        resolve();
        Router.events.next({
          name: 'animationCompleted',
          current: Router.Barba.HistoryManager.currentStatus().namespace
        });
      }
    });

    const item = $('.promo__item_1');
    const socialIcons = $('.social-list__link');

    tl.from(item, 1.5, { scale: 0.5, autoAlpha: 0, ease: Power2.easeOut }, 0.5);
  })
}
