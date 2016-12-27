import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class Builder {
  builderCanvas;
  widgets = [];
  widget = 'textbox';

  constructor(ea: EventAggregator) {
    ea.subscribe('clearReport', () => {
      this.widgets = [];
    });
  }

  addWidget() {
    this.widgets.push({
      id: new Date(),
      type: this.widget,
      model: {
        name: "aaa",
        type: 'textbox',
        value: 'test'
    })
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

  attached() {
    /*new sortable(this.builderCanvas, {
      group: 'palette',
      onAdd: (evt) => {
        let type = evt.item.title,
            model = Math.random(),
            newPos = evt.newIndex;

        evt.item.parentElement.removeChild(evt.item);

        if(type === 'textbox') {
          let model = prompt('Enter textblock content');
          if(model === undefined || model === null)
            return;
        }

        this.widgets.splice(newPos, 0, {
          id: Math.random(),
          type: type,
          model: model
        });
      }
    });*/
  }
}
