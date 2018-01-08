import './style.styl';
import Barba from 'barba.js';
import { CaseEnterAnimation } from './animation';
import { hover } from '../../js/hover.js';
import { scrollbar, disableScroll, enableScroll } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2, Linear } from 'gsap';

let scenes = [];

var Casepage = Barba.BaseView.extend({
  namespace: 'case',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    CaseEnterAnimation().then(() => {
      enableScroll();
    });

    setTimeout(() => {
      const tl = new TimelineLite();
      const tlWch = willChange(tl);
      const separator = $('.case-info__separator');
      tlWch.to(separator, 0.5, { startAt: { scaleY: 0, transformOrigin: '50% 0%' }, immediateRender: true, scaleY: 1, ease: Linear.easeNone }, 0);
  
      let scene = scrollmagic.scene({
        triggerElement: $('.case-info')[0],
        triggerHook: 0.8,
        duration: $('.case-info').height(),
      }, tl);
  
      scenes.push(scene);
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

Casepage.init();
