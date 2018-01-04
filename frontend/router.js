import Barba from 'barba.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

class Router {
  constructor() {
    this.events = new BehaviorSubject(null);

    setTimeout(() => {
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
