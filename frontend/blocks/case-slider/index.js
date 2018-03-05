import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import { hover } from '../../js/hover.js';

if (!window.domModules) {
  window.domModules = {};
}

const resolution = window.devicePixelRatio > 1 ? 'retina' : 'default';

const slides = require('../../pages/case/gallery.js');

window.domModules['case-slider'] = {
  init: function(el) {
    this.el = el;
    this.sliderName = el.data('slider');
    this.wrapper = el.find('.case-slider__wrapper');
    this.wrapperWidth = this.wrapper.width();
    this.hover = el.find('.case-slider__hover');
    this.hoverIcon = this.hover.find('.case-slider__hover-icon');
    this.hoverSize = this.hover.height() / 2;
    this.paginationCurrent = this.el.find('.case-slider__pagination-current');
    this.paginationCount = this.el.find('.case-slider__pagination-count');

    let slidesHtml = '';

    slides[this.sliderName][resolution].forEach((url) => {
      slidesHtml += `<img class='case-slider__slide' src='${url}' />`
    });

    this.wrapper.append(slidesHtml);

    this.wrapper.on('init', (event, slick) => {
      this.paginationCurrent.text('1');
      this.paginationCount.text(slick.slideCount);
    });

    this.wrapper.on('afterChange', (event, slick, currentIndex) => {
      this.paginationCurrent.text(currentIndex + 1);
    });

    this.wrapper.slick({
      arrows: false,
      infinite: true,
      useCss: true
    });

    this.wrapper.on('mouseenter', (e) => {
      TweenMax.to(this.hover, 0.3, { scale: 1, ease: Power2.easeOut });
      TweenMax.from(this.hoverIcon, 0.3, { autoAlpha: 0, delay: 0.3, ease: Power2.easeOut });
    });

    this.wrapper.on('mouseleave', (e) => {
      TweenMax.to(this.hover, 0.3, { scale: 0, ease: Power2.easeOut });
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
