import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


import {Textbox} from '../../features/fields/textbox/textbox';
import {Header} from '../../features/fields/header/header';


@inject(EventAggregator, Textbox, Header)
export class Toolbox {

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
