import {inject, bindable, inlineView, bindingMode} from 'aurelia-framework';
import {
    processContent,
    ViewCompiler,
    ViewSlot,
    ViewResources,
    Container,
    BindingEngine,
    TargetInstruction
} from 'aurelia-framework';


@processContent((viewCompiler, viewResources, element, instruction) => {
  
})

@inject(Element, ViewCompiler, ViewResources, Container, TargetInstruction, BindingEngine)
export class Tabs {
  constructor() {}
};

/**
 * <tabs selected="">
 *   <tab name="1"><div>static content</div></tab>
 *   <tab name="2" view="..">Loading</tab>
 *   <tab name="3" view-model="...">Loading</tab>
 *   <tab name="4"><compose></compose></tab>
 * </tabs>
 */

/**
 * Promise
 * <tabs data.bind="">
 * </tabs>
 */
