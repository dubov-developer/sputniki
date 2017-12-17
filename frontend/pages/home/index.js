require('./style.styl');
import Barba from 'barba.js';
import { HomeEnterAnimation } from './animation';
import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log('onEnter');
      HomeEnterAnimation();
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
    setTimeout(() => {
      const tl = new TimelineLite();
      const tlWch = willChange(tl);
      const content = document.querySelector('.promo .promo__item');
      tlWch.to(content, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene = scrollmagic.scene({
        triggerElement: '.promo',
        triggerHook: 1,
        offset: '135%',
        duration: '35%',
      }, tl);

      scenes.push(scene);

      const tl2 = new TimelineLite();
      const tlWch2 = willChange(tl2);
      const content2 = document.querySelector('.section_home-description .section__content');
  
      tlWch2.from(content2, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene2 = scrollmagic.scene({
        triggerElement: '.section_home-description',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl2);

      scenes.push(scene2);

      const tl3 = new TimelineLite();
      const tlWch3 = willChange(tl3);
      tlWch3.to(content2, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene3 = scrollmagic.scene({
        triggerElement: '.section_home-description',
        triggerHook: 0,
        offset: '35%',
        duration: '35%',
      }, tl3);

      scenes.push(scene3);


      const tl4 = new TimelineLite();
      const tlWch4 = willChange(tl4);
      const content4 = document.querySelector('.section_home-cases .section__home-cases-image');
  
      tlWch4.from(content4, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene4 = scrollmagic.scene({
        triggerElement: '.section_home-cases',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl4);

      scenes.push(scene4);

      const tl5 = new TimelineLite();
      const tlWch5 = willChange(tl5);
      tlWch5.to(content4, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene5 = scrollmagic.scene({
        triggerElement: '.section_home-cases',
        triggerHook: 0,
        offset: '35%',
        duration: '35%',
      }, tl5);

      scenes.push(scene5);

      const tl6 = new TimelineLite();
      const tlWch6 = willChange(tl6);
      const content6 = document.querySelector('.section_home-hello .section__content');
  
      tlWch6.from(content6, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene6 = scrollmagic.scene({
        triggerElement: '.section_home-hello',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl6);

      scenes.push(scene6);



      const tl7 = new TimelineLite();
      const tlWch7 = willChange(tl7);
      const content7 = document.querySelector('.section_home-slogan .section__content');
  
      tlWch7.from(content7, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene7 = scrollmagic.scene({
        triggerElement: '.section_home-slogan',
        triggerHook: 0.5,
        offset: '15%',
        duration: '35%',
      }, tl7);

      scenes.push(scene7);

      const tl8 = new TimelineLite();
      const tlWch8 = willChange(tl8);
      tlWch8.to(content7, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
      let scene8 = scrollmagic.scene({
        triggerElement: '.section_home-slogan',
        triggerHook: 0,
        offset: '35%',
        duration: '35%',
      }, tl8);

      scenes.push(scene8);

      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 0.5, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.section_home-hello',
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
Homepage.init();

