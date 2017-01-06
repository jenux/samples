interface menuItem {
  id: string,
  title: string,
  menus: Array<menuItem>
}
export const Menus:Array<menuItem> = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    menus: []
  }, {
    id: 'typography',
    title: 'Typography',
    menus: []
  }, {
    id: 'elements',
    title: 'UI Elements',
    menus: [
      {id: 'elements', title: 'Elements', menus: []},
      {id: 'buttons',  title: 'Buttons',  menus: []},
      {id: 'icons',  title: 'Icons',      menus: []},
      {id: 'tree',  title: 'Treeview',    menus: []},
    ]
  }, {
    id: 'widgets',
    title: 'Widgets',
    menus: [
      { id: 'tabs', title: 'Tabs', menus: []}
    ]
  }
];

export function MenuPath(menu:menuItem, parentMenu:menuItem): string {
  let id = ('/' + menu.id).repeat(2);
  return './components'+ (parentMenu ? '/'+ parentMenu.id : '') + id;
};
