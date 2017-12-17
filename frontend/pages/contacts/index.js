import './style.styl';
import Barba from 'barba.js';

import { ContactEnterAnimation } from './animation';
import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Contactpage = Barba.BaseView.extend({
  namespace: 'contactspage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      ContactEnterAnimation();
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
    setTimeout(() => {
      const tl = new TimelineLite();
      const tlWch = willChange(tl);
      const content = document.querySelector('.section_contacts_1 .section__content');
      tlWch.to(content, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene = scrollmagic.scene({
        triggerElement: '.section_contacts_1',
        triggerHook: 1,
        offset: '135%',
        duration: '35%',
      }, tl);

      scenes.push(scene);


      const tl2 = new TimelineLite();
      const tlWch2 = willChange(tl2);
      const content2 = document.querySelector('.section_contacts_2 .section__content');
  
      tlWch2.from(content2, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene2 = scrollmagic.scene({
        triggerElement: '.section_contacts_2',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl2);

      scenes.push(scene2);

      const tl3 = new TimelineLite();
      const tlWch3 = willChange(tl3);
      tlWch3.to(content2, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene3 = scrollmagic.scene({
        triggerElement: '.section_contacts_2',
        triggerHook: 0,
        offset: '35%',
        duration: '35%',
      }, tl3);

      scenes.push(scene3);


      const tl4 = new TimelineLite();
      const tlWch4 = willChange(tl4);
      const content4 = document.querySelector('.section_contacts-hello .section__content');
  
      tlWch4.from(content4, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene4 = scrollmagic.scene({
        triggerElement: '.section_contacts-hello',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl4);

      scenes.push(scene4);


      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.section_contacts-hello',
        triggerHook: 0,
      }, tlcopy);

      scenes.push(sceneCopy);

    })
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
Contactpage.init();
