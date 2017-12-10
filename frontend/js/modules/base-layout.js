import $ from 'jquery';
import getViewport from 'getviewport';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['base-layout'] = {
  init: function(el) {
    this.el = el;
    const win = $(window);
    
    this.tick();
    win.on('resize', this.tick.bind(this));
  },
  destroy: function() {

  },
  factor: 1280 / 700,
  tick: function() {
    let width;
    let height;
    
    const viewportWidth = getViewport().width;
    const viewportHeight = getViewport().height;

    
    height = viewportHeight;
    width = height * this.factor;

    if (width > viewportWidth) {
      width = viewportWidth;
      height = width / this.factor;
    }

    if (width < 960) {
      width = 960;
      height = width / this.factor;
    }

    const fontSize = 14 + (8 * (width - 1024) / (1600 - 1024));

    this.el.css({
      fontSize,
    });
  }
};
