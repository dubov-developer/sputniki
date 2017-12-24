import './style.styl';
import Barba from 'barba.js';
import { CasesEnterAnimation } from './animation';

import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Casespage = Barba.BaseView.extend({
  namespace: 'casespage',
  onEnter: function() {
    CasesEnterAnimation();
  },
  onEnterCompleted: function() {

    setTimeout(() => {
      const cases = $('.preview-case');

      cases.each((index, elem) => {
        const tl = new TimelineLite();
        const tlWch = willChange(tl);
        const animation = $(elem).find('.preview-case__animation');
        tlWch.to(animation, 0.5, { xPercent: 100, ease: Power2.easeOut }, 0);
    
        let scene = scrollmagic.scene({
          triggerElement: elem,
          triggerHook: 0.9,
        }, tl);
    
        scenes.push(scene);
      });
    });
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
    if (scenes.length) {
      scenes.forEach((scene) => {
        scrollmagic.destroy(scene);
      });
      scenes = [];
    }
  }
});

Casespage.init();
