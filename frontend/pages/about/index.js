import './style.styl';
import Barba from 'barba.js';
import $ from 'jquery';
import { AboutEnterAnimation } from './animation';
import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power1, Power2 } from 'gsap';

let scenes = [];

var Aboutpage = Barba.BaseView.extend({
  namespace: 'aboutpage',
  onEnter: function() {
    AboutEnterAnimation();
  },
  onEnterCompleted: function() {


    // The Transition has just finished.
    setTimeout(() => {
      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.ratings',
        triggerHook: 0,
      }, tlcopy);
  
      scenes.push(sceneCopy);
    });
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
    // The Container has just been removed from the DOM.
  if (scenes.length) {
    scenes.forEach((scene) => {
      scrollmagic.destroy(scene);
    });
    scenes = [];
  }
}
});

// Don't forget to init the view!
Aboutpage.init();

