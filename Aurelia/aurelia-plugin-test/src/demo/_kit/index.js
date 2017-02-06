export function configure(aurelia, config) {
  aurelia.globalResources([
    './example/example',
    './markdown/markdown',
    './md/md',
    './syntax-highlight/syntax-highlight'
  ]);
}
