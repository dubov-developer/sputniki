import Barba from 'barba.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import scrollbarObject from './scroll.js';

class Router {
  constructor() {
    this.events = new BehaviorSubject(null);
    this.Barba = Barba;

    setTimeout(() => {
      scrollbarObject.disableScroll();
      const url = Barba.HistoryManager.currentStatus().url;
      const currentQueryIndex = url.indexOf('?');
      const currentQueryParams = currentQueryIndex !== -1 ? parseQuery(url.slice(currentQueryIndex)) : {};

      this.events.next({
        name: "transitionCompleted",
        current: {
          name: Barba.HistoryManager.currentStatus().namespace,
          queryParams: currentQueryParams,
        },
        previous: null,
      });
    });
  }
  init() {
    Barba.Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
      const currentQueryIndex = currentStatus.url.indexOf('?');
      const currentQueryParams = currentQueryIndex !== -1 ? parseQuery(currentStatus.url.slice(currentQueryIndex)) : {};
      const previousQueryIndex = prevStatus.url.indexOf('?');
      const previousQueryParams = previousQueryIndex !== -1 ? parseQuery(prevStatus.url.slice(previousQueryIndex)) : {};

      this.events.next({
        name: 'transitionCompleted',
        current: {
          name: currentStatus.namespace,
          queryParams: currentQueryParams
        },
        previous: {
          name: prevStatus.namespace,
          queryParams: previousQueryParams
        },
      });
    });
  }
} 

export default new Router();

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
