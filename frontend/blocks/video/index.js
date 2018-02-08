import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import getViewport from 'getviewport';

const videoUrl = require('../../video/di-caprio.mp4');

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['video'] = {
  init(el) {
    this.el = el;
    this.videoRatio = 960 / 540;
    this.container = this.el.find('[data-video-container]');
    if (!this.container.length) {
      this.container = this.el;
    }
    this.width = this.container.width();
    this.height = this.container.height();
    this.canvas = this.container.find('canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    this.onWindowResize();

    this.loadVideo(videoUrl).then(() => {
      this.inited = true;
      setTimeout(() => {
        this.currentTimer = setInterval(() => {
          this.renderFrame(this.videoElement);
        }, 1000 / 60);
        
        this.videoElement.play();
      }, 0);
    });

    window.addEventListener('resize', this.onWindowResize.bind(this));
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

    this.canvas.style.marginLeft = `${this.fitSizes.x}px`;
    this.canvas.style.marginTop = `${this.fitSizes.y}px`;

    this.canvas.width = this.width + Math.abs(this.fitSizes.x);
    this.canvas.height = this.height + Math.abs(this.fitSizes.y);

    if (this.videoElement) {
      this.renderFrame(this.videoElement);
    }    
  }
};
