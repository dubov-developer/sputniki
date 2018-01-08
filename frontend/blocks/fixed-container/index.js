import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['fixed-container'] = {
  init: function(el) {
    this.el = el;

    Router.events.subscribe((event) => {
      if (event) {
        this.onPageChange(event);
      }
    });
  },
  onPageChange: function(event) {
    if (event.current === 'case' && event.previous === null) {
      TweenMax.set(this.el, { autoAlpha: 0, x: 0});
    }

    if (event.current === 'case' && event.previous !== null) {
      console.log('SU');
      TweenMax.to(this.el, 0.5, { autoAlpha: 0, x: -50, ease: Power2.easeInOut });
    }

    if (event.current !== 'case') {
      TweenMax.set(this.el, { autoAlpha: 1, x: 0 });
    }
  },
};
