
import { EventEmitter, NgZone, Input, Output, KeyValueDiffer } from '@angular/core';
import { OnChanges, KeyValueChanges, DoCheck, KeyValueDiffers } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

function defaults(target: any, options: any): KeyValue {
    if (target === null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }
    if (options) {
        target = { ...target, ...options };
    }
    return target;
}
export interface KeyValue {
    [key: string]: any;
}
export abstract class ReactComponent<P extends KeyValue, T extends KeyValue> {
    private _state: T;
    @Input()
    set state(val: T) {
        this.setState(val);
    }
    get state(): T {
        return this._state;
    }
    get state$(): Observable<KeyValue> {
        return this.stateChange.share();
    }
    private _props: P;
    @Input()
    set props(val: P) {
        this.setProps(val);
    }
    get props(): P {
        return this._props;
    }
    get props$(): Observable<P> {
        return this.propsChange.share();
    }
    @Output() stateChange: EventEmitter<T> = new EventEmitter();
    @Output() propsChange: EventEmitter<P> = new EventEmitter();
    private _stateDiffer: KeyValueDiffer<string, any>;
    private _propsDiffer: KeyValueDiffer<string, any>;
    constructor(
        private _differs: KeyValueDiffers
    ) {
        this._props = {} as P;
        this._state = {} as T;

    }

    setState(state: T): Observable<KeyValue> {
        this._stateChanges();
        this._state = defaults(this._state, state) as T;
        const diffter = this._stateDiffer.diff(this._state);
        if (diffter) {
            this.onStateChange(diffter);
            this.stateChange.emit(this._state);
        }
        return this.state$;
    }

    setProps(props: P): Observable<P> {
        this._propsChanges();
        this._props = defaults(this._props, props) as P;
        const diffter = this._propsDiffer.diff(this._props);
        if (diffter) {
            this.onPropsChange(diffter);
            this.propsChange.emit(this._props);
        }
        return this.props$;
    }
    private _stateChanges() {
        this._stateDiffer = this._differs.find(this._state).create();
        return this._stateDiffer.diff(this._state);
    }
    private _propsChanges() {
        this._propsDiffer = this._differs.find(this._props).create();
        return this._propsDiffer.diff(this._props);
    }
    abstract onPropsChange(changes: KeyValueChanges<string, any>): void;
    abstract onStateChange(changes: KeyValueChanges<string, any>): void;
}
