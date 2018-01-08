import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import { hover } from '../../js/hover.js';
import Router from '../../router.js';

const YTPlayer = require('yt-player')

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-promo'] = {
  init(el) {
    el.on('click', () => {
      this.createVideo();
    });
  },
  createVideo() {
    this.body = $('body');
    this.wrapper = $('<div>');
    this.wrapper.addClass('.player-wrapper');
    const playerEl = $('<div>');
    playerEl.addClass('.player');
    playerEl.attr('id', 'player');

    const playerOverlay = $('<div>');
    playerOverlay.addClass('.player-overlay');

    this.wrapper.css({
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
      'background-color': '#000'
    });

    playerOverlay.css({
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
    });

    this.wrapper.append(playerEl);
    this.wrapper.append(playerOverlay);
    this.body.append(this.wrapper);

    playerOverlay.on('click', () => {
      this.removeVideo();
    });

    const player = new YTPlayer('#player', {
      width: getViewport().width,
      height: getViewport().height,
      autoplay: true,
      captions: false,
      controls: false,
      related: false,
      info: false,
      modestBranding: false,
      annotations: false,
    });

    player.load('v8HxC9mr1vE');
    disableScroll();
  },
  removeVideo() {
    enableScroll();
    this.wrapper.remove();
  }
};
