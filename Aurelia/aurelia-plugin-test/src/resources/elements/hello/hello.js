import { customElement, bindable } from 'aurelia-framework';

@customElement('hello-world')
export class HelloCustomElement {
  @bindable message = '';

  constructor() {}
}
