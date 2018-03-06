import './style.styl';
import Barba from 'barba.js';
import { CasesEnterAnimation } from './animation';
import { hover } from '../../js/hover.js';
import scrollbarObject from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';
import { TimelineLite, Power2 } from 'gsap';

let scenes = [];

var Casespage = Barba.BaseView.extend({
  namespace: 'cases',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    const tlCasesTitle = new TimelineLite();
    const tlCasesTitleWch = willChange(tlCasesTitle);
    const casesTitle = $('.cases__title');

    tlCasesTitleWch.to(casesTitle, 0.8, { opacity: 0, ease: Power2.easeInOut }, 0);
  
    let scene = scrollmagic.scene({
      triggerElement: casesTitle[0],
      triggerHook: 1,
      offset: '75%',
      duration: '35%',
    }, tlCasesTitle);

    scenes.push(scene);

    $('body').one('pageTransitionCompleted', (e, data) => {
      if (data.previous === null || (data.previous && data.previous.name !== 'case')) {
        onTypeChange();
        CasesEnterAnimation().then(() => {
          scrollbarObject.initTargets();
          scrollbarObject.enableScroll();
        });
      } else {
        onTypeChange();
        if (scrollbarObject.scrollbarInstance) {
          scrollbarObject.scrollbarInstance.scrollIntoView($(`[data-case=${data.previous.queryParams.case}]`)[0], {
            offsetTop: 50
          });
        }
        scrollbarObject.initTargets();
        scrollbarObject.enableScroll();
      }
    });

    $('.case-select').on('typeChange', (e) => {
      setTimeout(() => {
        onTypeChange();
      });
    });

    function onTypeChange() {
      if (scenes && scenes.length) {
        scenes.forEach((scene, index) => {
          if (index !== 0) {
            scrollmagic.destroy(scene);
          } 
        });
        scenes = [].concat(scenes[0]);
      } 


      let type = 'All';
      if (location.hash) {
        type = location.hash.slice(1);
      }

      let cases = $('.preview-case').show();

      if (type !== 'All') {
        cases.each((i, e) => {
          const el = $(e);
          const types = el.data('types');
          if (types.indexOf(parseInt(type)) !== -1) {
            el.addClass('active');
          } else {
            el.hide();
          }
        });
        if (scrollbarObject.scrollbarInstance) {
          scrollbarObject.scrollbarInstance.update();
        }
        cases = $('.preview-case.active');
      }

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
    }
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

Casespage.init();
