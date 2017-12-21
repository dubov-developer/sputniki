import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import getViewport from 'getviewport';
import Barba from 'barba.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['promo'] = {
  init: function(el) {
    this.items = el.find('.promo__item');
    this.itemsLength = this.items.length;
    this.currentIndex = 0;

    this.startInterval();

    this.items.on('mouseenter', () => {
      clearInterval(this.invervalId);
    });

    this.items.on('mouseleave', () => {
      this.startInterval();
    });

    Barba.Dispatcher.on('newPageReady', () => {
      clearInterval(this.invervalId);
    });
  },
  startInterval() {
    this.invervalId = setInterval(() => {
      TweenMax.set(this.items[this.currentIndex], { autoAlpha: 0 });
      this.currentIndex++;

      if (this.currentIndex <= this.itemsLength - 1) {
      } else {
        this.currentIndex = 0;
      }

      TweenMax.set(this.items[this.currentIndex], { autoAlpha: 1 });
      
    }, 1000);
  }
};
