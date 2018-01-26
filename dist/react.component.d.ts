import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { OnChanges, KeyValueChanges, DoCheck, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
export interface KeyValue {
    [key: string]: any;
}
export declare abstract class ReactComponent<P extends KeyValue, T extends KeyValue> implements OnChanges, DoCheck {
    private _differs;
    ele: ElementRef;
    render: Renderer2;
    state: T;
    readonly state$: Observable<KeyValue>;
    props: P;
    readonly props$: Observable<P>;
    stateChange: EventEmitter<T>;
    propsChange: EventEmitter<P>;
    onClick: EventEmitter<any>;
    _onClick(e: any): void;
    private _stateDiffer;
    private _propsDiffer;
    constructor(_differs: KeyValueDiffers, ele: ElementRef, render: Renderer2);
    setState(state: T): void;
    setProps(props: P): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    setClass(classObj: {
        [key: string]: boolean;
    }): void;
    setStyle(styleObj: {
        [key: string]: string;
    }): void;
    removeStyle(styles: any): void;
    addStyle(name: string, value: string): void;
    addClass(name: string): void;
    removeClass(name: string): void;
    private _stateChanges(changes);
    private _propsChanges(changes);
    abstract onPropsChange(changes: KeyValueChanges<string, P>): void;
    abstract onStateChange(changes: KeyValueChanges<string, T>): void;
}
