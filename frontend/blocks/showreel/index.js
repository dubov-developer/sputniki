import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import Router from '../../router.js';
import getViewport from 'getviewport';
import { hover } from '../../js/hover.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['showreel'] = {
  init: function(el) {
    this.el = el;

    el.on('mouseenter', () => {
      hover.enter();
    });

    el.on('mouseleave', () => {
      hover.leave();
    });

    el.on('click', () => {
      hover.leave();
    });
  },
};
