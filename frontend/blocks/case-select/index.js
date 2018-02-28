import $ from 'jquery';
import { TimelineMax, Power2, TweenMax } from 'gsap';
import getViewport from 'getviewport';
import scrollbarObject from '../../scroll.js';
import { adaptive } from '../../js/adaptive.js';

import Router from '../../router.js';

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
      this.globalOverlay = $('.global-overlay');
      this.fixedContainer = $('.fixed-container');
      this.curentValueText = el.find('[data-current-value] .action-line__options-text');
      this.wrapper = this.el.parent();
      this.wrapperOffset = this.wrapper.offset();
      this.wrapperHeight = this.wrapper.height();
      this.offset = this.wrapperOffset.top + this.wrapperHeight;

      this.menu = $('.menu')
      this.actionLine = this.el.find('.action-line');
      this.selectText = el.find('.action-line__options-text');
      this.selectTextPosition = this.selectText.position();
      this.menuOffset = this.menu.offset();
      
      if (adaptive.currentState === 'desktop') {
        this.onScroll = this.onScroll.bind(this);
        scrollbarObject.addListener(this.onScroll);
      }

      this.routerSubscription = Router.events.subscribe((e) => {
        if (e && e.name === 'transitionCompleted' && e.current.name !== 'cases') {
          scrollbarObject.removeListener(this.onScroll);
          if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
          }
        }
      });

      this.items = this.el.find('.case-select-dropdown__item a');

      $('.action-line_case-dropdown .action-line__options-text a').on('click', (e) => {
        const target = $(e.target);
        this.items.removeClass('active');
        target.addClass('active');
        const type = target.text();
        this.curentValueText.text(type);
        this.el.trigger('typeChange');
      });

      this.items.on('click', (e) => {
        let tl = this.el.data('timeline-click');
        const target = $(e.target);
        const type = target.text();

        this.curentValueText.text(type);
        this.items.removeClass('active');
        target.addClass('active');
        $('.action-line_case-dropdown .action-line__options-text a').removeClass('active');

        this.el.trigger('typeChange');

        if (!tl) {
          this.el.data('timeline-click', this.initTimeline(this.el));
          tl = this.el.data('timeline-click');
        }

        tl.reverse();
        this.isOpened = false;
      });

      this.actionLine.on('click', (e) => {
        let tl = this.el.data('timeline-click');
        
        if (!tl) {
          this.el.data('timeline-click', this.initTimeline(this.el));
          tl = this.el.data('timeline-click');
        }

        if (this.isOpened) {
          tl.reverse();
          this.isOpened = false;

          this.actionLine.removeClass('opened');
        } else {
          tl.play();
          this.isOpened = true;

          this.actionLine.addClass('opened');          
        }
      });

      if (location.hash) {
        const type = location.hash.slice(1);
        const text = $(`[data-type-id="${type}"]`).addClass('active').text()
        $('[data-type-id="All"').removeClass('active');
        this.curentValueText.text(text);
      }

      this.globalOverlay.on('click', (e) => {
        this.el.find('.action-line[data-current-value]').trigger('click');
        e.stopPropagation();
        e.preventDefault();
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
    const curentValue = el.find('[data-current-value]');
    const dropdown = el.find('.case-select-dropdown');
    const background = el.find('.case-select-dropdown__background');
    const innerActionLine = dropdown.find('.action-line');
    const groups= el.find('.case-select-dropdown__group');
    const optionsButton = el.find('.action-line__options-button');
    const optionsButtonLineV = el.find('.action-line__options-button-line_v');
    const optionsLine = el.find('.action-line__options-line');
    const optionsText = el.find('.action-line__options-text');
    let yTransformOrigin = optionsText.position().top + Math.abs(parseInt(background.css('top'), 10)) - 6;
    
    const tl = new TimelineMax({
      paused: true,
      onStart() {
        el.css({ zIndex: 10 });
        dropdown.css({ display: 'block'});
        objectModule.fixedContainer.css({ zIndex: 0 });
        TweenMax.set(curentValue, { autoAlpha: 0 });
        TweenMax.set(innerActionLine, { autoAlpha: 1 });
        scrollbarObject.disableScroll();
      },
      onComplete() {
      },
      onReverseComplete() {
        dropdown.css({ display: 'none'});
        objectModule.fixedContainer.css({ zIndex: 1 });
        TweenMax.set(curentValue, { autoAlpha: 1 });
        TweenMax.set(innerActionLine, { autoAlpha: 0 });
        scrollbarObject.enableScroll();
      }
    })

    tl.to(this.globalOverlay, 0.5, { autoAlpha: 1 }, 0);
    tl.to(background, 0.5, { transformOrigin: `50% ${yTransformOrigin}px`, scaleY: 1, ease: Power2.easeInOut }, 0)
    tl.to(groups, 0.5, { autoAlpha: 1, ease: Power2.easeInOut }, 0.2)
    tl.to(optionsButton, 0.5, { borderColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsLine, 0.5, { backgroundColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsButtonLineV, 0.5, { scaleY: 0, ease: Power2.easeInOut }, 0);

    return tl
  }
};
