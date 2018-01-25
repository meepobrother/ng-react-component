
import {
    ComponentFactoryResolver, ComponentRef, Directive, Injector,
    Input, NgModuleFactory, NgModuleRef, OnChanges, OnDestroy,
    SimpleChanges, StaticProvider, Type, ViewContainerRef
} from '@angular/core';
@Injectable()
export class ComponentOutletService {
    private _componentRef: ComponentRef<any> | null = null;
    private _moduleRef: NgModuleRef<any> | null = null;
    constructor(
        private _viewContainerRef: ViewContainerRef
    ) { }
    create(
        ngComponentOutlet: Type<any>,
        ngComponentOutletInjector?: Injector,
        ngComponentOutletContent?: any[][],
        ngComponentOutletNgModuleFactory?: NgModuleFactory<any>
    ): ComponentRef<any> | null {
        this._viewContainerRef.clear();
        this._componentRef = null;
        if (ngComponentOutlet) {
            const elInjector = ngComponentOutletInjector || this._viewContainerRef.parentInjector;
            if (this._moduleRef) this._moduleRef.destroy();
            if (ngComponentOutletNgModuleFactory) {
                const parentModule = elInjector.get(NgModuleRef);
                this._moduleRef = ngComponentOutletNgModuleFactory.create(parentModule.injector);
            } else {
                this._moduleRef = null;
            }
            const componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver : elInjector.get(ComponentFactoryResolver);
            const componentFactory = componentFactoryResolver.resolveComponentFactory(ngComponentOutlet);
            this._componentRef = this._viewContainerRef.createComponent(
                componentFactory,
                this._viewContainerRef.length,
                elInjector,
                ngComponentOutletContent
            );
            return this._componentRef;
        }
        return null;
    }
    update(): void { }
    destroy(): void {
        if (this._moduleRef) this._moduleRef.destroy();
    }
}
