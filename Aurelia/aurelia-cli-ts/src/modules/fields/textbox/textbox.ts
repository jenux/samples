import {FieldBase} from "../base/base";

export class Textbox extends FieldBase {
  type = 'textbox';
  name = 'Text box';
  icon = 'fa-font';
  text = 'Lorem ipsum';

  activate(model) {
    this.text = model;
    this.sayHello();
  }
}
