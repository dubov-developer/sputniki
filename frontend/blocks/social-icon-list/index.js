import './style.styl';

import $ from 'jquery';
import bodymovin from 'bodymovin';

const dataFb = require('./assets/fb/data.json');
const dataInstagram = require('./assets/insta/data.json');
const dataYoutube = require('./assets/youtube/data.json');

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['social-icon-list'] = {
  animations: {},
  init: function(el) {
    this.el = el;
    this.icons = this.el.find('.social-list__link');

    this.icons.each((index, element) => {
      const icon = $(element);
      const type = icon.data('icon');

      setTimeout(() => {
        this.renderAnimation(icon, type);
      }, index * 500);
    });

    this.initListeners();
  },
  renderAnimation: function(el, type) {
    let data;

    if (type === 'fb') {
      data = dataFb;
    } else if (type === 'instagram') {
      data = dataInstagram;
    } else {
      data = dataYoutube;
    }

    this.animations[type] = bodymovin.loadAnimation({
      container: el[0],
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: data,
    });

    this.animations[type].goToAndPlay(0, true);
  },
  play: function(type, loop = false) {
    if (loop) {
      this.animation.loop = true;
    }

    this.animation.goToAndPlay(0, true);
  },
  reset: function(type) {
    this.animation.goToAndStop(0);
  },

  initListeners: function() {
    this.el.on('mouseenter', (e) => {
      this.play();
    });
  }
};
