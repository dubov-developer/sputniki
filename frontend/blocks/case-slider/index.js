import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import { hover } from '../../js/hover.js';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-slider'] = {
  init: function(el) {
    this.wrapper = el.find('.case-slider__wrapper');
    this.wrapperWidth = this.wrapper.width();
    this.hover = el.find('.case-slider__hover');
    this.hoverIcon = this.hover.find('.case-slider__hover-icon');
    this.hoverSize = this.hover.height() / 2;

    this.wrapper.slick({
      arrows: false
    });

    this.wrapper.on('mouseleave', (e) => {
      TweenMax.to(this.hover, 0.5, { scale: 0, ease: Power2.easeOut });
    });

    this.wrapper.on('mouseenter', (e) => {
      TweenMax.to(this.hover, 0.5, { scale: 1, ease: Power2.easeOut });
    });

    this.wrapper.on('click', (e) => {
      const offset = this.wrapper.offset();
      const top = e.pageY - offset.top - this.hoverSize;
      const left = e.pageX - offset.left - this.hoverSize;

      if (left >= this.wrapperWidth / 2) {
        this.wrapper.slick('slickNext');
      } else {
        this.wrapper.slick('slickPrev');
      }
    });

    this.wrapper.on('mousemove', (e) => {
      const offset = this.wrapper.offset();
      const top = e.pageY - offset.top - this.hoverSize;
      const left = e.pageX - offset.left - this.hoverSize;

      this.hover.css({
        top,
        left
      });

      if (left >= this.wrapperWidth / 2) {
        this.hoverIcon.removeClass('left');
        this.hoverIcon.addClass('right');
      } else {
        this.hoverIcon.removeClass('right');
        this.hoverIcon.addClass('left');
      }
    });
  }
};
