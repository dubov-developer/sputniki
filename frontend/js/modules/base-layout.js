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
  deviceFactor: 750 / 1333,
  tick: function() {
    let width;
    let height;
    let fontSize;
    const viewportWidth = getViewport().width;
    const viewportHeight = getViewport().height;

    const factor = viewportWidth >= 1024 ? this.factor : this.deviceFactor;
    
    if (viewportWidth >= 1024) {
      height = viewportHeight;
      width = height * factor;
  
      if (width > viewportWidth) {
        width = viewportWidth;
        height = width / factor;
      }
  
      if (width < 960) {
        width = 960;
        height = width / factor;
      }

      fontSize = 14 + (8 * (width - 1024) / (1600 - 1024));
    } else {
      width = viewportWidth;
      fontSize = 15.8 + (15 * (width - 320) / (1023 - 320));
    }

    this.el.css({
      fontSize,
    });
  }
};
