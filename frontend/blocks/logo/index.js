import $ from 'jquery';
import bodymovin from 'bodymovin';
import './style.styl';

const dataHover = require('./assets/hover/data.json');
const dataLoad = require('./assets/load/data.json');

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['logo'] = {
  isLoadAnimationEnd: false,
  init: function(el) {
    this.el = el;

    this.animation = bodymovin.loadAnimation({
      container: this.el[0],
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: dataLoad,
    });

    this.animation.play();

    this.animation.addEventListener('complete', () => {
      this.animation.destroy();
      this.initHoverAnimation();
      this.isLoadAnimationEnd = true;
    });

    this.initListeners();
  },
  initHoverAnimation() {
    this.animation = bodymovin.loadAnimation({
      container: this.el[0],
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: dataHover,
    });

    this.animation.addEventListener('complete', () => {
      this.animation.goToAndStop(0)
    });
  },
  play: function(loop = false) {
    if (loop) {
      this.animation.loop = true;
    }
    this.animation.play();
  },
  reset: function() {
    this.animation.goToAndStop(0);
  },
  initListeners: function() {
    this.el.on('mouseenter', (e) => {
      if (this.isLoadAnimationEnd) {
        this.play();
      }
    });
  }
};
