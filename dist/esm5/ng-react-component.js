var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
var ReactComponent = /** @class */ (function () {
    /**
     * @param {?} _differs
     * @param {?} ele
     * @param {?} render
     */
    function ReactComponent(_differs, ele, render) {
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
    Object.defineProperty(ReactComponent.prototype, "state$", {
        /**
         * @return {?}
         */
        get: function () {
            return this.stateChange.share();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactComponent.prototype, "props$", {
        /**
         * @return {?}
         */
        get: function () {
            return this.propsChange.share();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReactComponent.prototype.mouseover = function () {
        this.props.focus = true;
        this.onHover.emit(this.props.focus);
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype.mouseleave = function () {
        this.props.focus = false;
        this.onHover.emit(this.props.focus);
    };
    /**
     * 监听click事件
     * @param {?} e
     * @return {?}
     */
    ReactComponent.prototype._onClick = function (e) {
        this.onClick.emit(e);
    };
    Object.defineProperty(ReactComponent.prototype, "guid", {
        /**
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._id = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReactComponent.prototype.createGuid = function () {
        return guid();
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype.getNative = function () {
        return this.ele.nativeElement;
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ReactComponent.prototype.setState = function (state) {
        this._stateDiffer = this._differs.find(this.state).create();
        this.state = state;
        this.ngDoCheck();
    };
    /**
     * @param {?} props
     * @return {?}
     */
    ReactComponent.prototype.setProps = function (props) {
        this._propsDiffer = this._differs.find(this.props).create();
        this.props = props;
        this.ngDoCheck();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ReactComponent.prototype.ngOnChanges = function (changes) {
        if ('props' in changes) {
            var /** @type {?} */ value = changes['props'].currentValue;
            this._propsDiffer = this._differs.find(value).create();
        }
        if ('state' in changes) {
            var /** @type {?} */ value = changes['state'].currentValue;
            this._stateDiffer = this._differs.find(value).create();
        }
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype.ngDoCheck = function () {
        if (this._propsDiffer) {
            var /** @type {?} */ changes = this._propsDiffer.diff(this.props);
            if (changes)
                this._propsChanges(changes);
        }
        if (this._stateDiffer) {
            var /** @type {?} */ changes = this._stateDiffer.diff(this.state);
            if (changes)
                this._stateChanges(changes);
        }
    };
    /**
     * @param {?} classObj
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.setClass = function (classObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (var /** @type {?} */ key in classObj) {
            if (classObj[key]) {
                this.render.addClass(ele, key);
            }
            else {
                this.render.removeClass(ele, key);
            }
        }
    };
    /**
     * @param {?} styleObj
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.setStyle = function (styleObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (var /** @type {?} */ key in styleObj) {
            // 检查单位
            var _a = __read(key.split('.'), 2), name = _a[0], unit = _a[1];
            var /** @type {?} */ value = styleObj[key];
            value = value != null && unit ? "" + value + unit : value;
            name = this.humpToHyphen(name);
            this.render.setStyle(ele, name, value);
        }
    };
    /**
     * @param {?} styles
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.removeStyle = function (styles, ele) {
        var _this = this;
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        if (type(styles) == 'array' && type(styles) !== 'undefined') {
            styles.map(function (key) {
                _this.render.removeStyle(ele, key);
            });
        }
        else {
            this.render.removeStyle(ele, styles);
        }
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ReactComponent.prototype.hyphenToHump = function (str) {
        var /** @type {?} */ preg = new RegExp('//-(/w)/g');
        return str.replace(preg, function (all, letter) {
            return letter.toUpperCase();
        });
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ReactComponent.prototype.humpToHyphen = function (str) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.addStyle = function (name, value, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.setStyle(ele, name, value);
    };
    /**
     * @param {?} name
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.addClass = function (name, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.addClass(this.ele.nativeElement, name);
    };
    /**
     * @param {?} classObj
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.setAttribute = function (classObj, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (var /** @type {?} */ key in classObj) {
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
    };
    /**
     * @param {?} name
     * @param {?=} ele
     * @return {?}
     */
    ReactComponent.prototype.removeClass = function (name, ele) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.removeClass(ele, name);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ReactComponent.prototype._stateChanges = function (changes) {
        this.onStateChange(changes);
        this.stateChange.emit(this.state);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ReactComponent.prototype._propsChanges = function (changes) {
        this.onPropsChange(changes);
        this.propsChange.emit(this.props);
    };
    return ReactComponent;
}());
ReactComponent.propDecorators = {
    "state": [{ type: Input },],
    "props": [{ type: Input },],
    "stateChange": [{ type: Output },],
    "propsChange": [{ type: Output },],
    "onClick": [{ type: Output },],
    "onHover": [{ type: Output },],
    "mouseover": [{ type: HostListener, args: ['mouseenter', ['$event'],] },],
    "mouseleave": [{ type: HostListener, args: ['mouseleave', ['$event'],] },],
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
var ReactComponentSetting = /** @class */ (function (_super) {
    __extends(ReactComponentSetting, _super);
    /**
     * @param {?} differs
     * @param {?} ele
     * @param {?} render
     * @param {?} fb
     */
    function ReactComponentSetting(differs, ele, render, fb) {
        var _this = _super.call(this, differs, ele, render) || this;
        _this.fb = fb;
        _this.form = _this.fb.group({});
        return _this;
    }
    /**
     * @return {?}
     */
    ReactComponentSetting.prototype.initStyleForm = function () {
        var _this = this;
        for (var /** @type {?} */ key in this.props["style"]) {
            this.form.addControl(key, new FormControl(this.props["style"][key]));
        }
        this.form.valueChanges.subscribe(function (res) {
            _this.props["style"] = res;
            _this.onStyleChange(res);
        });
    };
    /**
     * @param {?} res
     * @return {?}
     */
    ReactComponentSetting.prototype.onStyleChange = function (res) {
        this.setStyle(res, this.instance.ele.nativeElement);
    };
    return ReactComponentSetting;
}(ReactComponent));
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var NgEachOfContext = /** @class */ (function () {
    /**
     * @param {?} $implicit
     * @param {?} ngForOf
     * @param {?} key
     */
    function NgEachOfContext($implicit, ngForOf, key) {
        this.$implicit = $implicit;
        this.ngForOf = ngForOf;
        this.key = key;
    }
    return NgEachOfContext;
}());
var NgEachOf = /** @class */ (function () {
    /**
     * @param {?} _viewContainer
     * @param {?} _template
     * @param {?} _differs
     */
    function NgEachOf(_viewContainer, _template, _differs) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._differ = null;
    }
    Object.defineProperty(NgEachOf.prototype, "ngForTemplate", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgEachOf.prototype.ngOnChanges = function (changes) {
        if ('ngEachOf' in changes) {
            var /** @type {?} */ value = changes['ngEachOf'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create();
            }
        }
    };
    /**
     * @return {?}
     */
    NgEachOf.prototype.ngDoCheck = function () {
        if (this._differ) {
            var /** @type {?} */ changes = this._differ.diff(this.ngEachOf);
            if (changes)
                this._applyChanges(changes);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgEachOf.prototype._applyChanges = function (changes) {
        var _this = this;
        var /** @type {?} */ insertTuples = [];
        changes.forEachItem(function (item) {
            if (item.previousValue == null) {
                var /** @type {?} */ view = _this._viewContainer.createEmbeddedView(_this._template, new NgEachOfContext(item.currentValue, _this.ngEachOf, item.key), parseInt(item.key, 16));
                var /** @type {?} */ tuple = new RecordViewTuple(item, view, parseInt(item.key, 16));
                insertTuples.push(tuple);
            }
            else if (item.currentValue == null) {
                _this._viewContainer.remove(parseInt(item.key, 16));
            }
            else {
                var /** @type {?} */ view = ((_this._viewContainer.get(parseInt(item.key, 16))));
                _this._viewContainer.move(view, parseInt(item.key, 16));
                var /** @type {?} */ tuple = new RecordViewTuple(item.currentValue, /** @type {?} */ (view), parseInt(item.key, 16));
                insertTuples.push(tuple);
            }
        });
    };
    return NgEachOf;
}());
NgEachOf.decorators = [
    { type: Directive, args: [{ selector: '[ngEach][ngEachOf]' },] },
];
/** @nocollapse */
NgEachOf.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
    { type: KeyValueDiffers, },
]; };
NgEachOf.propDecorators = {
    "ngEachOf": [{ type: Input },],
    "ngForTemplate": [{ type: Input },],
};
var RecordViewTuple = /** @class */ (function () {
    /**
     * @param {?} record
     * @param {?} view
     * @param {?} index
     */
    function RecordViewTuple(record, view, index) {
        this.record = record;
        this.view = view;
        this.index = index;
    }
    return RecordViewTuple;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgComponentDirective = /** @class */ (function () {
    /**
     * @param {?} _viewContainerRef
     */
    function NgComponentDirective(_viewContainerRef) {
        this.viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    NgComponentDirective.prototype.ngOnInit = function () {
        // console.log(this.ngComponentInput);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgComponentDirective.prototype.ngOnChanges = function (changes) {
        this.viewContainerRef.clear();
        this.componentRef = null;
        if (this.ngComponent) {
            var /** @type {?} */ elInjector = this.viewContainerRef.parentInjector;
            var /** @type {?} */ componentFactoryResolver = this.moduleRef ? this.moduleRef.componentFactoryResolver :
                elInjector.get(ComponentFactoryResolver);
            var /** @type {?} */ componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponent);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, elInjector, this.ngComponent);
            this.componentRef.instance.props = this.ngComponentInput;
        }
    };
    return NgComponentDirective;
}());
NgComponentDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngComponent]' },] },
];
/** @nocollapse */
NgComponentDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
NgComponentDirective.propDecorators = {
    "ngComponent": [{ type: Input },],
    "ngComponentInput": [{ type: Input },],
    "Output": [{ type: Output },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ReactCommonModule = /** @class */ (function () {
    function ReactCommonModule() {
    }
    return ReactCommonModule;
}());
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
ReactCommonModule.ctorParameters = function () { return []; };
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
export { ReactComponent, ReactComponentSetting, ReactCommonModule, NgComponentDirective as ɵc, NgEachOf as ɵb, NgEachOfContext as ɵa };
//# sourceMappingURL=ng-react-component.js.map
