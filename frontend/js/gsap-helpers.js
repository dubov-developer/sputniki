import { TweenMax } from 'gsap';
import { TimelineLite } from 'gsap';

export { Power1, Power2, Power3, Power4, Elastic, Back } from 'gsap';

TweenMax.ticker.useRAF(true);

function getChange(props) {
  const list = ['transform'];

  if (props.opacity) {
    list.push('opacity');
  }

  return list.join(', ');
}

function animate(timeline, method, element, duration, props, time = 0) {
  timeline.set(element, { willChange: getChange(props) }, time);
  timeline[method](element, duration, props, time);
  timeline.set(element, { clearProps: 'will-change' }, time + duration);
}

function animateStagger(timeline, method, element, duration, props, time = 0, time2 = 0) {
  timeline.set(element, { willChange: getChange(props) }, time);
  timeline[method](element, duration, props, time, time2);
  timeline.set(element, { clearProps: 'will-change' }, time + (duration * 2));
}

export function willChange(timeline) {
  return {
    to(element, duration, props, time = 0) {
      animate(timeline, 'to', element, duration, props, time);
    },
    from(element, duration, props, time = 0) {
      animate(timeline, 'from', element, duration, props, time);
    },
    fromTo(element, duration, props, time = 0) {
      animate(timeline, 'fromTo', element, duration, props, time);
    },
    staggerTo(element, duration, props, time = 0, time2 = 0) {
      animateStagger(timeline, 'staggerTo', element, duration, props, time, time2);
    },
    staggerFrom(element, duration, props, time = 0, time2 = 0) {
      animateStagger(timeline, 'staggerFrom', element, duration, props, time, time2);
    },
    set(...args) {
      timeline.set(...args);
    },
    origin: timeline,
  };
}


export function clearTimeline(timeline) {
  if (timeline.origin) {
    timeline = timeline.origin;
  }

  const targets = timeline.getChildren();
  timeline.kill();

  targets.forEach(target => {
    if (target.getChildren) {
      clearTimeline(target);
      return;
    }
    TweenMax.set(target.target, { clearProps: 'all' });
  });
}

export {
  TweenMax, TimelineLite
}
