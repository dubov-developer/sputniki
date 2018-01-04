import './style.styl';
import Barba from 'barba.js';
import { ServicesEnterAnimation } from './animation';

import { scrollbar, enableScroll } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Servicespage = Barba.BaseView.extend({
  namespace: 'services',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    ServicesEnterAnimation().then(() => {
      enableScroll();
    });

    setTimeout(() => {

      $('.service').each((index, el) => {
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

      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: $('.service:last-child')[0],
        triggerHook: 0.5,
      }, tlcopy);

      scenes.push(sceneCopy);

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

Servicespage.init();
