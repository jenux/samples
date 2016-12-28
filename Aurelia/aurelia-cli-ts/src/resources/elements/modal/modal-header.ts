import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class ModalHeader {
  @bindable title:string = '';
  @bindable close = null;
  elem: any;

  constructor(element: Element) {
    this.elem = element;
  }

  attached() {
    
  }
}
