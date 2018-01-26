import { ComponentFactoryResolver, Directive, EventEmitter, HostListener, Input, KeyValueDiffers, NgModule, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/share';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} val
 * @return {?}
 */
function type(val) {
    return typeof val;
}
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
     * @param {?} ele
     * @param {?} render
     */
    constructor(_differs, ele, render) {
        this._differs = _differs;
        this.ele = ele;
        this.render = render;
        this.stateChange = new EventEmitter();
        this.propsChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.props = /** @type {?} */ ({});
        this.state = /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    get state$() {
        return this.stateChange.share();
    }
    /**
     * @return {?}
     */
    get props$() {
        return this.propsChange.share();
    }
    /**
     * 监听click事件
     * @param {?} e
     * @return {?}
     */
    _onClick(e) {
        this.onClick.emit(e);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this._stateDiffer = this._differs.find(this.state).create();
        this.state = /** @type {?} */ (defaults(this.state, state));
        this.ngDoCheck();
    }
    /**
     * @param {?} props
     * @return {?}
     */
    setProps(props) {
        this._propsDiffer = this._differs.find(this.props).create();
        this.props = /** @type {?} */ (defaults(this.props, props));
        this.ngDoCheck();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('props' in changes) {
            const /** @type {?} */ value = changes['props'].currentValue;
            this._propsDiffer = this._differs.find(value).create();
        }
        if ('state' in changes) {
            const /** @type {?} */ value = changes['state'].currentValue;
            this._stateDiffer = this._differs.find(value).create();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._propsDiffer) {
            const /** @type {?} */ changes = this._propsDiffer.diff(this.props);
            if (changes)
                this._propsChanges(changes);
        }
        if (this._stateDiffer) {
            const /** @type {?} */ changes = this._stateDiffer.diff(this.state);
            if (changes)
                this._stateChanges(changes);
        }
    }
    /**
     * @param {?} classObj
     * @return {?}
     */
    setClass(classObj) {
        for (const /** @type {?} */ key in classObj) {
            if (classObj[key]) {
                this.render.addClass(this.ele.nativeElement, key);
            }
            else {
                this.render.removeClass(this.ele.nativeElement, key);
            }
        }
    }
    /**
     * @param {?} styleObj
     * @return {?}
     */
    setStyle(styleObj) {
        for (const /** @type {?} */ key in styleObj) {
            this.render.setStyle(this.ele.nativeElement, key, styleObj[key]);
        }
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    removeStyle(styles) {
        if (type(styles) == 'array') {
            styles.map(key => {
                this.render.removeStyle(this.ele.nativeElement, key);
            });
        }
        else {
            this.render.removeStyle(this.ele.nativeElement, styles);
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    addStyle(name, value) {
        this.render.setStyle(this.ele.nativeElement, name, value);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    addClass(name) {
        this.render.addClass(this.ele.nativeElement, name);
    }
    /**
     * @param {?} classObj
     * @return {?}
     */
    setAttribute(classObj) {
        for (const /** @type {?} */ key in classObj) {
            if (type(classObj[key]) === 'boolean') {
                if (classObj[key]) {
                    this.render.setAttribute(this.ele.nativeElement, key, 'true');
                }
                else {
                    this.render.removeAttribute(this.ele.nativeElement, key);
                }
            }
            else {
                this.render.setAttribute(this.ele.nativeElement, key, classObj[key]);
            }
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    removeClass(name) {
        this.render.removeClass(this.ele.nativeElement, name);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _stateChanges(changes) {
        this.onStateChange(changes);
        this.stateChange.emit(this.state);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _propsChanges(changes) {
        this.onPropsChange(changes);
        this.propsChange.emit(this.props);
    }
}
ReactComponent.propDecorators = {
    "state": [{ type: Input },],
    "props": [{ type: Input },],
    "stateChange": [{ type: Output },],
    "propsChange": [{ type: Output },],
    "onClick": [{ type: Output },],
    "_onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
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
