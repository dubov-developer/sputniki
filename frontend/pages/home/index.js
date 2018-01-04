require('./style.styl');
import Barba from 'barba.js';
import { HomeEnterAnimation, HomeLeaveAnimation } from './animation';
import { scrollbar } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, TweenMax, Power2 } from 'gsap';

let scenes = [];
let isScrollDownVisible = true;
let scrolldown;

var Homepage = Barba.BaseView.extend({
  namespace: 'home',
  onEnter: function() {
  },
  onScroll: function(event) {
    if (event.offset.y > 0 && isScrollDownVisible) {
      TweenMax.to(scrolldown, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
      isScrollDownVisible = false;
    }
    if (event.offset.y === 0) {
      TweenMax.to(scrolldown, 0.5, { autoAlpha: 1, ease: Power2.easeInOut });
      isScrollDownVisible = true;
    }
  },
  onEnterCompleted: function() {
      // The Transition has just finished.
    scrolldown = $('.scroll-down');
  
    HomeEnterAnimation();
    
    setTimeout(() => {
      scrollbar.addListener(this.onScroll);
    })
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
      const content2 = $('.section_home-description .section__content');
      const rows = $('.section_home-description p span');
  
      tlWch2.staggerFrom(rows, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.6, 0);

      let scene2 = scrollmagic.scene({
        triggerElement: '.section_home-description',
        triggerHook: 0.5,
        offset: '15%',
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
      const content4 = $('.section_home-cases .section__home-cases-image');
      const rows4 = $('.section_home-cases p span');
      const showCases = $('.section_home-cases .show-cases');

      tlWch4.from(content4, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0);
      tlWch4.staggerFrom(rows4, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.6, 0.8);
      tlWch4.from(showCases, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 1.6);

      let scene4 = scrollmagic.scene({
        triggerElement: '.section_home-cases',
        triggerHook: 0.5,
        offset: '15%',
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

      const tl7 = new TimelineLite();
      const tlWch7 = willChange(tl7);
      const content7 = $('.section_home-slogan .section__content');
      const rows7 = $('.section_home-slogan p span');
      tlWch7.staggerFrom(rows7, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0.6, 0);
  
      let scene7 = scrollmagic.scene({
        triggerElement: '.section_home-slogan',
        triggerHook: 0.5,
        offset: '15%',
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

      const tl6 = new TimelineLite();
      const tlWch6 = willChange(tl6);
      const h26 = $('.section_home-hello h2');
      const contactsInfoLinks6 = $('.section_home-hello .contacts-info-links');
      const button = $('.section_home-hello .telegram');
      const buttonBackground = $('.section_home-hello .telegram__background');
      const buttonBorderRight = $('.section_home-hello .telegram__border_right');
      const buttonBorderLeft = $('.section_home-hello .telegram__border_left');
      const buttonText = $('.section_home-hello .telegram__text');
      const buttonIcon = $('.section_home-hello .telegram__icon');
      const buttonCircle = $('.section_home-hello .telegram__circle');
      tlWch6.from(h26, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 0);

      tlWch6.from([buttonBorderLeft, buttonBorderRight], 0.5, { autoAlpha: 0, ease: Power2.easeInOut }, 0.8);
      tlWch6.from(buttonBackground, 0.7, { scaleX: 0, ease: Power2.easeInOut }, 1);
      tlWch6.from(buttonBorderRight, 0.7, { xPercent: -425, ease: Power2.easeInOut }, 1);
      tlWch6.from(buttonCircle, 0.5, { scale: 0, ease: Power2.easeInOut }, 2);
      tlWch6.from(buttonText, 0.5, { autoAlpha: 0, y: 10, ease: Power2.easeInOut }, 2.5);
      tlWch6.from(buttonIcon, 0.5, { y: 50, x: -50, ease: Power2.easeInOut }, 2.6);

      tlWch6.from(contactsInfoLinks6, 0.8, { yPercent: 100, autoAlpha: 0, ease: Power1.easeOut }, 2.8);
      let scene6 = scrollmagic.scene({
        triggerElement: '.section_home-hello',
        triggerHook: 0.5,
        offset: '15%',
      }, tl6);

      scenes.push(scene6);

      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
  
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.section_home-hello',
        triggerHook: 0,
      }, tlcopy);

      scenes.push(sceneCopy);
    })
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
      HomeLeaveAnimation();
      scrollbar.removeListener(this.onScroll);
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

