import './style.styl';
import Barba from 'barba.js';
import { ServicesEnterAnimation } from './animation';

import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Servicespage = Barba.BaseView.extend({
  namespace: 'servicespage',
  onEnter: function() {
    ServicesEnterAnimation();

    setTimeout(() => {

      $('.service').each((index, el) => {
        console.log('!', el);
        const tl = new TimelineLite();
        const tlWch = willChange(tl);

        tlWch.to(el, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
    
        let scene = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 1,
          offset: '100%',
          duration: '35%',
        }, tl);

        scenes.push(scene);

        if (index !== 0) {
          const tl2 = new TimelineLite();
          const tlWch2 = willChange(tl2);
      
          tlWch2.from(el, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
      
          let scene2 = scrollmagic.scene({
            triggerElement: el,
            triggerHook: 0.5,
            offset: '-20%',
            duration: '35%',
          }, tl2);
    
          scenes.push(scene2);
        }

      });
    });

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

Servicespage.init();
