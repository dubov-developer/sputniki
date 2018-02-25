const $ = require('jquery');
window.$ = window.jQuery = $;
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick.js');
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

import './pages/home/index';
import './pages/about/index';
import './pages/services/index';
import './pages/contacts/index';
import './pages/cases/index';
import './pages/case/index';

import Router from './router.js';

document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.start();
  initDomModules();

  if (adaptive.currentState === 'desktop') {
    hover.init();
  }

  Router.init();
});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

Barba.Dispatcher.on('transitionCompleted', function() {
  $('body').trigger('pageTransitionCompleted');
  initDomModules();
  setTimeout(() => {
    // из за входной анимации, исправить это
    scrollbarObject.initTargets();
  }, 1000);
});

