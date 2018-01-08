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
    if (event.current === 'case') {
      TweenMax.set(this.el, { autoAlpha: 0 });
    }

    if (event.current !== 'case') {
      TweenMax.set(this.el, { autoAlpha: 1 });
    }
  },
};
