import $ from 'jquery';
import './style.styl';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import { scrollbar } from '../../scroll.js';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['scroll-down'] = {
  isScrollDownVisible: true,
  init: function(el) {
    this.el = el;
    this.onScroll = this.onScroll.bind(this);

    Router.events.subscribe((event) => {
      if (event && event.name === 'animationCompleted' && event.current === 'home') {
        TweenMax.to(this.el, 1.5, { autoAlpha: 1, ease: Power2.easeInOut });
        scrollbar.addListener(this.onScroll);
      }

      if (event && event.name === 'transitionCompleted' && event.previous && event.previous.name === 'home') {
        TweenMax.to(this.el, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
        scrollbar.removeListener(this.onScroll);
      }
    });
  },
  onScroll: function(event) {
    if (event.offset.y > 0 && this.isScrollDownVisible) {
      TweenMax.to(this.el, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
      this.isScrollDownVisible = false;
    }
    if (event.offset.y === 0) {
      TweenMax.to(this.el, 0.5, { autoAlpha: 1, ease: Power2.easeInOut });
      this.isScrollDownVisible = true;
    }
  },
};
