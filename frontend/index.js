import './style.styl';
import imageSrc from './images/cream.png'
import printMe from './print.js';
import Barba from 'barba.js';
import { initScroll } from './scroll.js';

import './blocks/menu/index.js';
import './blocks/logo/index.js';
import './blocks/social-icon/index.js';

import './pages/home/index';
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
})
