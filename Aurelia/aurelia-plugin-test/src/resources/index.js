import components from './components';

export function configure(aurelia, config) {
  let items = components;
  aurelia.globalResources(items);
}
