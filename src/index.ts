import { EventEmitter, NgZone, Input, Output } from '@angular/core';
import { OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
function defaults(target: any, options: any) {
    if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }
    if (options) {
        target = { ...target, ...options };
    }
    return target;
}
export class ReactComponent<P, T> {
    private _state: T;
    @Input()
    set state(val: T) {
        if (val && val !== this._state) {
            this._state = val;
            this.stateChange.emit(this._state);
        }
    }
    get state(): T {
        return this._state || {} as T;
    }
    get state$(): Observable<T> {
        return this.stateChange.share();
    }
    private _props: P;
    @Input()
    set props(val: P) {
        if (val && val !== this._props) {
            this._props = val;
            this.propsChange.emit(this._props);
        }
    }
    get props(): P {
        return this._props || {} as P;
    }
    get props$(): Observable<P> {
        return this.propsChange.share();
    }
    @Output() stateChange: EventEmitter<T> = new EventEmitter();
    @Output() propsChange: EventEmitter<P> = new EventEmitter();
    constructor() { }
    private _extends(dest: any, source: any) {
        return { ...dest, ...source };
    }
    setState(state: T): void {
        this.state = defaults(state, this._state);
    }

    setProps(props: P): void {
        this.props = defaults(props, this._props as any);
    }
}
