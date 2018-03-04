import $ from 'jquery';
import { TimelineMax, TweenLite, TweenMax, Power2, Linear } from 'gsap';
import getViewport from 'getviewport';
import Barba from 'barba.js';

if (!window.domModules) {
  window.domModules = {};
}


function pointDist(x1, y1, x2, y2) {
  console.log(arguments);
  return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function angleBetweenPoints(x1,y1,x2,y2) {
  var	dx = x1 - x2,	dy = y1 - y2;
  return Math.atan2(dy, dx);
}

window.domModules['promo'] = {
  init: function(el) {
    this.el = el;
    this.itemsEl = el.find('.promo__items');
    this._speed = 0;
    this._meX = 0;
    this._meY = 0;
    this._meRadius = this.itemsEl[0].offsetWidth;
    this._curDist = 0;
    this._tweenedDist = 0;
    this._angle= 0;
    this._closeSpeed = 1;
    this._over = false;
    this.group = el.find('.promo__group');
    this.hover = el.find('.promo__hover');

    this.over = this.over.bind(this);
    this.out = this.out.bind(this);
    this.moved = this.moved.bind(this);
    this.engine = this.engine.bind(this);

    this.hover[0].addEventListener("mouseenter", this.over);
    this.hover[0].addEventListener("mouseleave", this.out);

    this.items = el.find('.promo__item');
    this.itemsLength = this.items.length;
    this.currentIndex = 0;

    requestAnimationFrame(() => {
      this.startInterval();
    });

    Barba.Dispatcher.on('newPageReady', () => {
      clearInterval(this.invervalId);
    });
  },
  startInterval() {
    this.invervalId = setInterval(() => {
      TweenMax.set(this.items[this.currentIndex], { autoAlpha: 0 });
      this.currentIndex++;

      if (this.currentIndex <= this.itemsLength - 1) {
      } else {
        this.currentIndex = 0;
      }

      TweenMax.set(this.items[this.currentIndex], { autoAlpha: 1 });
      
    }, 1000);
  },
  out (e) {
    this._over = false;
    this._curDist = 0
    document.removeEventListener("mousemove", this.moved);
    TweenLite.killTweensOf(this);
    this._speed = .05;
    TweenLite.to(this, .2, { _speed:.2, ease: Linear.easeNone });
  },
  engine (e) {
    this._tweenedDist += (this._curDist - this._tweenedDist) * this._speed * this._closeSpeed;
    TweenLite.set(this.group, { x: Math.cos(this._angle) * this._tweenedDist / 2, y: Math.sin(this._angle) * this._tweenedDist / 2, force3D: true });
    if (!this._over && Math.abs(this._tweenedDist) < 0.05){
      TweenLite.ticker.removeEventListener("tick", this.engine);
      TweenLite.set(this.group, { x: 0, y: 0, force3D: true });
    }
  },
  moved (e) {
    this._curDist = pointDist(e.clientX, e.clientY, this._meX, this._meY);
    if (this._curDist < 40) {
      this._closeSpeed = 1;
    } else {
      this._closeSpeed = .5;
    }
    this._angle = angleBetweenPoints(e.clientX, e.clientY, this._meX, this._meY); 
  },
  over(e) {
    this._over = true;
    //Read my position (to-do: only in resize instead)

    this._meX = this.itemsEl.offset().left + this._meRadius / 2;
    this._meY = this.itemsEl.offset().top + this._meRadius / 2;
    this._tweenedDist = 0;
    this.moved(e);
    //Start engine
    TweenLite.ticker.addEventListener("tick", this.engine);
    //Start measuring distance
    document.addEventListener("mousemove", this.moved);
    //Tween speed
    TweenLite.killTweensOf(this);
    this._speed = 0;
    TweenLite.to(this, 0.15, {_speed: 0.2, ease:Linear.easeNone });
  }
};
