import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

import * as Events from './message';

@inject(EventAggregator)
export class FormBuilder {
  ea: EventAggregator;
  
  // current editing field id
  target: any;

  // form model which will finally get persisted
  form = {
    title: 'New Form',
    pages: [
      {
        title: 'page 1',
        fields: []
      }
    ],
    _maxFieldId: 0
  }

  // sort settings for client form designer
  sortOptions = {
    group: {
      name: 'builder',
      put: ['palette']
    },
    onAdd: (e) => {
      this.addField(e)
    }
  }

  // private methods to generate label name and id for new added field
  private nextFieldLabel(t) {
    return 'label for ' + t;
  }

  private nextFieldId() {
    return ++this.form._maxFieldId;
  }


  constructor(ea: EventAggregator) {
    this.ea = ea;

    ea.subscribe(Events.FIELDADDED, (msg) => {
      this.editField(msg.field);
    });

    /*ea.subscribe('clearReport', () => {
      this.widgets = [];
    });*/

    /*ea.subscribe('field.add', () => {

    });

    ea.subscribe('field.delete', () => {

    });

    ea.subscribe('field.update', () = {

    });*/
  }


  editField(field) {
    this.target = field;
    this.ea.publish(new Events.FIELDTOEDIT(field));
  }

  commitField(field) {

  }

  addField(evt) {
    let t = evt.item.getAttribute('data-field-type');
    let id = this.nextFieldId();
    let field = {
      id: id,
      type: t,
      label: this.nextFieldLabel(t),
      value: ''
    }

    this.form.pages[0].fields.splice(evt.newIndex, 0, field);
    this.ea.publish(new Events.FIELDADDED(this.form.pages[0], field));
  }

  removeField(field) {
    /*let idx = this.widgets.map( (obj, index) => {
      if( obj.id === widget.id )
        return index;
    }).reduce( (prev, current) => {
      return current || prev;
    });
    this.ea.publish(new FieldRemoved(field))
    this.widgets.splice(idx, 1);*/
  }
}
