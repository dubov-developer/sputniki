import './style.styl';
import Barba from 'barba.js';
import $ from 'jquery';
import { AboutEnterAnimation } from './animation';
import scrollbarObject from '../../scroll';
import { scrollmagic } from '../../js/scrollmagic.js';
import { willChange } from '../../js/gsap-helpers';

import { TimelineLite, Power1, Power2 } from 'gsap';

let scenes = [];

var Aboutpage = Barba.BaseView.extend({
  namespace: 'about',
  onEnter: function() {
  },
  onEnterCompleted: function() {
    AboutEnterAnimation().then(() => {
      scrollbarObject.initTargets();
      scrollbarObject.enableScroll();
    });
    // The Transition has just finished.
    setTimeout(() => {
      const tlTitle = new TimelineLite();
      const tlTitleWch = willChange(tlTitle);
      const title = $('.page__content .title').eq(0);

      tlTitleWch.to(title, 0.8, { opacity: 0, ease: Power1.easeOut }, 0);
    
      let sceneTitle = scrollmagic.scene({
        triggerElement: title[0],
        triggerHook: 1,
        offset: '85%',
        duration: '35%',
      }, tlTitle);

      scenes.push(sceneTitle);

      const tlDescription = new TimelineLite();
      const tlDescriptionWch = willChange(tlDescription);
      const description = $('.page__content .description').eq(0);

      tlTitleWch.to(description, 0.8, { opacity: 0, ease: Power1.easeOut }, 0);
    
      let sceneDescription = scrollmagic.scene({
        triggerElement: description[0],
        triggerHook: 1,
        offset: '50%',
        duration: '85%',
      }, tlDescription);

      scenes.push(sceneDescription);

      const facts = $('.fact');

      facts.each((i, el) => {
        const element = $(el);
        const number = element.find('.fact__number');
        const description = element.find('.description');

        const tlShowNumber = new TimelineLite();
        const tlShowNumberWch = willChange(tlShowNumber);
        tlShowNumberWch.from(number, 0.8, { autoAlpha: 0, ease: Power2.easeInOut }, 0);

        let sceneNumberShow = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 0.6,
          reverse: true,
          duration: '60%'
        }, tlShowNumber);
    
        scenes.push(sceneNumberShow);

        const tlShowDescription = new TimelineLite();
        const tlShowDescriptionWch = willChange(tlShowDescription);
        tlShowDescriptionWch.from(description, 0.5, { autoAlpha: 0, ease: Power2.easeInOut }, 0);

        let sceneDescriptionShow = scrollmagic.scene({
          triggerElement: el,
          triggerHook: 0.35,
          reverse: true,
        }, tlShowDescription);
    
        scenes.push(sceneDescriptionShow);

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

      const ratings = $('.ratings');
      const ratingsTitle = ratings.find('.ratings__title');
      const ratingsBackground = ratings.find('.ratings__background-block');
      const ratingsItems = ratings.find('.ratings__item');
      const tlRating = new TimelineLite();
      const tlRatingWch = willChange(tlRating);

      tlRatingWch.from(ratingsTitle, 0.8, { autoAlpha: 0, yPercent: 20, ease: Power1.easeOut }, 0);

      let sceneRatingTitle = scrollmagic.scene({
        triggerElement: ratings[0],
        triggerHook: 0.5,
        reverse: true
      }, tlRating);
  
      scenes.push(sceneRatingTitle);

      const tlRatingGroup = new TimelineLite();
      const tlRatingGroupWch = willChange(tlRatingGroup);

      tlRatingGroupWch.from(ratingsBackground, 0.8, { autoAlpha: 0, y: 20, ease: Power1.easeOut }, 0);
      tlRatingGroupWch.staggerFrom(ratingsItems, 0.8, { autoAlpha: 0, ease: Power1.easeOut }, 0.1, 0.8);

      let sceneRatingGroup = scrollmagic.scene({
        triggerElement: ratings[0],
        offset: '20%',
        triggerHook: 0.5,
        reverse: true
      }, tlRatingGroup);
  
      scenes.push(sceneRatingGroup);

      const tlcopy = new TimelineLite();
      const tlcopyWch = willChange(tlcopy);
      const copy = document.querySelector('.copyright');
      tlcopyWch.to(copy, 1, { startAt: { autoAlpha: 0 }, autoAlpha: 1, ease: Power2.easeInOut, immediateRender: true }, 0.1);
      
      let sceneCopy = scrollmagic.scene({
        triggerElement: '.copy-trigger',
        triggerHook: 1,
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

