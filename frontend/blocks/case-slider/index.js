import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import { hover } from '../../js/hover.js';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-slider'] = {
  init: function(el) {
    el.slick({
      arrows: false
    });
  }
};
