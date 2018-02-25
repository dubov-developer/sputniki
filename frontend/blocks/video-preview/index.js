import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import getViewport from 'getviewport';
import scrollbarObject from '../../scroll.js';
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

window.domModules['video-preview'] = {
  init(el) {
    this.prevMousePosition = null;
    this.el = el;
    this.prevCase = null;
    this.firstContainer = this.el.find('.preview-case__canvas-container').eq(0);
    this.videoRatio = 960 / 540;
    this.background = this.el.find('.preview-case__background');
    this.onPageTransitionCompleted = this.onPageTransitionCompleted.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onScroll = this.onScroll.bind(this)
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
    $('body').one('pageTransitionCompleted', this.onPageTransitionCompleted);
    $(document).on('mousemove', this.onDocumentMouseMove);
    setTimeout(() => {
      scrollbarObject.addListener(this.onScroll);
    });

    this.el.on('mouseenter', '.preview-case', (e) => {
      if (!this.inited) {
        this.inited = true;
        this.caseEl = $(e.target).closest('.preview-case');
        this.container = this.caseEl.find('.preview-case__canvas-container');
        this.caseName = this.caseEl.data('case');
        this.createVideo();
      }
    });

    this.el.on('mouseleave', '.preview-case', (e) => {
      this.destroyVideo();
    });
  },
  onDocumentMouseMove(e) {
    this.prevMousePosition = {
      x: e.clientX,
      y: e.clientY
    };
    if (scrollbarObject.scrollbarInstance) {
      this.prevScrollOffset = scrollbarObject.scrollbarInstance.offset.y;
    }
  },
  onScroll(e) {
    if (this.prevMousePosition) {
      const elem = document.elementFromPoint(this.prevMousePosition.x, this.prevMousePosition.y);
      const caseName = $(elem).closest('.preview-case').data('case');
  
      if (this.caseName !== caseName) {
        $(`.preview-case[data-case="${this.caseName}"]`).trigger('mouseleave');
        $(`.preview-case[data-case="${caseName}"]`).trigger('mouseenter');
      }
    }
  },
  onPageTransitionCompleted() {
    this.destroyVideo();
    window.removeEventListener('resize', this.onWindowResize);
    $(document).off('mousemove', this.onDocumentMouseMove);
    scrollbarObject.removeListener(this.onScroll);
  },
  createVideo() {
    this.loadVideo(videoUrls[this.caseName]).then(() => {
      this.container.append('<canvas class="preview-case__canvas"></canvas>')
      this.canvas = this.container.find('canvas')[0];
      this.ctx = this.canvas.getContext('2d');
      this.onWindowResize();
      setTimeout(() => {
        this.currentTimer = setInterval(() => {
          this.renderFrame(this.videoElement);
        }, 1000 / 60);

        this.videoElement.play();
        TweenMax.from(this.canvas, 0.5, { autoAlpha: 0, ease: Power2.easeInOut });
      }, 0);
    });
  },
  destroyVideo() {
    if (this.inited) {
      this.caseName = null;
      clearInterval(this.currentTimer);
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
      if (this.canvas) {
        this.canvas.remove();
        this.canvas = null;
      }
      this.ctx = null;
      $(this.videoElement).remove();
      this.inited = false;
    }
  },
  renderFrame(video) {
    if (this.ctx) {
      this.ctx.drawImage(video, 0, 0, 960, 540, this.fitSizes.x, this.fitSizes.y, this.fitSizes.width, this.fitSizes.height);
    }
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
    this.width = this.firstContainer.width();
    this.height = this.firstContainer.height();

    this.fitSizes = this.getFitSizes(this.width, this.height);

    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    this.background.css({
      width: Math.floor(this.width),
      height: Math.floor(this.height),
    });

    if (this.videoElement && this.canvas) {
      this.renderFrame(this.videoElement);
    }    
  }
};
