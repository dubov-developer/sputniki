import './style.styl';
import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['menu'] = {
  init: function(el) {
    this.el = el;
    this.entryAnimation();

    Router.events.subscribe((event) => {
      if (event) {
        this.onPageChange(event);
      }
    });
  },

  onPageChange: function(event) {
    const navigationLinks = this.el.find('.menu__link');
    const navigationLinkIsActive = this.el.find(`[data-name="${event.current.name}"]`);
    navigationLinks.removeClass('active');
    navigationLinkIsActive.addClass('active');
  },
  entryAnimation: function() {
    const tl = new TimelineMax();
    const items = this.el.find('.menu__item');

    tl.staggerFrom(items, 0.5, { autoAlpha: 0, y: -10, ease: Power2.easeInOut }, 0.3);
  }
};

