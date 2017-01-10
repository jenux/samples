import {bindable} from 'aurelia-framework';

export class Navigator {
  @bindable router;
  @bindable selected;
  constructor() {}

  attached() {
    console.info('###', this.router)
  }
}
