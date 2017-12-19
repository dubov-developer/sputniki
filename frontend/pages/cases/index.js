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
