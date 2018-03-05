import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import scrollbarObject from '../../scroll';
import getViewport from 'getviewport';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['back'] = {
  init: function(el) {
    this.el = el;
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.page = $('.page-container_case');

    setTimeout(() => {
      this.calcOffset();
      scrollbarObject.addListener(this.onScroll);
      window.addEventListener('resize', this.onResize);

      $('body').on('pageTransitionCompleted', (e, data) => {
        if (data && data.current.name !== 'case') {
          scrollbarObject.removeListener(this.onScroll);
          window.removeEventListener('resize', this.onResize);
        }
      });
    });
  },
  onResize() {
    this.calcOffset();
  },
  calcOffset() {
    const availableWidth = (getViewport().width - this.page.width()) / 2;
    const elementWidth = this.el.outerWidth();

    this.el.css({
      left: (availableWidth - elementWidth) / 2
    });
  },
  onScroll(e) {
    TweenMax.set(this.el, { y: e.offset.y });
  }
};
