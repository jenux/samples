import {FieldBase} from "../base/base";

export class Textbox extends FieldBase {
  title: string = 'Textbox';
  type:  string = 'textbox';
  datatype: string = 'string';

  activate(model) {
    this.model = model;
  }
}
