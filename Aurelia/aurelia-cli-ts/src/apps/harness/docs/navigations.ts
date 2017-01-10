interface menuItem {
  id: string,
  title: string,
  menus: Array<menuItem>,
  category: any
}
export const Menus:Array<menuItem> = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    category: 'components',
    menus: []
  }, {
    id: 'typography',
    title: 'Typography',
    menus: [],
    category: 'components',
  }, {
    id: 'elements',
    title: 'UI Elements',
    menus: [
      {id: 'elements', title: 'Elements', menus: [], category: 'examples'},
      {id: 'buttons',  title: 'Buttons',  menus: [], category: 'examples'},
      {id: 'icons',  title: 'Icons',      menus: [], category: 'examples'},
      {id: 'tree',  title: 'Treeview',    menus: [], category: 'examples'}
    ],
    category: null
  }, {
    id: 'widgets',
    title: 'Widgets',
    menus: [
      { id: 'tabs', title: 'Tabs', menus: [], category: 'examples'}
    ],
    category: null
  }
];

export function MenuPath(menu:menuItem, parentMenu:menuItem): string {
  let id = ('/' + menu.id).repeat(2);
  return './'+ menu.category + (parentMenu ? '/'+ parentMenu.id : '') + id;
};
