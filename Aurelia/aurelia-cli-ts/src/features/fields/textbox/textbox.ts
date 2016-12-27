import {FormFields} from "../_classes/form-fields";

export class Textbox extends FormFields {
  type = 'textbox';
  name = 'Text box';
  icon = 'fa-font';
  text = 'Lorem ipsum';

  activate(model) {
    this.text = model;

    console.info('####')
    this.sayHello();
  }
}
