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
  hasActiveVideo: false,
  init(el) {
    el.on('click', () => {
      if (!this.hasActiveVideo) {
        this.createVideo();
        this.hasActiveVideo = true;
      }
    });
  },
  createVideo() {
    this.closeVisible = false;
    this.body = $('body');
    this.wrapper = $('<div>');
    this.wrapper.addClass('player-wrapper');
    const playerEl = $('<div>');
    playerEl.addClass('player');
    playerEl.attr('id', 'player');

    this.playerOverlay = $('<div>');
    this.playerOverlay.addClass('player-overlay');

    this.playerClose = $('<div>');
    this.playerClose.addClass('player-close');

    this.playerOverlay.append(this.playerClose);
    this.wrapper.append(playerEl);
    this.wrapper.append(this.playerOverlay);
    this.body.append(this.wrapper);
    this.closeSize = this.playerClose.height() / 2;

    TweenMax.set(this.wrapper, { autoAlpha: 0, scale: 0.5 });

    this.playerOverlay.on('mouseleave', (e) => {
      this.closeVisible = false;
      TweenMax.to(this.playerClose, 0.5, { scale: 0, ease: Power2.easeOut });
    });

    this.playerOverlay.on('mousemove', (e) => {
      const top = e.pageY - this.closeSize;
      const left = e.pageX - this.closeSize;

      this.playerClose.css({
        top,
        left
      });

      if (!this.closeVisible) {
        TweenMax.to(this.playerClose, 0.5, { scale: 1, ease: Power2.easeOut });
        this.closeVisible = true;
      }
    });

    this.playerOverlay.on('click', () => {
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

    window['domModules'].loader.start();

    player.on('playing', () => {
      window['domModules'].loader.done();
      TweenMax.to(this.wrapper, 0.8, { autoAlpha: 1, scale: 1, ease: Power2.easeInOut });
    });

    player.on('ended', () => {
      this.removeVideo();
    })

    disableScroll();
  },
  removeVideo() {
    TweenMax.to(this.wrapper, 0.5, { autoAlpha: 0, scale: 0.5, ease: Power2.easeInOut, onComplete: () => {
      enableScroll();
      this.hasActiveVideo = false;
      this.wrapper.remove();
    }});
  }
};
