import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import scrollbarObject from '../../scroll';
import { hover } from '../../js/hover.js';

const YTPlayer = require('yt-player')

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-promo'] = {
  hasActiveVideo: false,
  init(el) {
    this.window = $(window);
    this.document = $(document);
    this.el = el;
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onFirstPlaying = this.onFirstPlaying.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.onItemMenuClick = this.onItemMenuClick.bind(this);
    this.onControlHide = this.onControlHide.bind(this);
    this.onControlShow = this.onControlShow.bind(this);
    this.videoList = this.el.data('video');

    el.on('click', () => {
      if (!this.hasActiveVideo) {
        this.createVideo();
        this.hasActiveVideo = true;
      }
    });
  },
  createVideo() {
    this.firstVideoLoaded = false;
    this.createHTMLAndInitListeners();
    this.player.load(this.videoList[0].videoId);
    window['domModules'].loader.start();
    this.player.on('playing', this.onFirstPlaying);
    this.activeVideoIndex = 0;
  },
  createHTMLAndInitListeners() {
    this.closeVisible = false;
    this.body = $('body');
    this.wrapper = $('<div>');
    this.wrapper.addClass('player-wrapper');
    this.playerEl = $('<div>');
    this.playerEl.addClass('player');
    this.playerEl.attr('id', 'player');

    this.playerOverlay = $('<div>');
    this.playerOverlay.addClass('player-overlay');

    this.loader = $(`
      <div class="player-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div> 
      </div>
    `);

    this.playerClose = $('<div>');
    this.playerClose.addClass('player-close');
    this.playerCloseIcon = $('<div>');
    this.playerCloseIcon.addClass('player-close__icon');
    this.playerClose.append(this.playerCloseIcon);

    if (this.videoList.length > 1) {
      this.playerMenu = $('<div>');
      this.playerMenu.addClass('player-menu');
      let menuItems = '';
      this.videoList.forEach((item, index) => {
        const className = index === 0 ? 'active' : '';
        menuItems += `<a class="${className}" data-index='${index}' data-video='${item.videoId}'>${item.name}</a>`;
      });
      this.playerMenu.append(menuItems);
    }

    this.playerOverlay.append(this.playerClose);
    this.wrapper.append(this.playerEl);
    this.wrapper.append(this.playerOverlay);
    if (this.videoList.length > 1) {
      this.wrapper.append(this.playerMenu);
    }
    this.wrapper.append(this.loader);
    this.body.append(this.wrapper);
    this.closeSize = this.playerClose.height() / 2;

    TweenMax.set(this.wrapper, { autoAlpha: 0 });
    TweenMax.set(this.playerEl, { autoAlpha: 0 });

    this.playerOverlay.on('mouseleave', (e) => {
      this.closeVisible = false;
      TweenMax.to(this.playerClose, 0.5, { scale: 0, ease: Power2.easeOut });
    });

    this.playerOverlay.on('mousemove', (e) => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
        this.setTimer();
      } else {
        this.el.trigger('showControl');
        this.setTimer();
      }
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

    if (this.playerMenu) {
      this.playerMenu.on('click', 'a', this.onItemMenuClick);
    }

    this.playerOverlay.on('click', () => {
      this.removeVideo();
    });

    this.player = new YTPlayer('#player', {
      width: getViewport().width,
      height: getViewport().height,
      autoplay: true,
      captions: false,
      controls: false,
      info: false,
      modestBranding: true,
      related: false,
    });

    this.el.on('hideControl', this.onControlHide);
    this.el.on('showControl', this.onControlShow);

    this.player.on('ended', this.onVideoEnd);
    this.window.on('resize', this.onResize);
    this.document.on('keyup', this.onKeyUp);

    scrollbarObject.disableScroll();

    $('body').on('pageTransitionCompleted', (e, data) => {
      if (data && data.current.name !== 'case') {
        this.removeVideo();
      }
    });
  },
  onControlShow() {
    if (this.playerMenu) {
      TweenMax.to(this.playerMenu, 0.5, { autoAlpha: 1, ease: Power2.easeInOut });
    }
  },
  onControlHide() {
    this.closeVisible = false;
    TweenMax.to(this.playerClose, 0.5, { scale: 0, ease: Power2.easeOut });
    if (this.playerMenu) {
      TweenMax.to(this.playerMenu, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
    }
  },
  onItemMenuClick(e) {
    const target = $(e.target);
  
    if (target.hasClass('active')) {
      return;
    }
    this.activeVideoIndex = parseInt(target.data('index'), 10);
    target.addClass('active').siblings().removeClass('active');
    const videoId = target.data('video');
    this.playVideo(videoId);
  },
  onFirstPlaying() {
    if (!this.firstVideoLoaded) {
      this.firstVideoLoaded = true;
      this.player.setVolume(0);

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
          this.player.seek(0);
          timer = setInterval(() => {
            this.player.seek(0);
          }, 10);
        });
        tl.staggerTo(loaderLinesShowPosition, 0.3, { xPercent: '-100%', ease: Power2.easeIn }, 0.1);
        if (this.playerMenu) {
          tl.staggerFrom(this.playerMenu, 0.5, { y: 50, autoAlpha: 0, ease: Power2.easeOut });
        }
        tl.addCallback(() => {
          clearInterval(timer);
          this.player.setVolume(100);

          this.setTimer();
        }, 1.2);

      }, 2000);
    }
  },
  onVideoEnd() {
    if (this.activeVideoIndex < this.videoList.length - 1) {
      this.activeVideoIndex++;
      this.playerMenu
        .find('a').eq(this.activeVideoIndex)
        .addClass('active')
        .siblings()
        .removeClass('active');
      this.playVideo(this.videoList[this.activeVideoIndex].videoId);
    } else {
      this.removeVideo();
    }
  },
  setTimer() {
    this.timer = setTimeout(() => {
      this.el.trigger('hideControl');
      clearTimeout(this.timer);
      this.timer = null;
    }, 5000);
  },
  playVideo(videoId) {
    this.player.load(videoId);
  },
  onKeyUp(e) {
    if (e.keyCode == 27) {
      this.removeVideo();
    }
  },
  onResize() {
    this.playerEl.width(getViewport().width);
    this.playerEl.height(getViewport().height);
  },
  removeVideo() {
    this.window.off('resize', this.onResize);
    this.document.off('keyup', this.onKeyUp);
    clearTimeout(this.timer);
    this.timer = null;
    TweenMax.to(this.wrapper, 0.5, { autoAlpha: 0, ease: Power2.easeInOut, onComplete: () => {
      scrollbarObject.enableScroll();
      this.hasActiveVideo = false;
      this.wrapper.remove();
    }});
  }
};
