import Barba from 'barba.js';
import $ from 'jquery';
import { preloadImages } from './js/image-preloader';
import { disableScroll, scrollbar } from './scroll.js';

export const HideShowTransition = Barba.BaseTransition.extend({
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
