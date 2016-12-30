import {bindable} from 'aurelia-framework';

export class Toper {
  @bindable router;  

  bind() {
    console.info('####', this.router)
  }
}
