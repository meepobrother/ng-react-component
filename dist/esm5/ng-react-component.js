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
var ReactComponent = (function () {
    function ReactComponent() {
        this.stateChange = new EventEmitter();
        this.propsChange = new EventEmitter();
    }
    Object.defineProperty(ReactComponent.prototype, "state", {
        /**
         * @return {?}
         */
        get: function () {
            return this._state || ({});
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val && val !== this._state) {
                this._state = val;
                this.stateChange.emit(this._state);
            }
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
            return this._props || ({});
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val && val !== this._props) {
                this._props = val;
                this.propsChange.emit(this._props);
            }
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
     * @param {?} dest
     * @param {?} source
     * @return {?}
     */
    ReactComponent.prototype._extends = function (dest, source) {
        return Object.assign({}, dest, source);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ReactComponent.prototype.setState = function (state) {
        this.state = defaults(state, this._state);
    };
    /**
     * @param {?} props
     * @return {?}
     */
    ReactComponent.prototype.setProps = function (props) {
        this.props = defaults(props, /** @type {?} */ (this._props));
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
