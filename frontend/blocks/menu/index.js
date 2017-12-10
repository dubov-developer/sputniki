import './style.styl';
import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import Barba from 'barba.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['menu'] = {
  init: function(el) {
    this.el = el;
    this.entryAnimation();

    Barba.Dispatcher.on('newPageReady', this.onPageChange.bind(this));
    this.onPageChange({
      url: window.location.href
    })
  },

  onPageChange: function(currentStatus) {
    const link = currentStatus.url.split(window.location.origin)[1].substring(1);
    const navigationLinks = this.el.find('.menu__link');
    const navigationLinkIsActive = this.el.find(`[href="${link}"]`);
    navigationLinks.removeClass('active');
    navigationLinkIsActive.addClass('active');
  },
  entryAnimation: function() {
    const tl = new TimelineMax();
    const items = this.el.find('.menu__item');

    tl.staggerFrom(items, 0.5, { autoAlpha: 0, y: -10, ease: Power2.easeInOut }, 0.3);
  }
};

