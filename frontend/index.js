import $ from 'jquery';
window.$ = $;
import { scrollbar } from './scroll';
import './style.styl';
import imageSrc from './images/cream.png'
import printMe from './print.js';
import Barba from 'barba.js';
import { initScroll, initTargets, scrollbar } from './scroll.js';
import { scrollmagic } from './js/scrollmagic.js';
import { hover } from './js/hover.js';

import './blocks/menu/index.js';
import './blocks/logo/index.js';
import './blocks/services/index.js';
import './blocks/case-select/index.js';
import './blocks/social-icon-list/index.js';
import './blocks/promo/index.js';
import './blocks/loader/index.js';

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
  hover.init();
  scrollmagic.init(scrollbar);
});

Barba.Dispatcher.on('newPageReady', function() {
  //your listener
  if (scrollbar) {
    scrollbar.setPosition(0, 0);
  }
  console.log('PAGE READY');
});

Barba.Dispatcher.on('transitionCompleted', function() {
  initDomModules();
  setTimeout(() => {
    // из за входной анимации, исправить это
    initTargets();
  }, 1000);

  console.log('COMPLETED');
});

let prevState = null;

Barba.Dispatcher.on('linkClicked', function(el) {
  let splited = el.href.split('/');
  prevState = splited[splited.length - 1].split('.')[0];
});

var HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    window['domModules'].loader.start();
    this.newContainerLoading.then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          window['domModules'].loader.done().then(() => {
            resolve();
          });
        }, 2000);
      });
    }).then(this.finish.bind(this));
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
