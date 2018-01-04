import Barba from 'barba.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { disableScroll } from './scroll.js';

class Router {
  constructor() {
    this.events = new BehaviorSubject(null);
    this.Barba = Barba;

    setTimeout(() => {
      disableScroll();
      this.events.next({
        name: "transitionCompleted",
        current: Barba.HistoryManager.currentStatus().namespace,
        previous: null,
      });
    });
  }
  init() {
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
      this.events.next({
        name: 'transitionCompleted',
        current: currentStatus.namespace,
        previous: prevStatus.namespace,
      });
    });
  }
} 

export default new Router();
