import './style.styl';
import Barba from 'barba.js';
import { ServicesEnterAnimation } from './animation';

var Servicespage = Barba.BaseView.extend({
  namespace: 'servicespage',
  onEnter: function() {
    ServicesEnterAnimation();
  },
  onEnterCompleted: function() {
  },
  onLeave: function() {
  },
  onLeaveCompleted: function() {
  }
});

Servicespage.init();
