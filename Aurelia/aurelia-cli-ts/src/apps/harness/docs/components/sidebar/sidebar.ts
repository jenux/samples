import {inject, bindable} from 'aurelia-framework';

export class Sidebar {
  @bindable isExpanded: boolean = true;

  constructor() {}

  attach() {
    // get expand state from localStorage
    this.isExpanded = localStorage.getItem('sidebarIsExpanded') === undefined ? true : localStorage.getItem('sidebarIsExpanded') === 'true';
  }
  
  toggle() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('sidebarIsExpanded', this.isExpanded.toString());
  }
}
