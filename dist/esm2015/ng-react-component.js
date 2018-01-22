import { EventEmitter, Input, Output } from '@angular/core';
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
        return /** @type {?} */ (defaults(this.getInitialState(), this._props));
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
     * @param {?=} key
     * @return {?}
     */
    setState(state, key) {
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
     * @param {?=} key
     * @return {?}
     */
    setProps(props, key) {
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
 * Generated bundle index. Do not edit.
 */

export { ReactComponent };
//# sourceMappingURL=ng-react-component.js.map
