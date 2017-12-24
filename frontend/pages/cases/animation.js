import $ from 'jquery';
import { TimelineMax, Power1, Power2 } from 'gsap';
import getViewport from 'getviewport';

export function CasesEnterAnimation() {
  return new Promise((resolve, reject) => {
    const tl = new TimelineMax();

    const cases = $('.cases');
    const title = cases.find('.cases__title');
    const caseSelectWrapper = cases.find('.case-select-wrapper')
    const previewCases = cases.find('.preview-cases');

    tl.from(title, 0.7, { autoAlpha: 0, yPercent: 100, ease: Power1.easeOut }, 0.3);
    tl.from(caseSelectWrapper, 0.7, { autoAlpha: 0, yPercent: 100, ease: Power1.easeOut }, 0.7);
    tl.from(previewCases, 0.7, { autoAlpha: 0, y: getViewport().height / 10, ease: Power1.easeOut }, 1.3);
  })
}
