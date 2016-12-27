import {autoinject, customAttribute, bindable, dynamicOptions} from 'aurelia-framework';

@autoinject
@customAttribute('bs-popover')
@dynamicOptions
export class Popover {
  elem: any;
  title: string;
  placement: string = 'right';
  content: string;
  
  // @bindable title: string;
  // @bindable placement: string = 'right';
  // @bindable content: string;

  constructor(element: Element) { 
    this.elem = element;
  }

  bind() {
    $(this.elem).popover({ 
      container: 'body',
      title: this.title, 
      placement: this.placement, 
      content: this.content, 
      trigger: 'hover' 
    });
  }

  propertyChanged(name, newValue, oldValue) {
    $(this.elem).data('bs.popover').options[name] = newValue;
  }

  /*titleChanged(newValue){
    $(this.elem).data('bs.popover').options.title = newValue;
  }

  contentChanged(newValue){
    $(this.elem).data('bs.popover').options.content = newValue;
  }

  placementChanged(newValue){
    $(this.elem).data('bs.popover').options.placement = newValue;
  }*/
}
