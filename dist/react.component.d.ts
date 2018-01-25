import { EventEmitter } from '@angular/core';
import { KeyValueChanges, KeyValueDiffers } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
export interface KeyValue {
    [key: string]: any;
}
export declare abstract class ReactComponent<P extends KeyValue, T extends KeyValue> {
    private _differs;
    private _state;
    state: T;
    readonly state$: Observable<KeyValue>;
    private _props;
    props: P;
    readonly props$: Observable<P>;
    stateChange: EventEmitter<T>;
    propsChange: EventEmitter<P>;
    private _stateDiffer;
    private _propsDiffer;
    constructor(_differs: KeyValueDiffers);
    setState(state: T): Observable<KeyValue>;
    setProps(props: P): Observable<P>;
    private _stateChanges();
    private _propsChanges();
    abstract onPropsChange(changes: KeyValueChanges<string, any>): void;
    abstract onStateChange(changes: KeyValueChanges<string, any>): void;
}
