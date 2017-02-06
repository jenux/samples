import MarkdownIt from 'markdown-it';
import {inject, customElement, noView, processContent} from 'aurelia-framework';
import Prism from 'prismjs';

@customElement('markdown')
@inject(Element)
@noView
@processContent(false)
export class MarkdownCustomElement {
  constructor(element) {
    this.element = element;
    this.md = new MarkdownIt({
      highlight: (str, lang) => {
        let res = '';
        if (lang) {
          res = Prism.highlight(str, Prism.languages[lang]);
        } else {
          res = Prism.highlight(str, Prism.languages.javascript);
        }
        return res;
      }
    });
  }

  attached() {
    this.element.className += ' markdown';
    this.element.innerHTML = this.md.render(this.dedent(this.element.innerHTML));
  }

  dedent(str) {
    let match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    let indent = Math.min.apply(Math, match.map(el => {
      return el.length;
    }));

    let re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
}
