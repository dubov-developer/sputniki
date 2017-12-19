import $ from 'jquery';
window.$ = $;
import { scrollbar } from './scroll';
import './style.styl';
import imageSrc from './images/cream.png'
import printMe from './print.js';
import Barba from 'barba.js';
import { initScroll, initTargets, scrollbar } from './scroll.js';
import { scrollmagic } from './js/scrollmagic.js';
import './blocks/menu/index.js';
import './blocks/logo/index.js';
import './blocks/services/index.js';
import './blocks/social-icon-list/index.js';

import './pages/home/index';
import './pages/about/index';
import './pages/services/index';
import './pages/contacts/index';
import './pages/cases/index';

import { initDomModules } from './js/common.js';

function component() {
  var element = document.createElement('div');

  element.innerHTML = 'Hello';
  element.classList.add('hello');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = imageSrc;

  element.appendChild(myIcon);

  element.onclick = () => {
    getAsyncComponent().then((component) => {
      document.body.appendChild(component);
    });
  };

  return element;
}

function getAsyncComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  });
}
document.addEventListener("DOMContentLoaded", function() {
  Barba.Pjax.start();
  initDomModules();
  initScroll();
  scrollmagic.init(scrollbar);
});

Barba.Dispatcher.on('newPageReady', function() {
  //your listener
  if (scrollbar) {
    scrollbar.setPosition(0, 0);
  }
});

Barba.Dispatcher.on('transitionCompleted', function() {
  console.log('transitionCompleted');
  initDomModules();
  setTimeout(() => {
    // из за входной анимации, исправить это
    initTargets();
  }, 1000);
});
