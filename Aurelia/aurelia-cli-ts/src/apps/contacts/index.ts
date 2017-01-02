import {Router, RouterConfiguration} from 'aurelia-router';

export class ContactIndex {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: '',    name: 'no-selection', moduleId: './no-selection',   nav: false },
      { route: ':id', name: 'contact',      moduleId: './detail', nav: false}
    ]);

    this.router = router;
  }
}

