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
        this._state = val;
    }
    get state(): T {
        return defaults(this.getInitialState(), this._props) as T;
    }
    get state$(): Observable<KeyValue> {
        return this.stateChange.share();
    }
    private _props: P;
    @Input()
    set props(val: P) {
        this._props = val;
    }
    get props(): P {
        return defaults(this.getDefaultProps(), this._props) as P;
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
    ) { }
    setState(state: T, key?: string): Observable<KeyValue> {
        this._stateChanges();
        this.state = defaults(this.state, state) as T;
        const diffter = this._stateDiffer.diff(this.state);
        if (diffter) {
            this.onStateChange(diffter);
            this.stateChange.emit(this.state);
        }
        return this.state$;
    }
    setProps(props: P, key?: string): Observable<P> {
        this._propsChanges();
        this.props = defaults(this.props, props) as P;
        const diffter = this._propsDiffer.diff(this.props);
        if (diffter) {
            this.onPropsChange(diffter);
            this.propsChange.emit(this.props);
        }
        return this.props$;
    }
    private _stateChanges() {
        this._stateDiffer = this._differs.find(this.state).create();
        return this._stateDiffer.diff(this.state);
    }
    private _propsChanges() {
        this._propsDiffer = this._differs.find(this.props).create();
        return this._propsDiffer.diff(this.props);
    }
    abstract onPropsChange(changes: KeyValueChanges<string, any>): void;
    abstract onStateChange(changes: KeyValueChanges<string, any>): void;
    abstract getDefaultProps(): P;
    abstract getInitialState(): T;
}
