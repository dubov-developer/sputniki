import $ from 'jquery';
import './style.styl';
import { TimelineMax, TweenMax, Power2 } from 'gsap';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['loader'] = {
  init: function(el) {
    this.el = el;
  },
  start: function() {
    TweenMax.to(this.el, 0.2, { scale: 0.333, ease: Power2.easeInOut, onComplete: () => {
      TweenMax.to(this.el, 1, { scale: 1, repeatDelay: 0.2, repeat: -1, yoyo:true, ease: Power2.easeInOut });
    }});
  },
  done: function() {
    return new Promise((resolve) => {
      TweenMax.to(this.el, 0.2, { scale: 1, ease: Power2.easeInOut, onComplete: () => {
        TweenMax.to(this.el, 0.2, { scale: 0, ease: Power2.easeInOut, onComplete: resolve });
      }});
    });
  },
};

