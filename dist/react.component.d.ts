import { EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { OnChanges, KeyValueChanges, DoCheck, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
export interface KeyValue {
    [key: string]: any;
    children: any[];
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
    /**
     * 监听click事件
     * @param e
     */
    _onClick(e: Event): void;
    private _stateDiffer;
    private _propsDiffer;
    guid: string;
    instance: any;
    _id: string;
    constructor(_differs: KeyValueDiffers, ele: ElementRef, render: Renderer2);
    createGuid(): string;
    getNative(): any;
    setState(state: T): void;
    setProps(props: P): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    setClass(classObj: {
        [key: string]: boolean;
    }, ele?: HTMLElement): string;
    setStyle(styleObj: {
        [key: string]: string;
    }, ele?: HTMLElement): string;
    removeStyle(styles: any, ele?: HTMLElement): void;
    hyphenToHump(str: string): string;
    humpToHyphen(str: string): string;
    addStyle(name: string, value: string, ele?: HTMLElement): string;
    addClass(name: string, ele?: HTMLElement): string;
    setAttribute(classObj: {
        [key: string]: any;
    }, ele?: HTMLElement): string;
    removeClass(name: string, ele?: HTMLElement): string;
    private _stateChanges(changes);
    private _propsChanges(changes);
    abstract onPropsChange(changes: KeyValueChanges<string, P>): void;
    abstract onStateChange(changes: KeyValueChanges<string, T>): void;
}
