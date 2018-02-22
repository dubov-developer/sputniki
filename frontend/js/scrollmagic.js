import getViewport from 'getviewport';
import ScrollMagic from 'scrollmagic';
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js');
import { clearTimeline } from './gsap-helpers';

const debug = false;

export const scrollmagic = {
  scenes: [],
  controller: null,
  init(scrollbar) {
    this.scrollbar = scrollbar;
    if (scrollbar) {
      this.scrollbar.addListener((event) => {
        this.refresh(event);
      });
    }

    this.createController();
  },
  scene(opts, timeline) {
    let scene;
    
    if (timeline.origin) {
      timeline = timeline.origin;
    }

    scene = this.createScene(opts)
    .setTween(timeline)
    .addTo(this.controller);

    scene.uid = this.scenes.push(scene);
    scene.timeline = timeline;

    return scene;    
  },
  destroy(scene) {
    clearTimeline(scene.timeline);
    scene.remove();
    scene.destroy(true);
    this.scenes = this.scenes.filter((item) => item !== scene);
  },
  refresh(event) {
    if (event) {
      this.scenes.forEach(scene => scene.refresh());
    }
  },
  createScene(opts) {
    let offsetInPercents = false;
    let label = opts.triggerElement;

    // configure
    if (typeof opts.offset === 'string' && opts.offset.indexOf('%') !== -1) {
      offsetInPercents = opts.offset;
      opts.offset = getViewport().height / 100 * parseInt(offsetInPercents, 10);
    }

    if (debug) {
      if (opts.triggerElement.tagName) {
        label = opts.triggerElement.className;
      }
    }

    const scene = new ScrollMagic.Scene(opts);

    if (debug) {
      scene.addIndicators({ name: label });
    }

    function updateOffset() {
      scene.offset(getViewport().height / 100 * parseInt(offsetInPercents, 10));
    }

    if (offsetInPercents) {
      window.addEventListener('resize', updateOffset);
      scene.on('destroy', () => {
        window.removeEventListener('resize', updateOffset);
      });
    }

    return scene;
  },
  createController(opts) {
    this.controller = new ScrollMagic.Controller(opts);
  }
}
