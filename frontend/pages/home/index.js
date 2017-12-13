require('./style.styl');
import Barba from 'barba.js';
import { HomeEnterAnimation } from './animation';
import { scrollbar } from '../../scroll';


var Homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log('onEnter');
      HomeEnterAnimation();


      console.log('?', scrollbar);

  },
  onEnterCompleted: function() {
      // The Transition has just finished.
  },
  onLeave: function() {
      // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function() {
      // The Container has just been removed from the DOM.
  }
});

// Don't forget to init the view!
Homepage.init();

