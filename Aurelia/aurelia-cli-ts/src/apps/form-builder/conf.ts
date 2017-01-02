import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import * as Events from './message';

@inject(EventAggregator)
export class FormBuilderConf {
  ea: EventAggregator;
  target: any;

  constructor(ea: EventAggregator) {
    this.ea = ea;

    ea.subscribe(Events.FIELDTOEDIT, (msg) => {
      this.target = msg.field;
    });
  }
}
