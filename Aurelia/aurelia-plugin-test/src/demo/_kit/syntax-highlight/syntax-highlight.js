import {inject, customAttribute} from 'aurelia-framework';

@customAttribute('syntax-highlight')
@inject(Element)
export class SyntaxHighlightCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  attached() {
    Prism.highlightElement(this.element);
  }
}
