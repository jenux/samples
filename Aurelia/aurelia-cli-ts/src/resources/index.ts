import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './elements/loading-indicator',
    './elements/nav-bar/nav-bar',
    './elements/modal/modal',
    './elements/modal/modal-header',
    './elements/modal/modal-body',
    './elements/modal/modal-footer',
    './attributes/bs-popover'
  ]);
}
