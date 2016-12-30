import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class FormBuilder {
  widgets = [];
  widget = 'textbox';

  sortOptions = {
    group: {
      name: 'builder',
      put: ['palette']
    }
  }

  constructor(ea: EventAggregator) {
    ea.subscribe('clearReport', () => {
      this.widgets = [];
    });
  }

  public onSortAdd(evt: CustomEvent) {
    console.info('###', evt);
    evt.returnValue = false;
    return false;
  }

  addWidget() {
    this.widgets.push({
      id: new Date(),
      type: this.widget,
      model: {
        name: "aaa",
        type: 'textbox',
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
