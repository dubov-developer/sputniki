const $ = require('jquery');
window.$ = window.jQuery = $;
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick.js');
import './style.styl';
import Barba from 'barba.js';
import { initScroll, initTargets, disableScroll, scrollbar } from './scroll.js';
import { scrollmagic } from './js/scrollmagic.js';
import { hover } from './js/hover.js';

import './blocks/fixed-container/index.js';
import './blocks/menu/index.js';
import './blocks/logo/index.js';
import './blocks/showreel/index.js';
import './blocks/services/index.js';
import './blocks/case-select/index.js';
import './blocks/social-icon-list/index.js';
import './blocks/promo/index.js';
import './blocks/loader/index.js';
import './blocks/scroll-down/index.js';
import './blocks/case-slider/index.js';
import './blocks/case-promo/index.js';
import './blocks/back/index.js';

import './pages/home/index';
import './pages/about/index';
import './pages/services/index';
import './pages/contacts/index';
import './pages/cases/index';
import './pages/case/index';

import { initDomModules } from './js/common.js';

import Router from './router.js';
import { preloadImages } from './js/image-preloader';

document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.start();
  initDomModules();
  
  
  /* Поставить условие на адаптивку */
  // initScroll();
  // scrollmagic.init(scrollbar);
  /* Поставить условие на адаптивку */
  hover.init();
  Router.init();
});

Barba.Dispatcher.on('newPageReady', function() {
});

Barba.Dispatcher.on('transitionCompleted', function() {
  initDomModules();
  setTimeout(() => {
    // из за входной анимации, исправить это
    initTargets();
  }, 1000);
});

// Потом переделать

$(window).on('resize', () => {
  setTimeout(() => {
    initTargets();
  })
});


let prevState = null;

Barba.Dispatcher.on('linkClicked', function(el) {
  let splited = el.href.split('/');
  prevState = splited[splited.length - 1].split('.')[0];
});

var HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    return new Promise((resolve, reject) => {
      disableScroll();
      let loaderStarted = false;
      const timeout = setTimeout(() => {
        window['domModules'].loader.start();
        loaderStarted = true;
      }, 500);

      this.newContainerLoading.then(() => {

        return Promise.resolve().then(() => {
          if ($(this.newContainer).data('namespace') === 'case') {
            const caseName = $(this.newContainer).data('case');
            const urls = getImageUrlByCaseName(caseName);

            console.log('!', caseName, urls);

            return preloadImages.load(urls);
          }

          if ($(this.newContainer).data('namespace') === 'contacts') {
            return preloadImages.load([
              require('./pages/contacts/assets/pin.png'),
              require('./pages/contacts/assets/pin@2x.png'),
              require('./pages/contacts/assets/pin-hover.png'),
              require('./pages/contacts/assets/pin-hover@2x.png'),
            ])
          }

        }).then(() => {
          return new Promise((resolve) => {
            if (!loaderStarted) {
              clearTimeout(timeout);
              resolve();
            } else {
              window['domModules'].loader.done().then(() => {
                resolve();
              });
            }
          });
        })
      }).then(this.finish.bind(this));
    });
  },

  finish: function() {
    if (scrollbar) {
      scrollbar.setPosition(0, 0);
    }
    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

function getImageUrlByCaseName(caseName) {
  const urls = [];

  if (caseName === 'di-caprio') {
    return [
      require('./pages/case/assets/case-di-caprio.jpg'),
      require('./pages/case/assets/case-di-caprio@2x.jpg')
    ];
  }

  if (caseName === 'abrau-durso') {
    return [
      require('./pages/case/assets/case-abrau-durso.jpg'),
      require('./pages/case/assets/case-abrau-durso@2x.jpg')
    ];
  }

  if (caseName === 'train-moscow') {
    return [
      require('./pages/case/assets/case-train-moscow.jpg'),
      require('./pages/case/assets/case-train-moscow@2x.jpg')
    ];
  }

  if (caseName === 'visa') {
    return [
      require('./pages/case/assets/case-visa.jpg'),
      require('./pages/case/assets/case-visa@2x.jpg')
    ];
  }

  if (caseName === 'egk-ural') {
    return [
      require('./pages/case/assets/case-egk-ural.jpg'),
      require('./pages/case/assets/case-egk-ural@2x.jpg')
    ];
  }

  if (caseName === '5-ozer') {
    return [
      require('./pages/case/assets/case-5-ozer.jpg'),
      require('./pages/case/assets/case-5-ozer@2x.jpg')
    ];
  }

  if (caseName === 'husky') {
    return [
      require('./pages/case/assets/case-husky.jpg'),
      require('./pages/case/assets/case-husky@2x.jpg')
    ];
  }

  if (caseName === 'mageta') {
    return [
      require('./pages/case/assets/case-mageta.jpg'),
      require('./pages/case/assets/case-mageta@2x.jpg')
    ];
  }

  if (caseName === 'julius-meinl') {
    return [
      require('./pages/case/assets/case-julius-meinl.jpg'),
      require('./pages/case/assets/case-julius-meinl@2x.jpg')
    ];
  }

  if (caseName === 'kotex-active') {
    return [
      require('./pages/case/assets/case-kotex-active.jpg'),
      require('./pages/case/assets/case-kotex-active@2x.jpg')
    ];
  }

  return urls;
}
