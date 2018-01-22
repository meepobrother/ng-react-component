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
var ReactComponent = /** @class */ (function () {
    /**
     * @param {?} _differs
     */
    function ReactComponent(_differs) {
        this._differs = _differs;
        this.stateChange = new EventEmitter();
        this.propsChange = new EventEmitter();
    }
    Object.defineProperty(ReactComponent.prototype, "state", {
        /**
         * @return {?}
         */
        get: function () {
            return /** @type {?} */ (defaults(this.getInitialState(), this._props));
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._state = val;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(ReactComponent.prototype, "props", {
        /**
         * @return {?}
         */
        get: function () {
            return /** @type {?} */ (defaults(this.getDefaultProps(), this._props));
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this._props = val;
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
     * @param {?} state
     * @param {?=} key
     * @return {?}
     */
    ReactComponent.prototype.setState = function (state, key) {
        this._stateChanges();
        this.state = /** @type {?} */ (defaults(this.state, state));
        var /** @type {?} */ diffter = this._stateDiffer.diff(this.state);
        if (diffter) {
            this.onStateChange(diffter);
            this.stateChange.emit(this.state);
        }
        return this.state$;
    };
    /**
     * @param {?} props
     * @param {?=} key
     * @return {?}
     */
    ReactComponent.prototype.setProps = function (props, key) {
        this._propsChanges();
        this.props = /** @type {?} */ (defaults(this.props, props));
        var /** @type {?} */ diffter = this._propsDiffer.diff(this.props);
        if (diffter) {
            this.onPropsChange(diffter);
            this.propsChange.emit(this.props);
        }
        return this.props$;
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype._stateChanges = function () {
        this._stateDiffer = this._differs.find(this.state).create();
        return this._stateDiffer.diff(this.state);
    };
    /**
     * @return {?}
     */
    ReactComponent.prototype._propsChanges = function () {
        this._propsDiffer = this._differs.find(this.props).create();
        return this._propsDiffer.diff(this.props);
    };
    return ReactComponent;
}());
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
