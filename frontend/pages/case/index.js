import './style.styl';
import Barba from 'barba.js';
import { CaseEnterAnimation } from './animation';
import { hover } from '../../js/hover.js';
import { scrollbar, disableScroll, enableScroll } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Casespage = Barba.BaseView.extend({
  namespace: 'case',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    CasesEnterAnimation().then(() => {
      enableScroll();
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
