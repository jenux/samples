const components = [
  './components/breadcrumbs/breadcrumbs',
  './components/table/table',
  './components/tabs/tabs',
  './components/navigator/navigator',
  './components/breadcrumbs',
  './components/breadcrumbs',
];
// attributes
// decorators
// components
// widgets
// converters
// binding-behaviors

export function configure(aurelia) {
    aurelia.globalResources(components);
}
