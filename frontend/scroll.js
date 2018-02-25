import Scrollbar from 'smooth-scrollbar';
import $ from 'jquery';
import getViewport from 'getviewport';
import { adaptive } from './js/adaptive';
import { scrollmagic } from './js/scrollmagic.js';

class scrollbarObject {
  constructor() {
    this.listenersFns = [];
    this.lastStackIndex = 0;
    this.targetsArray = null;
    this.scrollBarOptions = { damping: 0.1, renderByPixels: true };
    this.initPromise;
    this.stopScroll = false;
    this.onScroll = this.onScroll.bind(this);
    
    document.addEventListener("DOMContentLoaded", () => {
      this.init()
      scrollmagic.init(this.scrollbarInstance);
    });

    $('body').on('layoutStateChange', (e, data) => {
      if (data.previous === 'desktop' && data.current === 'tablet') {
        scrollmagic.removeCustomScrollListener();
        this.destroyScroll();
      }
    
      if (data.current === 'desktop' && data.previous === 'tablet') {
        this.init();
        scrollmagic.init(this.scrollbarInstance);
      }
    });
  }
  init() {
    if (!this.initPromise) {
      return this.initPromise = new Promise((resolve, reject) => {
        if (adaptive.currentState == 'desktop') {
          this.scrollbarInstance = Scrollbar.init(document.querySelector('.custom-scroll'), this.scrollBarOptions);
          this.initListeners();
          $(window).off('scroll', this.onScroll);
          resolve(this.scrollbarInstance);
          return;
        } else {
          $(window).on('scroll', this.onScroll);
          this.onScroll();
          resolve(false)
        }
      });
    }

    return this.initPromise;
  }
  initListeners() {
    this.onMouseWheel = this.onMouseWheel.bind(this)
    this.onCustomScroll = this.onCustomScroll.bind(this);
    this.resizeTarget = this.resizeTarget.bind(this);

    document.querySelector('.custom-scroll').addEventListener('wheel', this.onMouseWheel);
  
    this.scrollbarInstance.addListener(this.onCustomScroll);
  
    $(window).on('resize', this.resizeTarget);
  
    setTimeout(() => {
      this.initTargets();
    }, 1000);
  }
  initTargets() {
    this.lastStackIndex = 0;
    const targets = $('[data-scroll-target]');
    this.targetsArray = [];
  
    if (targets) {
      targets.each((index, el) => {
        const element = $(el);
        this.targetsArray.push({
          el: element,
          offset: element.offset().top + (this.scrollbarInstance ? this.scrollbarInstance.offset.y : 0)
        })
      });
    }
  }
  destroyScroll() {
    this.initPromise = null;
    this.scrollbarInstance.removeListener(this.onCustomScroll);
    $(window).off('resize', this.resizeTarget);
    Scrollbar.destroy(document.querySelector('.custom-scroll'));
    document.querySelector('.custom-scroll').removeEventListener('wheel', this.onMouseWheel);
  }
  onMouseWheel(e) {
    if (this.stopScroll) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  resizeTarget() {
    setTimeout(() => {
      this.initTargets();
    })
  }
  onScroll() {
    let event = {
      offset: {
        y: $(window).scrollTop(),
      }
    }
    if (this.listenersFns && this.listenersFns.length) {
      this.listenersFns.forEach((f) => {
        f(event)
      });
    }
  }
  onCustomScroll(status) {
    if (!this.stopScroll && this.targetsArray && this.targetsArray.length) {
      let targetFinded = null;
  
      this.targetsArray.forEach((target, index) => {
        if (( Math.abs(target.offset - status.offset.y) < getViewport().height / 1.7) 
            && targetFinded == null) {
              targetFinded = index;
        }
      });
  
      if (targetFinded !== null && this.lastStackIndex !== targetFinded) {
        this.stopScroll = true;
        const y = this.targetsArray[targetFinded].offset;
        this.lastStackIndex = targetFinded;
  
        this.scrollbarInstance.scrollTo(0, y, 700, { callback: () => { this.stopScroll = false; } });
      }  
    }
  }
  setPosition() {
    if (this.scrollbarInstance) {
      this.scrollbarInstance.setPosition(0, 0)
    } else {
      $(window).scrollTop(0);
    }
  }
  disableScroll() {
    this.stopScroll = true;
  }
  enableScroll() {
    this.stopScroll = false;
  }
  addListener(fn) {
    if (this.scrollbarInstance) {
      this.scrollbarInstance.addListener(fn);
    } else {
      this.listenersFns.push(fn);
    }
  }
  removeListener(fn) {
    if (this.scrollbarInstance) {
      this.scrollbarInstance.removeListener(fn);
    } else {
      const index = this.listenersFns.findIndex((f) => f === fn);
      this.listenersFns = [].concat(this.listenersFns.slice(0, index), this.listenersFns.slice(index + 1));
    }
  }
}

export default new scrollbarObject();
