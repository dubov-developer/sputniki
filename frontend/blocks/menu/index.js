import './style.styl';
import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['menu'] = {
  init: function(el) {
    this.el = el;
    this.entryAnimation();
  },

  entryAnimation: function() {
    const tl = new TimelineMax();
    const items = this.el.find('.menu__item');

    tl.staggerFrom(items, 0.5, { autoAlpha: 0, y: -10, ease: Power2.easeInOut }, 0.3);
  }
};
