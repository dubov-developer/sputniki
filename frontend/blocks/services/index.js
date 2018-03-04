import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';
import getViewport from 'getviewport';
import scrollbarObject from '../../scroll';
import { disableBodyScroll } from '../../js/disable-body-scroll';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['services'] = {
  init: function(el) {
    const moduleObject = this;
    this.el = el;

    this.el.find('.service').on('click', function() {
      var active = $(".service.active"),
          self = $(this),
          currentService = self,
      tl = currentService.data('timeline-click');

      if (active.length != 0) {
        active.data('timeline-click').reverse();
      }

      if (!tl) currentService.data('timeline-click', tl = moduleObject.initTimeline(currentService))
      if (currentService.hasClass('active')) {
        tl.reverse();
      } else{
        tl.play();
      }
      $('body').trigger('service-toggle');
    });
  },
  initTimeline(service) {
    const background = service.find('.service__background');
    const content = service.find('.service__content');
    const contentDescription = service.find('.service__content-description');
    const contentListGroup = service.find('.service__list-group');
    const index = service.find('.service__index');
    const optionsLine = service.find('.action-line__options-line');
    const optionsButton = service.find('.action-line__options-button');
    const optionsButtonLineV = service.find('.action-line__options-button-line_v');

    const tl = new TimelineMax({
      paused: true,
      onComplete() {
        const height = service.outerHeight();
        content.css('height', 'auto');
        service.addClass('active');
        setTimeout(() => {
          const vh = getViewport().height;
          const serviceHeight = service.outerHeight();
          const offset = (vh - serviceHeight) / 2;
          const moreThanHeight = serviceHeight > vh;


          if (scrollbarObject.scrollbarInstance) {
            scrollbarObject.scrollbarInstance.update();
            scrollbarObject.scrollbarInstance.scrollTo(0, scrollbarObject.scrollbarInstance.offset.y + service.offset().top - offset, 500);
          } else {
            $('html, body').animate({
              scrollTop: moreThanHeight ? service.offset().top : service.offset().top - offset,
            }, 500, 'swing', () => {
              // service.addClass('fixed');
              // $('body').append(service);
              // $('.custom-scroll').hide();
              // $('body').css('overflow', 'hidden');
              // disableBodyScroll(true, '.service');
              // background.height(height);
            });
          }
        }, 0);
      },
      onUpdate: onUpdateFn,
      onReverseComplete() {
        service.removeClass('active');
        if (scrollbarObject.scrollbarInstance) {
          scrollbarObject.scrollbarInstance.update();
        } else {
          // background.css('height', '100%');
          // $('body').css('overflow', 'initial');
          // disableBodyScroll(false, '.service')
        }
      }
    })

    function onUpdateFn() {
      if (scrollbarObject.scrollbarInstance) {
        scrollbarObject.scrollbarInstance.update();
      }
    }

    let height = 0;
    let yTransformOrigin = optionsLine.position().top + parseInt(service.css('paddingTop'), 10);

    content.children().each(function() {
      height += $(this).outerHeight(true);
    });

    tl.to(background, 0.5, { transformOrigin: `50% ${yTransformOrigin}px`, scaleY: 1, ease: Power2.easeInOut }, 0)
    tl.to(content, 0.5, {  startAt: { height: 0 }, height: height, ease: Power2.easeInOut }, 0);
    tl.to(index, 0.5, { color: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsLine, 0.5, { backgroundColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsButton, 0.5, { borderColor: '#fff', ease: Power2.easeInOut }, 0);
    tl.to(optionsButtonLineV, 0.5, { scaleY: 0, ease: Power2.easeInOut }, 0);
    tl.to(contentDescription, 0.3, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.2);
    tl.to(contentListGroup, 0.3, { startAt: { opacity: 0 }, opacity: 1, ease: Power2.easeInOut, immediateRender: true }, 0.25);
    return tl
  }
};
