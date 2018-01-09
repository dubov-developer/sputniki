import './style.styl';
import Barba from 'barba.js';
import { CasesEnterAnimation } from './animation';
import { hover } from '../../js/hover.js';
import { scrollbar, disableScroll, enableScroll } from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';
import Router from '../../router.js';
import { TimelineLite, Power2 } from 'gsap';

let scenes = [];
let routerSubscription;

var Casespage = Barba.BaseView.extend({
  namespace: 'cases',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    setTimeout(() => {
      routerSubscription = Router.events.subscribe((e) => {
        if (e && e.name === 'transitionCompleted') {
          if (e.previous === null || (e.previous && e.previous.name !== 'case')) {
            CasesEnterAnimation().then(() => {
              enableScroll();
            });
          } else {
            scrollbar.scrollIntoView($(`[data-case=${e.previous.queryParams.case}]`)[0], {
              offsetTop: 50
            });
            enableScroll();
          }
        }
      });
      const cases = $('.preview-case');

      cases.on('mouseenter', () => {
        hover.enter();
      });

      cases.on('mouseleave', () => {
        hover.leave();
      });

      cases.on('click', () => {
        hover.leave();
      });

      cases.each((index, elem) => {
        const tl = new TimelineLite();
        const tlWch = willChange(tl);
        const animation = $(elem).find('.preview-case__animation');
        tlWch.to(animation, 0.5, { xPercent: 100, ease: Power2.easeOut }, 0);
    
        let scene = scrollmagic.scene({
          triggerElement: elem,
          triggerHook: 0.9,
        }, tl);
    
        scenes.push(scene);
      });
    });
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
    if (routerSubscription) {
      routerSubscription.unsubscribe();
    }

    if (scenes.length) {
      scenes.forEach((scene) => {
        scrollmagic.destroy(scene);
      });
      scenes = [];
    }
  }
});

Casespage.init();
