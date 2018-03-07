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

    $('body').on('pageTransitionCompleted', (e, data) => {
      this.onPageChange(data);
    });
  },

  onPageChange: function(event) {
    console.log('=>', event.current.name);
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

