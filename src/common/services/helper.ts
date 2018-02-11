import { Injectable, ViewContainerRef, TemplateRef } from '@angular/core';
import { ComponentOutletService } from './component.outlet';
import { TemplateOutletService } from './template.outlet';
import { Type, Injector, NgModuleFactory } from '@angular/core';
@Injectable()
export class HelperService {
    private _templateCreator: TemplateOutletService;
    private _componentCreator: ComponentOutletService;

    constructor(
        private _viewContainerRef: ViewContainerRef
    ) {
        this._templateCreator = new TemplateOutletService(_viewContainerRef);
        this._componentCreator = new ComponentOutletService(_viewContainerRef);
    }

    createTemplate(tpl: TemplateRef<any>, context?: Object): void {
        this._templateCreator.create(tpl, context);
    }

    createComponent(
        component: Type<any>,
        injector?: Injector,
        content?: any[][],
        ngModel?: NgModuleFactory<any>
    ): void {
        this._componentCreator.create(component, injector, content, ngModel);
    }

    destory(): void {
        this._templateCreator.destroy();
        this._componentCreator.destroy();
    }
}
