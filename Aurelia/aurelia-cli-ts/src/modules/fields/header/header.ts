import {FieldBase} from "../base/base";

export class Header extends FieldBase {
  title: string = 'Header';
  type:  string = 'header';
  datatype: string = 'html';

  activate(model) {
    console.info('***** arche type', this.archetype)
    //this.sayHello();
  }
}
