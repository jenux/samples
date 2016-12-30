import {Router, RouterConfiguration} from 'aurelia-router';

export class Harness {
  public router: Router;
  menus = [
    {
      id: 'layout-side-main',
      title: 'Layout'
    },
    {
      id: 'table',
      title: 'Table'
    }
  ];

  selectMenu(menu) {
    this.router.navigate(menu.title)
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    let conf = [
      {route: '', moduleId: './hello', nav: true}
    ];
    this.menus.forEach((menu)=>{
      conf.push({
        route: menu.title,
        moduleId: './components/'+menu.id+'-demo',
        nav: true
      })
    });

    config.map(conf);

    this.router = router;
  }

  bind() {
    console.info('#####', this.router)
  }
}
