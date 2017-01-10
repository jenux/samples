/*import {inject, bindable, customElement, bindingMode} from 'aurelia-framework';
import {Prism} from 'prismjs';
import * as LogManager from 'aurelia-logging';
const logger = LogManager.getLogger('example-component');

@customElement('example')
@inject(Element)
export class ExampleCustomElement {

    @bindable({defaultBindingMode: bindingMode.oneTime}) id;
    @bindable({defaultBindingMode: bindingMode.oneTime}) extraTabs;

    activeTab = 'demo';
    htmlOnly = false;
    jsCode;
    htmlCode;
    viewToUse;
    viewModelToUse;
    extraTabsContent = {};


    constructor(element) {
        this.element = element;
    }

    bind() {

        if (this.id.match(/\.html$/))
            this.htmlOnly = true;
        //     this.id = this.id.substring(0, this.id.length - 5);
        // console.log('!!!', this.id)
    }
    
    attached() {
        if (this.htmlOnly) {
            SystemJS.import(this.id + "!text").then(html => {
                this.viewToUse = this.id;
                this.htmlCode = Prism.highlight(html, Prism.languages.html);
            });
        } else {
            SystemJS.import(this.id + ".js.map" + "!text").then(sourceMap => {
                this.jsCode = Prism.highlight(JSON.parse(sourceMap).sourcesContent[0], Prism.languages.javascript);
            }).catch(e => {
                logger.error("Error at loading module JS file, if module consists of html template only it should be referenced with .html extension, e.g. id='dropdown-example.html'")
            });
            SystemJS.import(this.id + ".html" + "!text").then(html => {
                this.htmlCode = Prism.highlight(html, Prism.languages.html);
                this.viewModelToUse = this.id;
            }).catch(e => {
                logger.error("Missing module template file: ", this.id + ".html", e)
            });
        }

        if (this.extraTabs)
            this.extraTabs.forEach(s=> {
                if (s.match(/.js$/))
                    SystemJS.import(s + ".map!text").then(sourceMap => {
                        this.extraTabsContent[s] = Prism.highlight(JSON.parse(sourceMap).sourcesContent[0], Prism.languages.javascript);
                    }).catch(e => {
                        logger.error("Cannot load: ", s)
                    });
                else
                    SystemJS.import(s + "!text").then(html => {
                        this.extraTabsContent[s] = Prism.highlight(html, Prism.languages.html);
                    }).catch(e => {
                        logger.error("Cannot load: ", s)
                    });
            })


    }

    shortenExtra(sourceName) {
        return sourceName.substring(sourceName.lastIndexOf("/")+1);
    }

}*/
