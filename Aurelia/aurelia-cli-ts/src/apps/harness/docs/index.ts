import {Router, RouterConfiguration} from 'aurelia-router';
import {Menus, MenuPath} from './navigations';

export class Harness {
  public router: Router;
  public isSidebarExpanded: boolean = false;

  constructor() {}
  
  selectMenu(menu) {
    let nm = menu.current.id;
    menu.current.active = menu.current.hasOwnProperty('active') ? !menu.current.active : true;
    if (menu.parent && menu.parent.id) {
      nm = menu.parent.id + '/' + nm;
    }

    if (menu.current.widgets) {
      // toggle submenu show/hide, no need to navigate the route view
    } else {
      this.router.navigate(nm);
    }
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    let conf = [
      {route: '', moduleId: MenuPath(Menus[0], null), nav: true}
    ];
    Menus.forEach((menu)=>{
      if (menu.menus.length) {
        menu.menus.forEach((submenu) => {
          conf.push({
            route: menu.id+'/'+submenu.id,
            moduleId: MenuPath(submenu, menu),
            nav: true
          });
        });
      } else {
        conf.push({
          route: menu.id,
          moduleId: MenuPath(menu, null),
          nav: true
        });
      }
    });
  
    config.map(conf);
    this.router = router;
  }
}

