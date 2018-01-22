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
    if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }
    if (options) {
        target = Object.assign({}, target, options);
    }
    return target;
}
class ReactComponent {
    constructor() {
        this.stateChange = new EventEmitter();
        this.propsChange = new EventEmitter();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set state(val) {
        if (val && val !== this._state) {
            this._state = val;
            this.stateChange.emit(this._state);
        }
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state || /** @type {?} */ ({});
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
        if (val && val !== this._props) {
            this._props = val;
            this.propsChange.emit(this._props);
        }
    }
    /**
     * @return {?}
     */
    get props() {
        return this._props || /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    get props$() {
        return this.propsChange.share();
    }
    /**
     * @param {?} dest
     * @param {?} source
     * @return {?}
     */
    _extends(dest, source) {
        return Object.assign({}, dest, source);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this.state = defaults(state, this._state);
    }
    /**
     * @param {?} props
     * @return {?}
     */
    setProps(props) {
        this.props = defaults(props, /** @type {?} */ (this._props));
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
