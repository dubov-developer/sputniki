import Scrollbar from 'smooth-scrollbar';
import $ from 'jquery';
import getViewport from 'getviewport';

let stopScroll = false;
let scrollbar;
let timeoutFn;
const scrollBarOptions = { damping: 0.06, renderByPixels: false };
let targetsArray = null;

export function initScroll() {
  scrollbar = Scrollbar.init(document.querySelector('#barba-wrapper'), scrollBarOptions);

  initListeners();
}

function initListeners() {
  document.querySelector('#barba-wrapper').addEventListener('wheel', onMouseWheel);
  
  scrollbar.addListener(onCustomScroll);

  initTargets();
}

function onMouseWheel(e) {
  if (stopScroll) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function initTargets() {
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
  
  if (timeoutFn) {
    clearTimeout(timeoutFn);
  }

  if (!stopScroll) {
    timeoutFn = setTimeout(() => {
      let targetFinded = false;
      const halfScreenHeigh = (getViewport().height / 2);

      targetsArray.forEach((target, index) => {
        if (( Math.abs((target.offset - halfScreenHeigh - status.offset.y)) < 400 || 
            ((status.offset.y - target.offset + halfScreenHeigh) > 400 && 
            (status.offset.y - target.offset + halfScreenHeigh) < 400)) 
            && !targetFinded) {
              targetFinded = index;
        }
      });

      console.log('$$', targetFinded);

      if (targetFinded !== false) {
        stopScroll = true;
        const y = targetsArray[targetFinded].offset - halfScreenHeigh;

        

        scrollbar.scrollTo(0, y, 500, { easing: easeInOutCirc, callback: () => { stopScroll = false; } });
      }

    }, 200);    
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
