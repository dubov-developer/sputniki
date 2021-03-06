const $ = require('jquery');
window.$ = window.jQuery = $;
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick.js');

const FontFaceObserver = require('fontfaceobserver');
import { contentLoaded } from 'document-promises';

import './style.styl';
import Barba from 'barba.js';
import scrollbarObject from './scroll.js';

import { hover } from './js/hover.js';
import { initDomModules } from './js/common.js';
import { HideShowTransition } from './transitions';
import { adaptive } from './js/adaptive';

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
import './blocks/video/index.js';
import './blocks/video-preview/index.js';
import './blocks/mobile-header/index.js';
import './blocks/percantage-loader/index.js';

import './pages/home/index';
import './pages/about/index';
import './pages/services/index';
import './pages/contacts/index';
import './pages/cases/index';
import './pages/case/index';

const fontsWeights = [200, 300, 400, 500, 600];

const fontPromise = fontsWeights.map((weight) => {
  return new FontFaceObserver('Graphik LCG', {
    weight,
  }).load();
})

domModules['base-layout'].init($('html'));
$('html').addClass('inited');

Promise.all(fontPromise.concat(contentLoaded)).then(() => {
  domModules['percantage-loader'].init($('.percantage-loader'));
  $('.percantage-loader').addClass('inited');
})

$('body').on('percentage-loader-complete', () => {
  
  console.log('END!!!');
  Barba.Pjax.start();
  initDomModules();

  if (adaptive.currentState === 'desktop') {
    hover.init();
  }
});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {
  const currentQueryIndex = currentStatus.url.indexOf('?');
  const currentQueryParams = currentQueryIndex !== -1 ? parseQuery(currentStatus.url.slice(currentQueryIndex)) : {};
  let previousQueryIndex;
  let previousQueryParams;
  let previous = null;
  if (prevStatus) {
    previousQueryIndex = prevStatus.url.indexOf('?');
    previousQueryParams = previousQueryIndex !== -1 ? parseQuery(prevStatus.url.slice(previousQueryIndex)) : {};
    previous = {
      name: prevStatus.namespace,
      queryParams: previousQueryParams
    }
  }

  initDomModules();

  setTimeout(() => {
    $('body').trigger('pageTransitionCompleted', {
      current: {
        name: currentStatus.namespace,
        queryParams: currentQueryParams
      },
      previous
    });
  });
});

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
