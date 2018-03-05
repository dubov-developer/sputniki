import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

import Barba from 'barba.js';

export function HomeEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax({
      onComplete: () => {
        resolve();
        $('body').trigger('pageAnimationCompleted', {
          current: Barba.HistoryManager.currentStatus().namespace
        })
      }
    });

    const item = $('.promo__item_1');
    const socialIcons = $('.social-list__link');

    tl.to(item, 1.5, { startAt: { scale: 0.5, autoAlpha: 0 }, scale: 1, autoAlpha: 1, ease: Power2.easeOut }, 0.5);
  })
}
