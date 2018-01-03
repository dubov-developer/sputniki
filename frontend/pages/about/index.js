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
  },
  onEnterCompleted: function() {
    AboutEnterAnimation();
    // The Transition has just finished.
    setTimeout(() => {
      const facts = $('.fact');

      facts.each((i, el) => {
        const element = $(el);
        const number = element.find('.fact__number');
        const line = element.find('.fact__line');
        const description = element.find('.description');

        const tlShow = new TimelineLite();
        const tlShowWch = willChange(tlShow);
        tlShowWch.from(line, 0.8, { transformOrigin: '0% 50%', scaleX: 0, ease: Power2.easeInOut }, 0);
        tlShow.from(number, 0.8, { autoAlpha: 0, ease: Power2.easeInOut }, 0.2);
        tlShow.from(description, 0.8, { autoAlpha: 0, ease: Power2.easeInOut }, 0.5);

        let sceneShow = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 0.6,
          reverse: false
        }, tlShow);
    
        scenes.push(sceneShow);

        const tlParalax = new TimelineLite();
        const tlParalaxWch = willChange(tlParalax);

        tlParalax.to(number, 0.8, { yPercent: -10, ease: Power2.easeInOut }, 0);
        tlParalax.to(description, 0.8, { yPercent: -100, ease: Power2.easeInOut }, 0);

        let sceneParalax = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 0.75,
          reverse: true,
          duration: '150%'
        }, tlParalax);
    
        scenes.push(sceneParalax);
      });
      
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

