import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';

export class App {
  router: Router;

  constructor() {}
  
  configureRouter(config: RouterConfiguration, router: Router)  {
    config.title = 'Aurelia-cli-ts';
    config.map([
      { route: [''],          redirect: 'contacts' },
      { route: 'contacts',    moduleId: './apps/contacts/index',     nav: true, title: 'Contacts'},
      { route: 'projects',    moduleId: './apps/projects/index',     nav: true, title: 'Projects'},
      { route: 'flow-builder',moduleId: './apps/flow-builder/index', nav: false, title: 'Flow Builder'},
      { route: 'form-builder',moduleId: './apps/form-builder/index', nav: false, title: 'Form Builder'},
      { route: 'harness',     moduleId: './apps/harness/index',      nav: true, title: 'Harness'}
    ]);

    this.router = router;
  }
}
