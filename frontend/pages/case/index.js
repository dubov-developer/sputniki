import './style.styl';
import Barba from 'barba.js';
import { CaseEnterAnimation } from './animation';
import { hover } from '../../js/hover.js';
import scrollbarObject from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power2, Linear } from 'gsap';

const throttle = require('throttle-debounce/throttle');

let scenes = [];

let onScrollFn;
let onScrollEnd;
var Casepage = Barba.BaseView.extend({
  namespace: 'case',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    CaseEnterAnimation().then(() => {
      scrollbarObject.initTargets();
      scrollbarObject.enableScroll();
    });

    setTimeout(() => {
      let scrollOnTheEnd = 0

      onScrollEnd = () => {
        ++scrollOnTheEnd;
        if (scrollOnTheEnd >= 5) {
          const href = $('.case-next').attr('href');
          Barba.Pjax.goTo(href);
        }
      }

      onScrollEnd = throttle(300, onScrollEnd)

      onScrollFn = (e) => {
        if (e.offset.y == e.limit.y) {
          document.querySelector('.custom-scroll').addEventListener('wheel', onScrollEnd);
        } else {
          scrollOnTheEnd = 0;
          document.querySelector('.custom-scroll').removeEventListener('wheel', onScrollEnd);
        }
      }

      scrollbarObject.addListener(onScrollFn);

      const tlpromo = new TimelineLite();
      const tlpromoWch = willChange(tlpromo);
      const promo = $('.case-promo');

      tlpromoWch.to(promo, 0.8, { autoAlpha: 0,  ease: Power2.easeInOut }, 0);
  
      let promoScene = scrollmagic.scene({
        triggerElement: $('.case-promo')[0],
        triggerHook: 1,
        duration: '100%',
        offset: '80%',
      }, tlpromo);
  
      scenes.push(promoScene);

      $('.case-fact, .case-description').each((index, el) => {
        const tl = new TimelineLite();
        const tlWch = willChange(tl);

        tlWch.from(el, 0.8, { autoAlpha: 0,  ease: Power2.easeInOut }, 0);

        let scene = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 0.9,
          duration: '50%',
        }, tl);

        scenes.push(scene);
      });


      const tlLine = new TimelineLite();
      const tlLineWch = willChange(tlLine);
      const separator = $('.case-info__separator');
      tlLineWch.to(separator, 0.5, { startAt: { scaleY: 0, transformOrigin: '50% 0%' }, immediateRender: true, scaleY: 1, ease: Linear.easeNone }, 0);
  
      let lineScene = scrollmagic.scene({
        triggerElement: $('.case-info')[0],
        triggerHook: 0.8,
        duration: $('.case-info').height(),
      }, tlLine);
  
      scenes.push(lineScene);


      const tlSlider = new TimelineLite();
      const tlSliderWch = willChange(tlSlider);
      const slider = $('.case-slider__wrapper');
      const pagination = $('.case-slider__pagination');

      tlSlider.from(slider, 0.8, { autoAlpha: 0,  ease: Power2.easeInOut }, 0);
      tlSlider.from(pagination, 0.8, { autoAlpha: 0,  ease: Power2.easeInOut }, 0);

      let sliderScene = scrollmagic.scene({
        triggerElement: $('.case-slider')[0],
        triggerHook: 0.8,
        duration: $('.case-slider').height(),
      }, tlSlider);
  
      scenes.push(sliderScene);

      const tlnext = new TimelineLite();
      const tlnextWch = willChange(tlnext);
      const next = $('.case-next');

      tlnextWch.from(next, 0.8, { autoAlpha: 0,  ease: Power2.easeInOut }, 0);
  
      let nextScene = scrollmagic.scene({
        triggerElement: $('.case-next')[0],
        triggerHook: 1,
        duration: $('.case-next').height(),
      }, tlnext);
  
      scenes.push(nextScene);
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

    scrollbarObject.removeListener(onScrollFn);
    document.querySelector('.custom-scroll').removeEventListener('wheel', onScrollEnd);
  }
});

Casepage.init();
