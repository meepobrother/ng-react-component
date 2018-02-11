import { ComponentFactoryResolver, Directive, EventEmitter, HostBinding, HostListener, Input, KeyValueDiffers, NgModule, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/share';
import { FormControl } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function guid() {
    /**
     * @return {?}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
/**
 * @param {?} val
 * @return {?}
 */
function type(val) {
    return typeof val;
}
/**
 * @record
 */

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
        this.onHover = new EventEmitter();
        this.props = /** @type {?} */ ({
            children: []
        });
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
     * @param {?} val
     * @return {?}
     */
    set guid(val) {
        this._id = val;
    }
    /**
     * @return {?}
     */
    get guid() {
        return this._id;
    }
    /**
     * @return {?}
     */
    createGuid() {
        return guid();
    }
    /**
     * @return {?}
     */
    getNative() {
        return this.ele.nativeElement;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this._stateDiffer = this._differs.find(this.state).create();
        this.state = state;
        this.ngDoCheck();
    }
    /**
     * @param {?} props
     * @return {?}
     */
    setProps(props) {
        this._propsDiffer = this._differs.find(this.props).create();
        this.props = props;
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
     * @param {?=} ele
     * @return {?}
     */
    setClass(classObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const /** @type {?} */ key in classObj) {
            if (classObj[key]) {
                this.render.addClass(ele, key);
            }
            else {
                this.render.removeClass(ele, key);
            }
        }
    }
    /**
     * @param {?} styleObj
     * @param {?=} ele
     * @return {?}
     */
    setStyle(styleObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const /** @type {?} */ key in styleObj) {
            // 检查单位
            let [name, unit] = key.split('.');
            let /** @type {?} */ value = styleObj[key];
            value = value != null && unit ? `${value}${unit}` : value;
            name = this.humpToHyphen(name);
            this.render.setStyle(ele, name, value);
        }
    }
    /**
     * @param {?} styles
     * @param {?=} ele
     * @return {?}
     */
    removeStyle(styles, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        if (type(styles) == 'array' && type(styles) !== 'undefined') {
            styles.map(key => {
                this.render.removeStyle(ele, key);
            });
        }
        else {
            this.render.removeStyle(ele, styles);
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    hyphenToHump(str) {
        const /** @type {?} */ preg = new RegExp('//-(/w)/g');
        return str.replace(preg, (all, letter) => {
            return letter.toUpperCase();
        });
    }
    /**
     * @param {?} str
     * @return {?}
     */
    humpToHyphen(str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} ele
     * @return {?}
     */
    addStyle(name, value, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.setStyle(ele, name, value);
    }
    /**
     * @param {?} name
     * @param {?=} ele
     * @return {?}
     */
    addClass(name, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.addClass(this.ele.nativeElement, name);
    }
    /**
     * @param {?} classObj
     * @param {?=} ele
     * @return {?}
     */
    setAttribute(classObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const /** @type {?} */ key in classObj) {
            if (type(classObj[key]) === 'boolean') {
                if (classObj[key]) {
                    this.render.setAttribute(ele, key, 'true');
                }
                else {
                    this.render.removeAttribute(ele, key);
                }
            }
            else {
                this.render.setAttribute(ele, key, classObj[key]);
            }
        }
    }
    /**
     * @param {?} name
     * @param {?=} ele
     * @return {?}
     */
    removeClass(name, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.removeClass(ele, name);
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
    "onHover": [{ type: Output },],
    "_onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
    "_id": [{ type: HostBinding, args: ['attr.id',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class ReactComponentSetting extends ReactComponent {
    /**
     * @param {?} differs
     * @param {?} ele
     * @param {?} render
     * @param {?} fb
     * @param {?} _props
     */
    constructor(differs, ele, render, fb, _props) {
        super(differs, ele, render);
        this.fb = fb;
        this._props = _props;
        this.form = this.fb.group({});
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.instance = this.instance || this._props.instance;
        if (this.instance) {
            this.element = this.instance.ele.nativeElement;
            this.initStyleForm();
        }
    }
    /**
     * @return {?}
     */
    initStyleForm() {
        for (const /** @type {?} */ key in this.props["style"]) {
            this.form.addControl(key, new FormControl(this.props["style"][key]));
        }
        this.form.valueChanges.subscribe(res => {
            this.props["style"] = res;
            this.onStyleChange(res);
        });
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} to
     * @return {?}
     */
    checkFormField(name, value, to) {
        if (to) {
            if (!to.contains(name)) {
                to.addControl(name, new FormControl(value));
            }
        }
        else {
            if (!this.form.contains(name)) {
                this.form.addControl(name, new FormControl(value));
            }
        }
    }
    /**
     * @param {?} name
     * @param {?} obj
     * @return {?}
     */
    checkFormGroup(name, obj) {
        let /** @type {?} */ group = this.fb.group({});
        for (const /** @type {?} */ key in obj) {
            this.checkFormField(key, obj[key], group);
        }
        if (!this.form.contains(name)) {
            this.form.addControl(name, group);
        }
    }
    /**
     * @param {?} res
     * @return {?}
     */
    onStyleChange(res) {
        this.setStyle(res, this.instance.ele.nativeElement);
    }
    /**
     * @return {?}
     */
    removeSelf() {
        const /** @type {?} */ props = this._props.getPropsByUid(this.guid);
        this._props.removePropsByUid(props.uuid);
    }
}

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
class CreateLib {
    /**
     * @param {?} name
     * @param {?} title
     * @param {?=} props
     * @param {?=} children
     * @param {?=} father
     * @param {?=} uuid
     * @param {?=} state
     * @param {?=} items
     */
    constructor(name, title, props = {}, children = [], father = null, uuid = null, state = {}, items = []) {
        this.name = name;
        this.title = title;
        this.props = props;
        this.children = children;
        this.father = father;
        this.uuid = uuid;
        this.state = state;
        this.items = items;
        this.uuid = this.uuid || guid$1();
    }
}
/**
 * @return {?}
 */
function guid$1() {
    /**
     * @return {?}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

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

export { ReactComponent, ReactComponentSetting, ReactCommonModule, CreateLib, guid$1 as uuid, NgComponentDirective as ɵc, NgEachOf as ɵb, NgEachOfContext as ɵa };
//# sourceMappingURL=ng-react-component.js.map
