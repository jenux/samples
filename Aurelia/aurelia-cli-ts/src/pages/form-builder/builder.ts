import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator)
export class FormBuilder {
  widgets = [];

  sortOptions = {
    group: {
      name: 'builder',
      put: ['palette']
    },
    onAdd: (e) => {
      this.addWidget(e)
    }
  }

  constructor(ea: EventAggregator) {
    ea.subscribe('clearReport', () => {
      this.widgets = [];
    });
  }

  addWidget(evt) {
    let t = evt.item.getAttribute('data-id');
    this.widgets.splice(evt.newIndex, 0 {
      id: new Date(),
      type: t,
      model: {
        name: "aaa",
        value: 'test'
      }
    });
  }

  removeWidget(widget) {
    let idx = this.widgets.map( (obj, index) => {
      if( obj.id === widget.id )
        return index;
    }).reduce( (prev, current) => {
      return current || prev;
    });

    this.widgets.splice(idx, 1);
  }
}
