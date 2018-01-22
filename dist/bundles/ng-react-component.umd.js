(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/add/operator/share')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/add/operator/share'], factory) :
	(factory((global['ng-react-component'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

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
        this.stateChange = new core.EventEmitter();
        this.propsChange = new core.EventEmitter();
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
    "state": [{ type: core.Input },],
    "props": [{ type: core.Input },],
    "stateChange": [{ type: core.Output },],
    "propsChange": [{ type: core.Output },],
};

exports.ReactComponent = ReactComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-react-component.umd.js.map
