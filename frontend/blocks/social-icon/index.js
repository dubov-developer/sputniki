import $ from 'jquery';
import bodymovin from 'bodymovin';

const dataFb = require('./assets/fb/data.json');
const dataInstagram = require('./assets/insta/data.json');
const dataYoutube = require('./assets/youtube/data.json');

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['social-icon'] = function() {
  return {
    init: function(el) {
      let data;
      this.el = el;
      this.type = this.el.data('social-icon');

      if (this.type === 'fb') {
        data = dataFb;
      } else if (this.type === 'instagram') {
        data = dataInstagram;
      } else {
        data = dataYoutube;
      }

      this.animation = bodymovin.loadAnimation({
        container: el[0],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: data,
      });

      window.a = this.animation;

      console.log('!', this.animation);
      this.animation.goToAndStop(74, true);

      this.initListeners();
    },
    play: function(loop = false) {
      if (loop) {
        this.animation.loop = true;
      }

      this.animation.goToAndPlay(0, true);
    },
    reset: function() {
      this.animation.goToAndStop(0);
    },
    initListeners: function() {
      this.el.on('mouseenter', (e) => {
        this.play();
      });
    }
  };
}
