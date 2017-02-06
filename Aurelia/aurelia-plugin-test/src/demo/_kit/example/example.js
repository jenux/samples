import {inject, bindable, customElement, bindingMode} from 'aurelia-framework';
//import * as LogManager from 'aurelia-logging';
//const logger = LogManager.getLogger('example-component');

@customElement('example')
@inject(Element)
export class ExampleCustomElement {

  @bindable({defaultBindingMode: bindingMode.oneTime}) id;
  @bindable({defaultBindingMode: bindingMode.oneTime}) extras;

  actived = 'demo';
  htmlOnly = false;
  extraTabsContent = {};

  constructor(element) {
    this.element = element;
  }

  bind() {
    if (this.id.match(/\.html$/)) {
      this.htmlOnly = true;
    }
  }
  get viewToUse() {
    return this.htmlOnly ? this.id : null;
  }
  get viewModelToUse() {
    return this.htmlOnly ? null : this.id;
  }
  get htmlCode() {
    let url = this.id + (this.htmlOnly ? '' : '.html');
    require(url + '!text'.then(html => {
      return Prism.highlight(html, Prism.languages.html);
    }));
  }
  get jsCode() {
    if (!this.htmlOnly) {
      require(this.id + '.html' + '!text'.then(html => {
        return Prism.highlight(html, Prism.languages.html);
      }));

      require(this.id + '.js.map' + '!text'.then(sourceMap => {
        return Prism.highlight(JSON.parse(sourceMap).sourcesContent[0], Prism.languages.javascript);
      }));
    } else {
      return null;
    }
  }
  attached() {
    /*if (this.extras) {
      this.extras.forEach(s=> {
        if (s.match(/.js$/)) {
          SystemJS.import(s + '.map!text').then(sourceMap => {
            this.extraTabsContent[s] = Prism.highlight(JSON.parse(sourceMap).sourcesContent[0], Prism.languages.javascript);
          }).catch(e => {
            logger.error('Cannot load: ', s);
          });
        } else {
          SystemJS.import(s + '!text').then(html => {
            this.extraTabsContent[s] = Prism.highlight(html, Prism.languages.html);
          }).catch(e => {
            logger.error('Cannot load: ', s);
          });
        }
      });
    }*/
  }
  shortenExtra(sourceName) {
    return sourceName.substring(sourceName.lastIndexOf('/') + 1);
  }
}
