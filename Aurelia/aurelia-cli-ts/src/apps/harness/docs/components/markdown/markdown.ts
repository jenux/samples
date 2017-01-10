import MarkdownIt from "markdown-it";
import {inject, customElement, noView, processContent} from 'aurelia-framework';
import {Prism} from 'prismjs';

@customElement('markdown')
@inject(Element)
@noView
@processContent(false)
/*export class MarkdownCustomElement {
  constructor(element) {
    this.element = element;
    this.md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang)
          return Prism.highlight(str, Prism.languages[lang]);
        else
          return Prism.highlight(str, Prism.languages.javascript);
      }
    });
  }

  attached() {
    this.element.className += " markdown";
    this.element.innerHTML = this.md.render(this.dedent(this.element.innerHTML));
  }

  dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
}
*/
