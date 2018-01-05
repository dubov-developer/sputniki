import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar } from '../../scroll.js';
import { hover } from '../../js/hover.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-select'] = {
  prevYPosition: 0,
  isStucked: false,
  isOpened: false,
  isVisibleOnScroll: false,
  init: function(el) {
    setTimeout(() => {
      this.el = el;
      this.fixedContainer = $('.fixed-container');

      this.wrapper = this.el.parent();
      this.wrapperOffset = this.wrapper.offset();
      this.wrapperHeight = this.wrapper.height();
      this.offset = this.wrapperOffset.top + this.wrapperHeight;

      this.menu = $('.menu')
      this.actionLine = this.el.find('.action-line');
      this.selectText = el.find('.action-line__options-text');
      this.selectTextPosition = this.selectText.position();
      this.menuOffset = this.menu.offset();
  
      this.onScroll = this.onScroll.bind(this);
      scrollbar.addListener(this.onScroll);

      this.actionLine.on('mouseenter', () => {
        hover.enter();
      });

      this.actionLine.on('mouseleave', () => {
        hover.leave();
      });

      this.items = this.el.find('.case-select-dropdown__item span');

      this.items.on('click', () => {
        let tl = this.el.data('timeline-click');

        if (!tl) {
          this.el.data('timeline-click', this.initTimeline(this.el));
          tl = this.el.data('timeline-click');
        }

        tl.reverse();
        this.isOpened = false;
      });

      this.actionLine.on('click', () => {
        let tl = this.el.data('timeline-click');

        if (!tl) {
          this.el.data('timeline-click', this.initTimeline(this.el));
          tl = this.el.data('timeline-click');
        }

        if (this.isOpened) {
          tl.reverse();
          this.isOpened = false;
        } else {
          tl.play();
          this.isOpened = true;
        }
      });
    });
  },
  onScroll(event) {
    if (event.offset.y >= this.offset && !this.isStucked) {
      this.isStucked = true;
      console.log('STUCK!');
      this.stuck();
    }

    if (event.offset.y < (this.offset - this.menuOffset.top - this.wrapperHeight - this.selectTextPosition.top * 2.5) && this.isStucked) {
      console.log('UNSTUCK!');
      this.unstuck();
      this.isStucked = false;
    }

    if (this.prevYPosition > event.offset.y && this.isStucked && !this.isVisibleOnScroll) {
      // Scroll direction down with stuck
      console.log('Down and stuck');

      TweenMax.to(this.el, 0.3, {  y: this.menuOffset.top - this.selectTextPosition.top, autoAlpha: 1, ease: Power2.easeInOut });
      this.isVisibleOnScroll = true;
    }

    if (this.prevYPosition < event.offset.y && this.isStucked && this.isVisibleOnScroll) {
      // Scroll direction down with stuck
      console.log('Up and stuck');

      TweenMax.to(this.el, 0.3, {  y: 0, autoAlpha: 0, ease: Power2.easeInOut });
      this.isVisibleOnScroll = false;
    }

    this.prevYPosition = event.offset.y;
  },
  stuck() {
    const body = $('body');
    this.el.addClass('stucked');
    this.el.css({
      'position': 'fixed',
      'top': 0,
      'opacity': 0,
      'visibility': 'hidden',
      'left': this.wrapperOffset.left
    });

    body.append(this.el);
  },
  unstuck() {
    this.el.removeClass('stucked');
    this.el.attr('style', '');
    TweenMax.set(this.el, {  y: 0 });
    this.wrapper.append(this.el);
  },
  initTimeline(el) {
    const objectModule = this;
    const dropdown = el.find('.case-select-dropdown');
    const background = el.find('.case-select-dropdown__background');
    const items = el.find('.case-select-dropdown__items');
    const optionsButton = el.find('.action-line__options-button');
    const optionsButtonLineV = el.find('.action-line__options-button-line_v');
    const optionsLine = el.find('.action-line__options-line');
    const optionsText = el.find('.action-line__options-text');
    let yTransformOrigin = optionsText.position().top + Math.abs(parseInt(background.css('top'), 10)) - 4;
    
    const tl = new TimelineMax({
      paused: true,
      onStart() {
        el.css({ zIndex: 10 });
        dropdown.css({ display: 'block'});
        objectModule.fixedContainer.css({ zIndex: 0 });
      },
      onComplete() {
      },
      onReverseComplete() {
        dropdown.css({ display: 'none'});
        objectModule.fixedContainer.css({ zIndex: 1 });
      }
    })

    tl.to(background, 0.5, { transformOrigin: `50% ${yTransformOrigin}px`, scaleY: 1, ease: Power2.easeInOut }, 0)
    tl.to(items, 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, 0.2)
    tl.to(optionsButton, 0.5, { borderColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsLine, 0.5, { backgroundColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsButtonLineV, 0.5, { scaleY: 0, ease: Power2.easeInOut }, 0);

    return tl
  }
};
