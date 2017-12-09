import $ from 'jquery';
import bodymovin from 'bodymovin';

const data = require('./assets/data.json');

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['logo'] = function() {
  return {
    init: function(el) {
      this.el = el;
      this.animation = bodymovin.loadAnimation({
        container: el[0],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: data,
      });
  
      this.initListeners();
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
        this.play();
      });
    }
  }
}
