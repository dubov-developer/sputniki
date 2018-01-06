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
    const body = $('body');
    const hover = $('<div>');
    hover.addClass('hover');
    this.hoverElement = hover;
    body.append(hover);
    this.size = parseInt(this.hoverElement.css('width'), 10);
  },
  enter() {
    if (!this.bindedMouseMove) {
      this.bindedMouseMove = this.onMouseMove.bind(this);
    }
    window.addEventListener('mousemove', this.bindedMouseMove);
  },
  leave() {
    window.removeEventListener('mousemove', this.bindedMouseMove);
    TweenMax.to(this.hoverElement, 0.5, { scale: 0, ease: Power2.easeOut });
    this.visible = false;
  },
  click() {
  },
  onMouseMove(e) {
    this.hoverElement.css({ top: e.pageY - this.size / 2, left: e.pageX - this.size / 2 });
    if (!this.visible) {
      this.visible = true
      TweenMax.to(this.hoverElement, 0.5, { scale: 1, ease: Power2.easeOut });
    }
  }
};
