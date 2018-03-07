import './style.styl';
import Barba from 'barba.js';
import $ from 'jquery';
import { ContactEnterAnimation } from './animation';
import scrollbarObject from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';
import { adaptive } from '../../js/adaptive.js';
import { TimelineLite, Power1, Power2 } from 'gsap';

let scenes = [];

var Contactpage = Barba.BaseView.extend({
  namespace: 'contacts',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
    ContactEnterAnimation().then(() => {
      scrollbarObject.initTargets();
      scrollbarObject.enableScroll();
    });

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
        triggerHook: adaptive.currentState === 'desktop' ? 0.5 : 1,
        offset: adaptive.currentState === 'desktop' ? '15%' : '0',
        reverse: adaptive.currentState === 'desktop' ? true : false,
      }, tl2);

      scenes.push(scene2);

      if (adaptive.currentState === 'desktop') {
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
      }

      const tl4 = new TimelineLite();
      const tlWch4 = willChange(tl4);
      const section4 = $('.section_contacts-hello');
      const section4h1 = section4.find('h1');
      const button = section4.find('.telegram');
      const buttonBackground = section4.find('.telegram__background');
      const buttonBorderRight = section4.find('.telegram__border_right');
      const buttonBorderLeft = section4.find('.telegram__border_left');
      const buttonText = section4.find('.telegram__text');
      const buttonIcon = section4.find('.telegram__icon');
      const buttonCircle = section4.find('.telegram__circle');
  
      tlWch4.from(section4h1, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0);

      tlWch4.from([buttonBorderLeft, buttonBorderRight], 0.8, { autoAlpha: 0, ease: Power2.easeInOut }, 0.8);
      tlWch4.from(buttonBackground, 0.8, { scaleX: 0, autoAlpha: 0, ease: Power2.easeInOut }, 0.8);
      tlWch4.from(buttonBorderRight, 0.8, { xPercent: -850, ease: Power2.easeInOut }, 0.8);
      tlWch4.from(buttonCircle, 0.5, { scale: 0, ease: Power2.easeInOut }, 1.6);
      tlWch4.from(buttonText, 0.5, { autoAlpha: 0, y: 10, ease: Power2.easeInOut }, 2.1);
      tlWch4.from(buttonIcon, 0.5, { y: 50, x: -50, ease: Power2.easeInOut }, 2.1);

      let scene4 = scrollmagic.scene({
        triggerElement: '.section_contacts-hello',
        triggerHook: adaptive.currentState === 'desktop' ? 0.5 : 1,
        offset: adaptive.currentState === 'desktop' ? '15%' : '0',
        reverse: adaptive.currentState === 'desktop' ? true : false,
      }, tl4);

      scenes.push(scene4);


      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { autoAlpha: 0 }, autoAlpha: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.section_contacts-hello',
        triggerHook: adaptive.currentState === 'desktop' ? 0 : 0.8,
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
