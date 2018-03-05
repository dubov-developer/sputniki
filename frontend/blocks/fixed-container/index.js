import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['fixed-container'] = {
  init: function(el) {
    this.el = el;

    $('body').on('pageTransitionCompleted', (e, data) => {
      this.onPageChange(data);
    });
  },
  onPageChange: function(event) {
    if (event.current && event.current.name === 'case') {
      TweenMax.set(this.el, { autoAlpha: 0 });
    }

    if (event.current && event.current.name !== 'case') {
      TweenMax.set(this.el, { autoAlpha: 1 });
    }
  },
};
