import './style.styl';
import Barba from 'barba.js';
import $ from 'jquery';
import { ContactEnterAnimation } from './animation';
import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power1, Power2 } from 'gsap';

let scenes = [];

var Contactpage = Barba.BaseView.extend({
  namespace: 'contactspage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
    ContactEnterAnimation();
    setTimeout(() => {
      const tl = new TimelineLite();
      const tlWch = willChange(tl);
      const content = document.querySelector('.section_contacts_1 .section__content');
      tlWch.to(content, 0.8, { opacity: 0, ease: Power1.easeOut }, 0);
  
      let scene = scrollmagic.scene({
        triggerElement: '.section_contacts_1',
        triggerHook: 1,
        offset: '135%',
        duration: '35%',
      }, tl);

      scenes.push(scene);


      const tl2 = new TimelineLite();
      const tlWch2 = willChange(tl2);
      const section2 = $('.section_contacts_2');
      const content2 = section2.find('.section__content');
      const h1 = section2.find('h1');
      const address = section2.find('.address');
      const contactsInfoLinks = section2.find('.contacts-info-links');
  
      tlWch2.from(h1, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.3);
      tlWch2.from(address, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.7);
      tlWch2.from(contactsInfoLinks, 0.7, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 1);

      let scene2 = scrollmagic.scene({
        triggerElement: '.section_contacts_2',
        triggerHook: 0.5,
        offset: '15%',
      }, tl2);

      scenes.push(scene2);

      const tl3 = new TimelineLite();
      const tlWch3 = willChange(tl3);
      tlWch3.to(content2, 0.8, { opacity: 0, ease: Power1.easeOut }, 0);
  
      let scene3 = scrollmagic.scene({
        triggerElement: '.section_contacts_2',
        triggerHook: 0,
        offset: '35%',
        duration: '35%',
      }, tl3);

      scenes.push(scene3);


      const tl4 = new TimelineLite();
      const tlWch4 = willChange(tl4);
      const section4 = $('.section_contacts-hello');
      const section4h1 = section4.find('h1');
      const button = section4.find('.telegram');
      const buttonBackground = section4.find('.telegram__background');
      const buttonBorderRight = section4.find('.telegram__border_right');
      const buttonText = section4.find('.telegram__text');
      const buttonIcon = section4.find('.telegram__icon');
      
      tlWch4.from(section4h1, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0);
      tl4.set(button, { autoAlpha: 1 }, 0.8);
      tlWch4.from(buttonBackground, 0.7, { scaleX: 0, ease: Power1.easeOut }, 0.8);
      tlWch4.from(buttonBorderRight, 0.7, { xPercent: -400, ease: Power1.easeOut }, 0.8);
      tlWch4.from([buttonText, buttonIcon], 0.5, { autoAlpha: 0, ease: Power1.easeOut }, 1.6);
    
      let scene4 = scrollmagic.scene({
        triggerElement: '.section_contacts-hello',
        triggerHook: 0.5,
        offset: '15%',
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
