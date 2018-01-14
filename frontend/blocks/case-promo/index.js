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

    this.loader = $(`<div class="player-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> 
    </div>`)

    this.playerClose = $('<div>');
    this.playerClose.addClass('player-close');
    this.playerCloseIcon = $('<div>');
    this.playerCloseIcon.addClass('player-close__icon');
    this.playerClose.append(this.playerCloseIcon);

    this.playerOverlay.append(this.playerClose);
    this.wrapper.append(playerEl);
    this.wrapper.append(this.playerOverlay);
    this.wrapper.append(this.loader);
    this.body.append(this.wrapper);
    this.closeSize = this.playerClose.height() / 2;

    TweenMax.set(this.wrapper, { autoAlpha: 0 });
    TweenMax.set(playerEl, { autoAlpha: 0 });

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
        TweenMax.to(this.playerClose, 0.3, { scale: 1, ease: Power2.easeOut });
        TweenMax.from(this.playerCloseIcon, 0.3, { autoAlpha: 0, delay: 0.3, ease: Power2.easeOut });
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
      info: false,
      modestBranding: true,
      related: false,
    });

    let created = false;

    player.load('v8HxC9mr1vE');

    window['domModules'].loader.start();

    player.on('playing', () => {
      if (!created) {
        created = true;
        player.setVolume(0);

        setTimeout(() => {
          window['domModules'].loader.done();
          
          let timer;
          let loaderLines = $('.player-loader').children('div');
          let loaderLinesShowPosition = [loaderLines.eq(2), loaderLines.eq(0), loaderLines.eq(1), loaderLines.eq(3), loaderLines.eq(4)]
          const tl = new TimelineMax({
          });
          tl.set(this.wrapper, { autoAlpha: 1 }, 0);
          tl.staggerFrom(loaderLinesShowPosition, 0.3, { xPercent: '100%', ease: Power2.easeOut }, 0.1);
          tl.set(this.wrapper.find('iframe'), { autoAlpha: 1 });
          tl.addCallback(() => {
            player.seek(0);
            timer = setInterval(() => {
              player.seek(0);
            }, 10);
          })
          tl.staggerTo(loaderLinesShowPosition, 0.3, { xPercent: '-100%', ease: Power2.easeIn }, 0.1);
          tl.addCallback(() => {
            clearInterval(timer);
            player.setVolume(100);
          }, 1.2);

        }, 2000);
      }
    });

    player.on('ended', () => {
      this.removeVideo();
    })

    disableScroll();

    this.routerSubscription = Router.events.subscribe((e) => {
      if (e && e.name === 'transitionCompleted' && e.current.name !== 'case') {
        this.removeVideo();
        if (this.routerSubscription) {
          this.routerSubscription.unsubscribe();
        }
      }
    });

  },
  removeVideo() {
    TweenMax.to(this.wrapper, 0.5, { autoAlpha: 0, ease: Power2.easeInOut, onComplete: () => {
      enableScroll();
      this.hasActiveVideo = false;
      this.wrapper.remove();
    }});
  }
};
