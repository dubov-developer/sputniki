import $ from 'jquery';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import { scrollbar, disableScroll, enableScroll } from '../../scroll.js';
import Router from '../../router.js';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['back'] = {
  init: function(el) {
    this.el = el;
    this.onScroll = this.onScroll.bind(this);
    setTimeout(() => {
      scrollbar.addListener(this.onScroll);
      this.routerSubscription = Router.events.subscribe((e) => {
        if (e && e.name === 'transitionCompleted' && e.current.name !== 'case') {
          scrollbar.removeListener(this.onScroll);
          console.log('REMOVE LISTENER');
          if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
          }
        }
      });
    });
  },
  onScroll(e) {
    TweenMax.set(this.el, { y: e.offset.y });
  }
};
