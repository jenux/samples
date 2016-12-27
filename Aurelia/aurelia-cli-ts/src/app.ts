import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  router: Router;

  constructor(public api: WebAPI) {}
  
  configureRouter(config: RouterConfiguration, router: Router)  {
    config.title = 'Aurelia-cli-ts';
    config.map([
      { route: [''],          redirect: 'contacts' },
      { route: 'contacts',    moduleId: './pages/contacts/contact-index', nav: true, title: 'Contacts'},
      { route: 'projects',    moduleId: './pages/projects/project-index', nav: true, title: 'Projects'},
      { route: 'flow-builder',moduleId: './pages/flow-builder/index',     nav: true, title: 'Flow Builder'},
      { route: 'form-builder',moduleId: './pages/form-builder/index',     nav: true, title: 'Form Builder'}
    ]);

    this.router = router;
  }
}
