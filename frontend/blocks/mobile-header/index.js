import $ from 'jquery';
import { TimelineMax, Power2 } from 'gsap';

if (!window.domModules) {
  window.domModules = {};
}

window.domModules['mobile-header'] = {
  init: function(el) {
    this.el = el;
    this.logo = el.find('.mobile-logo');
    this.burger = el.find('.burger');
    this.fixedContainer = $('.fixed-container');
    this.menuItems= this.fixedContainer.find('.menu__item');

    this.burger.on('click', () => {
      this.burger.toggleClass('opened');
      this.fixedContainer.toggleClass('opened');
      this.logo.toggleClass('opened');
    });

    this.logo.on('click', () => {
      this.fixedContainer.removeClass('opened');
      this.logo.removeClass('opened');
      this.burger.removeClass('opened');
    });

    this.menuItems.on('click', () => {
      this.fixedContainer.removeClass('opened');
      this.logo.removeClass('opened');
      this.burger.removeClass('opened');
    })
  },
};

