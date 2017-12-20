import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar } from '../../scroll.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-select'] = {
  isStucked: false,
  init: function(el) {
    this.el = el;
    this.wrapperOffset = this.el.parent().offset();
    this.menu = $('.menu')
    this.selectText = el.find('.action-line__options-text');
    this.selectTextOffset = this.selectText.offset();
    this.menuOffset = this.menu.offset();

    this.onScroll = this.onScroll.bind(this);

    setTimeout(() => {
      scrollbar.addListener(this.onScroll);
    })
  },
  onScroll(event) {
    if (!this.isStucked) {
      if (this.wrapperOffset.top - this.menuOffset.top <= event.offset.y) {
        console.log('STUCK!');
        this.isStucked = true;
        this.el.addClass('stucked');
        this.el.css({ position: 'absolute' });
      }
    } else {
      if (this.wrapperOffset.top - this.menuOffset.top > event.offset.y) {
        console.log('UNSTUCK!');
        this.isStucked = false;
        this.el.removeClass('stucked');
        this.el.attr('style', '');
      }
    }

    if (this.isStucked) {
      this.el.css({ transform: `translateY(${event.offset.y + this.menuOffset.top - this.wrapperOffset.top - 3}px)` });
    }
  },
  initTimeline(el) {
  }
};
