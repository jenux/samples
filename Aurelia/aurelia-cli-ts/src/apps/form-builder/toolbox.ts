import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Textbox} from '../../modules/fields/textbox/textbox';
import {Header} from '../../modules/fields/header/header';

@inject(EventAggregator, Textbox, Header)
export class FormToolbox {
  widgets;
  sortOptions: any = {
    group: {
      name: 'palette',
      pull: 'clone'
    },
    sort: false,
    onEnd: function(evt) {
      if (evt.from !== evt.item.parentNode) {
        evt.item.parentNode.removeChild(evt.item);
      }
    }
  };

  constructor(ea: EventAggregator, textbox:Textbox, header: Header) {
    this.widgets = [
      header,
      textbox
    ];
  }
}
