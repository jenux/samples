import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './elements/loading-indicator',
    './elements/nav-bar/nav-bar',
    './attributes/bs-popover'
  ]);
}
