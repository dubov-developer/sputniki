import $ from 'jquery';
import './modules/base-layout.js';

export function initDomModules() {
  $('[data-dom-module]:not(.inited)').each(function(){
    const el = $(this);
    const moduleName = el.addClass('inited').attr('data-dom-module');
    if (!window.domModules[moduleName]) {
      throw `Data dom module ${moduleName} doesn't exist!`;
    }

    domModules[moduleName]().init(el);
  });
}
