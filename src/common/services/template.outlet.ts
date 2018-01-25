import {
  Directive, EmbeddedViewRef, Input, OnChanges,
  SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef,
  Injectable
} from '@angular/core';
@Injectable()
export class TemplateOutletService {
  private _viewRef: EmbeddedViewRef<any>;

  constructor(
    private _viewContainerRef: ViewContainerRef
  ) { }

  create(tpl: TemplateRef<any>, context: Object): EmbeddedViewRef<any> | null {
    if (this._viewRef) {
      this.destroy();
    }
    if (tpl) {
      this._viewRef = this._viewContainerRef.createEmbeddedView(tpl, context);
      return this._viewRef;
    }
    return null;
  }

  update(ctx: Object): void {
    for (let propName of Object.keys(ctx)) {
      (<any>this._viewRef.context)[propName] = (<any>ctx)[propName];
    }
  }

  destroy(): void {
    const index = this._viewContainerRef.indexOf(this._viewRef);
    if (index >= 0) {
      this._viewContainerRef.remove(index);
    }
  }
}
