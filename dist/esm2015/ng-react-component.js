import { Directive, EventEmitter, Input, KeyValueDiffers, NgModule, Output, TemplateRef, ViewContainerRef } from '@angular/core';
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set state(val) {
        this._state = val;
    }
    /**
     * @return {?}
     */
    get state() {
        return /** @type {?} */ (defaults(this.getInitialState(), this._state));
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
        this._props = val;
    }
    /**
     * @return {?}
     */
    get props() {
        return /** @type {?} */ (defaults(this.getDefaultProps(), this._props));
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
        this.state = /** @type {?} */ (defaults(this.state, state));
        const /** @type {?} */ diffter = this._stateDiffer.diff(this.state);
        if (diffter) {
            this.onStateChange(diffter);
            this.stateChange.emit(this.state);
        }
        return this.state$;
    }
    /**
     * @param {?} props
     * @return {?}
     */
    setProps(props) {
        this._propsChanges();
        this.props = /** @type {?} */ (defaults(this.props, props));
        const /** @type {?} */ diffter = this._propsDiffer.diff(this.props);
        if (diffter) {
            this.onPropsChange(diffter);
            this.propsChange.emit(this.props);
        }
        return this.props$;
    }
    /**
     * @return {?}
     */
    _stateChanges() {
        this._stateDiffer = this._differs.find(this.state).create();
        return this._stateDiffer.diff(this.state);
    }
    /**
     * @return {?}
     */
    _propsChanges() {
        this._propsDiffer = this._differs.find(this.props).create();
        return this._propsDiffer.diff(this.props);
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
class ReactCommonModule {
}
ReactCommonModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    NgEachOf
                ],
                declarations: [
                    NgEachOf
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

export { ReactComponent, ReactCommonModule, NgEachOf as ɵb, NgEachOfContext as ɵa };
//# sourceMappingURL=ng-react-component.js.map
