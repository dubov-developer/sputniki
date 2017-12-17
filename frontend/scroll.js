import Scrollbar from 'smooth-scrollbar';
import $ from 'jquery';
import getViewport from 'getviewport';

let stopScroll = false;
let lastStackIndex = 0;
export let scrollbar;
let timeoutFn;
const scrollBarOptions = { damping: 0.1, renderByPixels: true };
let targetsArray = null;

export function initScroll() {
  scrollbar = Scrollbar.init(document.querySelector('.custom-scroll'), scrollBarOptions);

  initListeners();
}

function initListeners() {
  document.querySelector('.custom-scroll').addEventListener('wheel', onMouseWheel);
  
  scrollbar.addListener(onCustomScroll);

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

export function initTargets() {
  lastStackIndex = 0;
  const targets = $('[data-scroll-target]');
  targetsArray = [];

  targets.each((index, el) => {
    const element = $(el);
    targetsArray.push({
      el: element,
      offset: element.offset().top
    })
  });
}

function onCustomScroll(status) {
  if (!stopScroll) {
    let targetFinded = null;
    // const halfScreenHeigh = (getViewport().height / 2);

    targetsArray.forEach((target, index) => {
      if (( Math.abs(target.offset - status.offset.y) < getViewport().height / 2) 
          && targetFinded == null) {
            targetFinded = index;
      }
    });

    if (targetFinded !== null && lastStackIndex !== targetFinded) {
      stopScroll = true;
      const y = targetsArray[targetFinded].offset;
      lastStackIndex = targetFinded;

      scrollbar.scrollTo(0, y, 800, { callback: () => { stopScroll = false; console.log('COMPLETE'); } });
    }  
  }
}

function easeInOutCirc(pos) {
  if((pos/=0.5) < 1) return -0.5 * (Math.sqrt(1 - pos*pos) - 1);
  return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);
}

function easeOutBack(pos) {
  var s = 1.70158;
  return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
}

function easeInBack(pos) {
  var s = 1.70158;
  return (pos)*pos*((s+1)*pos - s);
}

function easeInOutBack(pos) {
  var s = 1.70158;
  if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
  return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
}

function easeInCubic(pos) {
  return Math.pow(pos, 3);
}

function easeInOutSine(pos) {
  return (-0.5 * (Math.cos(Math.PI*pos) -1));
}

function easeInOutQuart(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
  return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
}
