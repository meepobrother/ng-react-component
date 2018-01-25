import { ComponentFactoryResolver, Directive, EventEmitter, Input, KeyValueDiffers, NgModule, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/share';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} target
 * @param {?} options
 * @return {?}
 */
function defaults(target, options) {
    if (target === null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }
    if (options) {
        target = Object.assign({}, target, options);
    }
    return target;
}
/**
 * @record
 */

/**
 * @abstract
 */
class ReactComponent {
    /**
     * @param {?} _differs
     */
    constructor(_differs) {
        this._differs = _differs;
        this.stateChange = new EventEmitter();
        this.propsChange = new EventEmitter();
        this._props = /** @type {?} */ ({});
        this._state = /** @type {?} */ ({});
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set state(val) {
        this.setState(val);
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state;
    }
    /**
     * @return {?}
     */
    get state$() {
        return this.stateChange.share();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set props(val) {
        this.setProps(val);
    }
    /**
     * @return {?}
     */
    get props() {
        return this._props;
    }
    /**
     * @return {?}
     */
    get props$() {
        return this.propsChange.share();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this._stateChanges();
        this._state = /** @type {?} */ (defaults(this._state, state));
        const /** @type {?} */ diffter = this._stateDiffer.diff(this._state);
        if (diffter) {
            this.onStateChange(diffter);
            this.stateChange.emit(this._state);
        }
        return this.state$;
    }
    /**
     * @param {?} props
     * @return {?}
     */
    setProps(props) {
        this._propsChanges();
        this._props = /** @type {?} */ (defaults(this._props, props));
        const /** @type {?} */ diffter = this._propsDiffer.diff(this._props);
        if (diffter) {
            this.onPropsChange(diffter);
            this.propsChange.emit(this._props);
        }
        return this.props$;
    }
    /**
     * @return {?}
     */
    _stateChanges() {
        this._stateDiffer = this._differs.find(this._state).create();
        return this._stateDiffer.diff(this._state);
    }
    /**
     * @return {?}
     */
    _propsChanges() {
        this._propsDiffer = this._differs.find(this._props).create();
        return this._propsDiffer.diff(this._props);
    }
}
ReactComponent.propDecorators = {
    "state": [{ type: Input },],
    "props": [{ type: Input },],
    "stateChange": [{ type: Output },],
    "propsChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class NgEachOfContext {
    /**
     * @param {?} $implicit
     * @param {?} ngForOf
     * @param {?} key
     */
    constructor($implicit, ngForOf, key) {
        this.$implicit = $implicit;
        this.ngForOf = ngForOf;
        this.key = key;
    }
}
class NgEachOf {
    /**
     * @param {?} _viewContainer
     * @param {?} _template
     * @param {?} _differs
     */
    constructor(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ngForTemplate(value) {
        if (value) {
            this._template = value;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('ngEachOf' in changes) {
            const /** @type {?} */ value = changes['ngEachOf'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create();
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ) {
            const /** @type {?} */ changes = this._differ.diff(this.ngEachOf);
            if (changes)
                this._applyChanges(changes);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        const /** @type {?} */ insertTuples = [];
        changes.forEachItem((item) => {
            if (item.previousValue == null) {
                const /** @type {?} */ view = this._viewContainer.createEmbeddedView(this._template, new NgEachOfContext(item.currentValue, this.ngEachOf, item.key), parseInt(item.key, 16));
                const /** @type {?} */ tuple = new RecordViewTuple(item, view, parseInt(item.key, 16));
                insertTuples.push(tuple);
            }
            else if (item.currentValue == null) {
                this._viewContainer.remove(parseInt(item.key, 16));
            }
            else {
                const /** @type {?} */ view = /** @type {?} */ ((this._viewContainer.get(parseInt(item.key, 16))));
                this._viewContainer.move(view, parseInt(item.key, 16));
                const /** @type {?} */ tuple = new RecordViewTuple(item.currentValue, /** @type {?} */ (view), parseInt(item.key, 16));
                insertTuples.push(tuple);
            }
        });
    }
}
NgEachOf.decorators = [
    { type: Directive, args: [{ selector: '[ngEach][ngEachOf]' },] },
];
/** @nocollapse */
NgEachOf.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
    { type: KeyValueDiffers, },
];
NgEachOf.propDecorators = {
    "ngEachOf": [{ type: Input },],
    "ngForTemplate": [{ type: Input },],
};
class RecordViewTuple {
    /**
     * @param {?} record
     * @param {?} view
     * @param {?} index
     */
    constructor(record, view, index) {
        this.record = record;
        this.view = view;
        this.index = index;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgComponentDirective {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this.viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // console.log(this.ngComponentInput);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.viewContainerRef.clear();
        this.componentRef = null;
        if (this.ngComponent) {
            const /** @type {?} */ elInjector = this.viewContainerRef.parentInjector;
            const /** @type {?} */ componentFactoryResolver = this.moduleRef ? this.moduleRef.componentFactoryResolver :
                elInjector.get(ComponentFactoryResolver);
            const /** @type {?} */ componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponent);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, elInjector, this.ngComponent);
            this.componentRef.instance.props = this.ngComponentInput;
        }
    }
}
NgComponentDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngComponent]' },] },
];
/** @nocollapse */
NgComponentDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];
NgComponentDirective.propDecorators = {
    "ngComponent": [{ type: Input },],
    "ngComponentInput": [{ type: Input },],
    "Output": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReactCommonModule {
}
ReactCommonModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    NgEachOf,
                    NgComponentDirective
                ],
                declarations: [
                    NgEachOf,
                    NgComponentDirective
                ]
            },] },
];
/** @nocollapse */
ReactCommonModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { ReactComponent, ReactCommonModule, NgComponentDirective as ɵc, NgEachOf as ɵb, NgEachOfContext as ɵa };
//# sourceMappingURL=ng-react-component.js.map
