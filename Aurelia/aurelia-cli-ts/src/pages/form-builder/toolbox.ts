import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Textbox} from '../../modules/fields/textbox/textbox';
import {Header} from '../../modules/fields/header/header';

//import "sortable";


@inject(EventAggregator, Textbox, Header)
export class FormToolbox {

  widgets;

  constructor(ea: EventAggregator, textbox:Textbox, header: Header) {
    this.widgets = [
      textbox,
      header
    ];
  }

  attached() {
    // toolboxList is `ref` in template
    /*new sortable(this.toolboxList, {
      sort: false,
      group: {
        name: "palette",
        pull: 'clone',
        put: false
      }
    });*/
  }
}
