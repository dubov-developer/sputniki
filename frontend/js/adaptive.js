import getViewport from 'getviewport';
import $ from 'jquery';

export const adaptive = {
  prevState: null,
  init() {
    this.win = $(window);
    this.body = $('body');
    this.onResize = this.onResize.bind(this);
    this.win.on('resize', this.onResize);
    this.onResize();
  },
  onResize() {
    const vw = getViewport().width;
    this.currentState = '';
    
    if (vw >= 1024) {
      this.currentState = 'desktop';
    } else if (vw < 1024 && vw > 640) {
      this.currentState = 'tablet'
    } else {
      this.currentState = 'mobile';
    }
    
    if (this.prevState !== this.currentState) {
      this.body.trigger('layoutStateChange', { previous: this.prevState, current: this.currentState });
      this.prevState = this.currentState;
    }
  }
};

adaptive.init();
