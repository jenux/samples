import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(EventAggregator)
export class FormBuilder {
  form = {
    title: 'New Form',
    pages: [
      {
        title: 'page 1',
        fields: []
      }
    ]
  }

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
    /*ea.subscribe('clearReport', () => {
      this.widgets = [];
    });*/
  }

  nextLabel(t) {
    return 'label for ' + t;
  }

  addWidget(evt) {
    let t = evt.item.getAttribute('data-id');
    this.form.pages[0].fields.splice(evt.newIndex, 0, {
      type: t,
      model: {
        label: this.nextLabel(t),
        value: '',
        mode: 'design'
      }
    });
  }

  removeWidget(widget) {
    /*let idx = this.widgets.map( (obj, index) => {
      if( obj.id === widget.id )
        return index;
    }).reduce( (prev, current) => {
      return current || prev;
    });

    this.widgets.splice(idx, 1);*/
  }
}
