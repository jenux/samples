import {customElement, bindable, inject} from 'aurelia-framework';

@customElement('modal')
@inject(Element)
export class Modal {
  elem: any;
  @bindable showing: boolean = false;
  modal: any;

  constructor(element: Element) {
    this.elem = element;
  }

  attached() {
    $(this.modal).modal({
      show: false
    })
    .on('show.bs.modal', () => {	
      this.showing = true;
    })
    .on('hide.bs.modal', () => {
      this.showing = false;
    });
  }

  showingChanged(newValue){
    if (newValue) {
      $(this.elem).find('.modal').modal('show')
    } else {
      $(this.elem).find('.modal').modal('hide')
    }
  }
}
