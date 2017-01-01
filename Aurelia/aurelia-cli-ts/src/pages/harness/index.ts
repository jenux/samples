import {Router, RouterConfiguration} from 'aurelia-router';

export class Harness {
  public router: Router;
  menus = [
    {
      id: 'dashboard',
      title: 'Dashboard'
    },
    {
      id: 'typography',
      title: 'Typography'
    },
    {
      id: 'elements',
      title: 'UI Elements',
      widgets: [
        {id: 'elements', title: 'Elements'},
        {id: 'buttons',  title: 'Buttons'},
        {id: 'icons',  title: 'Icons'},
        {id: 'tree',  title: 'Treeview'},
      ]
    }
  ];

  selectMenu(menu) {
    let nm = menu.current.id;
    menu.current.active = menu.current.hasOwnProperty('active') ? !menu.current.active : true;
    if (menu.parent && menu.parent.id) {
      nm = menu.parent.id + '/' + nm;
    }

    if (menu.current.widgets) {
      // toggle submenu show/hide, no need to navigate the route view
    } else {
      console.info('***', nm)
      this.router.navigate(nm);
    }
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    let conf = [
      {route: '', moduleId: './docs/dashboard/dashboard', nav: false}
    ];
    this.menus.forEach((menu)=>{
      if (menu.hasOwnProperty('widgets')) {
        menu['widgets'].forEach((submenu) => {
          conf.push({
            route: menu.id+'/'+submenu.id,
            moduleId: './docs/'+menu.id+'/'+submenu.id,
            nav: true
          });
        });
      } else {
        conf.push({
          route: menu.id,
          moduleId: './docs/'+menu.id+'/'+menu.id,
          nav: true
        });
      }
    });

    config.map(conf);
    this.router = router;
  }

  bind() {
    
  }
}

