import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import getViewport from 'getviewport';
import { scrollbar } from '../../scroll.js';
import { hover } from '../../js/hover.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['case-select'] = {
  isStucked: false,
  isOpened: false,
  init: function(el) {
    setTimeout(() => {
      this.el = el;
      this.fixedContainer = $('.fixed-container');

      this.wrapperOffset = this.el.parent().offset();
      this.menu = $('.menu')
      this.actionLine = this.el.find('.action-line');
      this.selectText = el.find('.action-line__options-text');
      this.selectTextOffset = this.selectText.offset();
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
    }, 1000)
  },
  onScroll(event) {
    if (!this.isStucked) {
      if (this.selectTextOffset.top - this.menuOffset.top <= event.offset.y) {
        this.isStucked = true;
        this.el.addClass('stucked');
        this.el.css({ position: 'absolute', zIndex: 10 });
      }
    } else {
      if (this.selectTextOffset.top - this.menuOffset.top > event.offset.y) {
        this.isStucked = false;
        this.el.removeClass('stucked');
        this.el.css({ position: 'relative'});

        if (!this.isOpened) {
          this.el.css({ zIndex: 1 });
        }
      }
    }

    if (this.isStucked) {
      this.el.css({ transform: `translateY(${event.offset.y + this.menuOffset.top - this.selectTextOffset.top}px)` });
    }
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
    
    console.log(yTransformOrigin);

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
