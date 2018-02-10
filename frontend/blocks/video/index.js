import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import getViewport from 'getviewport';

const videoUrls = {
  'di-caprio': require('../../video/di-caprio.mp4'),
  'abrau-durso': require('../../video/abrau-durso.mp4'),
  'train-moscow': require('../../video/train-moscow.mp4'),
  'visa': require('../../video/visa.mp4'),
  'egk-ural': require('../../video/egk-ural.mp4'),
  'husky': require('../../video/husky.mp4'),
  '5-ozer': require('../../video/5-ozer.mp4'),
  'mageta': require('../../video/mageta.mp4'),
  'julius-meinl': require('../../video/julius-meinl.mp4'),
  'kotex-active': require('../../video/kotex-active.mp4'),
};

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['video'] = {
  init(el) {
    this.el = el;
    this.videoRatio = 960 / 540;
    this.container = this.el.find('[data-video-container]');
    this.caseName = this.el.data('case');
    this.background = this.el.find('.case-promo__background');
    this.onPageTransitionCompleted = this.onPageTransitionCompleted.bind(this);
    this.onWindowResize();

    this.loadVideo(videoUrls[this.caseName]).then(() => {
      this.inited = true;
      this.container.append('<canvas class="preview-case__canvas"></canvas>')
      this.canvas = this.container.find('canvas')[0];
      this.ctx = this.canvas.getContext('2d');
      this.onWindowResize();
      setTimeout(() => {
        this.currentTimer = setInterval(() => {
          this.renderFrame(this.videoElement);
        }, 1000 / 60);
        
        this.videoElement.play();
      }, 0);
    });

    $('body').one('pageTransitionCompleted', this.onPageTransitionCompleted);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  },
  onPageTransitionCompleted(){
    this.destroyVideo();
  },
  destroyVideo() {
    if (this.inited) {
      clearInterval(this.currentTimer);
      $(this.videoElement).remove();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.inited = false;
    }
  },
  renderFrame(video) {
    this.ctx.drawImage(video, 0, 0, 960, 540, 0, 0, this.fitSizes.width, this.fitSizes.height);
  },
  loadVideo(url) {
    return new Promise((resolve, reject) => {
      this.videoElement = document.createElement('video');
      document.body.appendChild(this.videoElement);
      this.videoElement.setAttribute('style', 'display:none');
      this.videoElement.setAttribute('src', url);
      this.videoElement.loop = true
      this.videoElement.addEventListener('canplaythrough', () => {
        resolve();
      });
    });
  },
  getFitSizes(containerWidth, containerHeight) {
    const cRatio = containerWidth / containerHeight;
    const test = (this.videoRatio < cRatio);
    let targetWidth = 0;
    let targetHeight = 0;

    if (test) {
      targetWidth = containerWidth;
      targetHeight = targetWidth / this.videoRatio;
    } else {
      targetHeight = containerHeight;
      targetWidth = targetHeight * this.videoRatio;
    }

    return {
      width: targetWidth,
      height: targetHeight,
      x: (containerWidth - targetWidth) / 2,
      y: (containerHeight - targetHeight) / 2,
    };
  },
  onWindowResize() {
    this.width = this.container.width();
    this.height = this.container.height();

    this.fitSizes = this.getFitSizes(this.width, this.height);

    if (this.canvas) {
      this.canvas.style.marginLeft = `${this.fitSizes.x}px`;
      this.canvas.style.marginTop = `${this.fitSizes.y}px`;
  
      this.canvas.width = this.width + Math.abs(this.fitSizes.x);
      this.canvas.height = this.height + Math.abs(this.fitSizes.y);
    }

    this.background.css({
      width: Math.floor(this.width),
      height: Math.floor(this.height),
    });

    if (this.videoElement) {
      this.renderFrame(this.videoElement);
    }    
  }
};
