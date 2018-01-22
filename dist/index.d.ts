import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
export declare class ReactComponent<P, T> {
    private _state;
    state: T;
    readonly state$: Observable<T>;
    private _props;
    props: P;
    readonly props$: Observable<P>;
    stateChange: EventEmitter<T>;
    propsChange: EventEmitter<P>;
    constructor();
    private _extends(dest, source);
    setState(state: T): void;
    setProps(props: P): void;
}
