import $ from 'jquery';
import { TimelineMax, Power2, Linear, TweenMax } from 'gsap';


if (!window.domModules) {
  window.domModules = {};
}

window.domModules['percantage-loader'] = {
  init: function(el) {
    this.el = el;
    this.item = el.find('.percantage-loader__item');
    this.number = el.find('.percantage-loader__number');
    const obj = {
      load: 0
    };
    let index = 0;

    const numbers = [3, 15, 27, 44, 50, 62, 71, 86, 95, 100];

    TweenMax.to(obj, 1.3, {
      load: 100,
      onUpdate: () => {
        const number = Math.round(obj.load);
        
        console.log('!', number);

        if (number >= numbers[index]) {
          this.number.text(numbers[index]);
          index++;
        }
      },
      onComplete: () => {
        setTimeout(() => {
          $('body').trigger('percentage-loader-complete');
          TweenMax.set(this.el, { autoAlpha: 0 });
        }, 200);
      },
      ease: Linear.EaseNone,
    });

    TweenMax.to(this.item, 1.5, { opacity: 0, ease: Power2.easeIn });
  },
};
