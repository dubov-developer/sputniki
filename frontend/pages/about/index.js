import Barba from 'barba.js';

var Homepage = Barba.BaseView.extend({
  namespace: 'aboutpage',
  onEnter: function() {
      // The new Container is ready and attached to the DOM.
      console.log('onEnter About');
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

