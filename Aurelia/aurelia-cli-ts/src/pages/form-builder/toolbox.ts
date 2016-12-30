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
    setData: function(dataTransfer, dragEl) {
      dataTransfer.setData('draggedCtrl', dragEl.getAttribute('data-id'));
    }
  };

  constructor(ea: EventAggregator, textbox:Textbox, header: Header) {
    this.widgets = [
      header,
      textbox
    ];
  }
}
