import Scrollbar from 'smooth-scrollbar';
import $ from 'jquery';
import getViewport from 'getviewport';

export let scrollbar;
let stopScroll = false;
let lastStackIndex = 0;
let timeoutFn;
const scrollBarOptions = { damping: 0.1, renderByPixels: true };
let targetsArray = null;

export function initScroll() {
  scrollbar = Scrollbar.init(document.querySelector('.custom-scroll'), scrollBarOptions);

  initListeners();
}

export function destroyScroll() {
  scrollbar.addListener(onCustomScroll);
  $(window).off('resize', resizeTarget);
  Scrollbar.destroy(document.querySelector('.custom-scroll'));
  document.querySelector('.custom-scroll').removeEventListener('wheel', onMouseWheel);
}

function initListeners() {
  document.querySelector('.custom-scroll').addEventListener('wheel', onMouseWheel);
  
  scrollbar.addListener(onCustomScroll);

  $(window).on('resize', resizeTarget);

  setTimeout(() => {
    initTargets();
  }, 1000);
}

function onMouseWheel(e) {
  if (stopScroll) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export function disableScroll() {
  stopScroll = true;
};

export function enableScroll() {
  stopScroll = false;
};

export function initTargets() {
  lastStackIndex = 0;
  const targets = $('[data-scroll-target]');
  targetsArray = [];

  if (targets) {
    targets.each((index, el) => {
      const element = $(el);
      targetsArray.push({
        el: element,
        offset: element.offset().top + (scrollbar ? scrollbar.offset.y : 0)
      })
    });
  }
}

function onCustomScroll(status) {
  if (!stopScroll && targetsArray && targetsArray.length) {
    let targetFinded = null;
    // const halfScreenHeigh = (getViewport().height / 2);

    targetsArray.forEach((target, index) => {
      if (( Math.abs(target.offset - status.offset.y) < getViewport().height / 1.7) 
          && targetFinded == null) {
            targetFinded = index;
      }
    });

    if (targetFinded !== null && lastStackIndex !== targetFinded) {
      stopScroll = true;
      const y = targetsArray[targetFinded].offset;
      lastStackIndex = targetFinded;

      scrollbar.scrollTo(0, y, 700, { callback: () => { stopScroll = false; } });
    }  
  }
}

function resizeTarget() {
  setTimeout(() => {
    initTargets();
  })
}
