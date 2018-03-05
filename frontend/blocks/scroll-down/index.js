import $ from 'jquery';
import './style.styl';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import scrollbarObject from '../../scroll.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['scroll-down'] = {
  isScrollDownVisible: true,
  init: function(el) {
    this.el = el;
    this.onScroll = this.onScroll.bind(this);

    $('body').on('pageAnimationCompleted', (e, data) => {
      if (data && data.current === 'home') {
        if (this.isScrollDownVisible) {
          TweenMax.to(this.el, 1.5, { autoAlpha: 1, ease: Power2.easeInOut });
          scrollbarObject.addListener(this.onScroll);
        }
      }
    })

    $('body').on('pageTransitionCompleted', (e, data) => {
      if (data && data.previous && data.previous.name === 'home') {
        TweenMax.to(this.el, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
        scrollbarObject.removeListener(this.onScroll);
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
