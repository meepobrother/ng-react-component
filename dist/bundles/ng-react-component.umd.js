(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/add/operator/share'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/add/operator/share', '@angular/forms'], factory) :
	(factory((global['ng-react-component'] = {}),global.ng.core,global.Rx.Observable.prototype,global.ng.forms));
}(this, (function (exports,core,share,forms) { 'use strict';

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
        this.stateChange = new core.EventEmitter();
        this.propsChange = new core.EventEmitter();
        this.onClick = new core.EventEmitter();
        this.onHover = new core.EventEmitter();
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
    /**
     * @param {?} _do
     * @param {?=} params
     * @return {?}
     */
    ReactComponent.prototype.createMobileUrl = function (_do, params) {
        params = params || {};
        params['do'] = _do;
        params['c'] = params['c'] || 'entry';
        params['i'] = params['i'] || '2';
        console.log(params);
        var /** @type {?} */ url = this.puts(params);
        return this.getRoot() + "/app/index.php" + url;
    };
    /**
     * @param {?} _do
     * @param {?=} params
     * @return {?}
     */
    ReactComponent.prototype.createWebUrl = function (_do, params) {
        params = params || {};
        params['do'] = _do;
        params['c'] = params['c'] || 'site';
        params['a'] = params['a'] || 'entry';
        var /** @type {?} */ url = this.puts(params);
        return this.getRoot() + "/web/index.php" + url;
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype.getRoot = function () {
        var _a = window.location, origin = _a.origin, protocol = _a.protocol, port = _a.port, host = _a.host;
        if (core.isDevMode()) {
            return "https://meepo.com.cn";
        }
        else {
            return protocol + "//" + host;
        }
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype.parseURL = function () {
        var /** @type {?} */ ret = {};
        var /** @type {?} */ seg = location.search.replace(/^\?/, '').split('&').filter(function (v, i) {
            if (v !== '' && v.indexOf('=')) {
                return true;
            }
        });
        seg.forEach(function (element, index) {
            var /** @type {?} */ idx = element.indexOf('=');
            var /** @type {?} */ key = element.substring(0, idx);
            var /** @type {?} */ val = element.substring(idx + 1);
            ret[key] = val;
        });
        return ret;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ReactComponent.prototype.get = function (name) {
        var /** @type {?} */ parse = this.parseURL();
        return parse[name] ? parse[name] : '';
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} loc
     * @return {?}
     */
    ReactComponent.prototype.put = function (name, value, loc) {
        var /** @type {?} */ parse = this.parseURL();
        loc = loc || location.search;
        // 是否有
        if (loc.indexOf(name + "=") > -1) {
            loc = loc.replace(name + "=" + parse[name], name + "=" + value);
        }
        else {
            loc = loc + "&" + name + "=" + value;
        }
        return loc;
    };
    /**
     * @param {?} values
     * @return {?}
     */
    ReactComponent.prototype.puts = function (values) {
        var /** @type {?} */ loc = location.search;
        for (var /** @type {?} */ key in values) {
            loc = this.put(key, values[key], loc);
        }
        return loc;
    };
    return ReactComponent;
}());
ReactComponent.propDecorators = {
    "state": [{ type: core.Input },],
    "props": [{ type: core.Input },],
    "stateChange": [{ type: core.Output },],
    "propsChange": [{ type: core.Output },],
    "onClick": [{ type: core.Output },],
    "onHover": [{ type: core.Output },],
    "_onClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
    "_id": [{ type: core.HostBinding, args: ['attr.id',] },],
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
     * @param {?} _props
     */
    function ReactComponentSetting(differs, ele, render, fb, _props) {
        var _this = _super.call(this, differs, ele, render) || this;
        _this.fb = fb;
        _this._props = _props;
        _this.form = _this.fb.group({});
        return _this;
    }
    /**
     * @return {?}
     */
    ReactComponentSetting.prototype.ngOnInit = function () {
        this.instance = this.instance || this._props.instance;
        if (this.instance) {
            this.element = this.instance.ele.nativeElement;
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    ReactComponentSetting.prototype.objToArray = function (obj) {
        var /** @type {?} */ arrs = [];
        for (var /** @type {?} */ key in obj) {
            arrs.push({
                key: key,
                obj: obj
            });
        }
        return arrs;
    };
    /**
     * @return {?}
     */
    ReactComponentSetting.prototype.initStyleForm = function () {
        var _this = this;
        for (var /** @type {?} */ key in this.props["style"]) {
            this.form.addControl(key, new forms.FormControl(this.props["style"][key]));
        }
        this.form.valueChanges.subscribe(function (res) {
            _this.props["style"] = res;
            _this.onStyleChange(res);
        });
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} to
     * @return {?}
     */
    ReactComponentSetting.prototype.checkFormField = function (name, value, to) {
        if (to) {
            if (!to.contains(name)) {
                to.addControl(name, new forms.FormControl(value));
            }
        }
        else {
            if (!this.form.contains(name)) {
                this.form.addControl(name, new forms.FormControl(value));
            }
        }
    };
    /**
     * @param {?} name
     * @param {?} obj
     * @return {?}
     */
    ReactComponentSetting.prototype.checkFormGroup = function (name, obj) {
        var /** @type {?} */ group = this.fb.group({});
        for (var /** @type {?} */ key in obj) {
            this.checkFormField(key, obj[key], group);
        }
        if (!this.form.contains(name)) {
            this.form.addControl(name, group);
        }
    };
    /**
     * @param {?} res
     * @return {?}
     */
    ReactComponentSetting.prototype.onStyleChange = function (res) {
        this.setStyle(res, this.instance.ele.nativeElement);
    };
    /**
     * @return {?}
     */
    ReactComponentSetting.prototype.removeSelf = function () {
        var /** @type {?} */ props = this._props.getPropsByUid(this.guid);
        this._props.removePropsByUid(props.uuid);
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
    { type: core.Directive, args: [{ selector: '[ngEach][ngEachOf]' },] },
];
/** @nocollapse */
NgEachOf.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.TemplateRef, },
    { type: core.KeyValueDiffers, },
]; };
NgEachOf.propDecorators = {
    "ngEachOf": [{ type: core.Input },],
    "ngForTemplate": [{ type: core.Input },],
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
var NgComponentPreviewDirective = /** @class */ (function () {
    /**
     * @param {?} _viewContainerRef
     */
    function NgComponentPreviewDirective(_viewContainerRef) {
        this.viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    NgComponentPreviewDirective.prototype.ngOnInit = function () {
        // console.log(this.ngComponentInput);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgComponentPreviewDirective.prototype.ngOnChanges = function (changes) {
        this.viewContainerRef.clear();
        this.componentRef = null;
        if (this.ngComponent) {
            var /** @type {?} */ elInjector = this.viewContainerRef.parentInjector;
            var /** @type {?} */ componentFactoryResolver = this.moduleRef ? this.moduleRef.componentFactoryResolver :
                elInjector.get(core.ComponentFactoryResolver);
            var /** @type {?} */ componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngComponent);
            this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, elInjector, this.ngComponent);
            this.componentRef.instance.props = this.ngComponentInput;
        }
    };
    return NgComponentPreviewDirective;
}());
NgComponentPreviewDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ngComponentPreview]' },] },
];
/** @nocollapse */
NgComponentPreviewDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
]; };
NgComponentPreviewDirective.propDecorators = {
    "ngComponent": [{ type: core.Input },],
    "ngComponentInput": [{ type: core.Input },],
    "Output": [{ type: core.Output },],
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
    { type: core.NgModule, args: [{
                exports: [
                    NgEachOf,
                    NgComponentPreviewDirective
                ],
                declarations: [
                    NgEachOf,
                    NgComponentPreviewDirective
                ]
            },] },
];
/** @nocollapse */
ReactCommonModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CreateLib = /** @class */ (function () {
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
    function CreateLib(name, title, props, children, father, uuid, state, items) {
        if (props === void 0) { props = {}; }
        if (children === void 0) { children = []; }
        if (father === void 0) { father = null; }
        if (uuid === void 0) { uuid = null; }
        if (state === void 0) { state = {}; }
        if (items === void 0) { items = []; }
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
    return CreateLib;
}());
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

exports.ReactComponent = ReactComponent;
exports.ReactComponentSetting = ReactComponentSetting;
exports.ReactCommonModule = ReactCommonModule;
exports.CreateLib = CreateLib;
exports.uuid = guid$1;
exports.ɵc = NgComponentPreviewDirective;
exports.ɵb = NgEachOf;
exports.ɵa = NgEachOfContext;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-react-component.umd.js.map
