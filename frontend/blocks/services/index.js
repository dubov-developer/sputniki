import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';


if (!window.domModules) {
  window.domModules = {};
}

window.domModules['services'] = {
  init: function(el) {
    const moduleObject = this;
    this.el = el;

    this.el.on('click', '.service__head', function() {
      var active = $(".service.active"),
          self = $(this),
          currentService = self.closest('.service'),
      tl = currentService.data('timeline-click');

      if (active.length != 0) {
        active.data('timeline-click').timeScale(10).reverse();
      }

      if (!tl) currentService.data('timeline-click', tl = moduleObject.initTimeline(currentService))
      if (currentService.hasClass('active')) {
        tl.timeScale(1).reverse();
      } else{
        tl.timeScale(1).play();
      }
    });
  },
  initTimeline(service) {
    const background = service.find('.service__background');
    const content = service.find('.service__content');
    const contentDescription = service.find('.service__content-description');
    const contentListGroup = service.find('.service__list-group');
    const index = service.find('.service__index');
    const optionsLine = service.find('.service__options-line');
    const optionsButton = service.find('.service__options-button');
    const optionsButtonLineV = service.find('.service__options-button-line_v');

    const tl = new TimelineMax({
      paused: true,
      onComplete() {
        content.css('height', 'auto');
        service.addClass('active');
      },
      onReverseComplete() {
        service.removeClass('active');
      }
    })

    let height = 0;

    content.children().each(function() {
      height += $(this).outerHeight(true);
    });

    tl.to(background, 0.5, { scale: 1, ease: Power2.easeInOut }, 0)
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
