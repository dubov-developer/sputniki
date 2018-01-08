import $ from 'jquery';
import { TweenMax, Power2 } from 'gsap';

export const hover = {
  inited: false,
  visible: false,
  init() {
    if (this.inited) {
      return;
    }

    this.create();

    this.inited = true;
  },
  create() {
    if (!this.bindedMouseMove) {
      this.bindedMouseMove = this.onMouseMove.bind(this);
    }
    const body = $('body');
    const hover = $('<div>');
    hover.addClass('hover');
    this.hoverElement = hover;
    body.append(hover);
    this.size = parseInt(this.hoverElement.css('width'), 10);
    window.addEventListener('mousemove', this.bindedMouseMove);
  },
  enter() {
    if (this.prev) {
      this.bindedMouseMove();
    }

    if (!this.visible) {
      this.visible = true
      TweenMax.to(this.hoverElement, 0.5, { scale: 1, ease: Power2.easeOut });
    }
    
  },
  leave() {
    TweenMax.to(this.hoverElement, 0.5, { scale: 0, ease: Power2.easeOut });
    this.visible = false;
  },
  onMouseMove(e) {
    let top;
    let left;
    if (e) {
      top = e.pageY - this.size / 2;
      left = e.pageX - this.size / 2;
    } else {
      top = this.prev.top;
      left = this.prev.left;
    }

    this.hoverElement.css({ top, left });
    this.prev = {
      top,
      left 
    };
  }
};
