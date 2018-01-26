
import {
    EventEmitter, NgZone, Input, Output,
    KeyValueDiffer, HostListener, HostBinding, ElementRef,
    Renderer2
} from '@angular/core';
import { OnChanges, KeyValueChanges, DoCheck, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { guid } from 'meepo-common';
function type(val): string {
    return typeof val;
}
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
export abstract class ReactComponent<P extends KeyValue, T extends KeyValue> implements OnChanges, DoCheck {
    @Input() state: T;
    get state$(): Observable<KeyValue> {
        return this.stateChange.share();
    }
    @Input() props: P;
    get props$(): Observable<P> {
        return this.propsChange.share();
    }
    @Output() stateChange: EventEmitter<T> = new EventEmitter();
    @Output() propsChange: EventEmitter<P> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    /**
     * 监听click事件
     * @param e 
     */
    @HostListener('click', ['$event'])
    _onClick(e: Event) {
        this.onClick.emit(e);
    }
    private _stateDiffer: KeyValueDiffer<string, any>;
    private _propsDiffer: KeyValueDiffer<string, any>;
    guid: string = guid();
    constructor(
        private _differs: KeyValueDiffers,
        public ele: ElementRef,
        public render: Renderer2
    ) {
        this.props = {} as P;
        this.state = {} as T;
    }

    setState(state: T): void {
        this._stateDiffer = this._differs.find(this.state).create();
        this.state = defaults(this.state, state) as T;
        this.ngDoCheck();
    }

    setProps(props: P): void {
        this._propsDiffer = this._differs.find(this.props).create();
        this.props = defaults(this.props, props) as P;
        this.ngDoCheck();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('props' in changes) {
            const value = changes['props'].currentValue;
            this._propsDiffer = this._differs.find(value).create();
        }
        if ('state' in changes) {
            const value = changes['state'].currentValue;
            this._stateDiffer = this._differs.find(value).create();
        }
    }

    ngDoCheck(): void {
        if (this._propsDiffer) {
            const changes = this._propsDiffer.diff(this.props);
            if (changes) this._propsChanges(changes);
        }
        if (this._stateDiffer) {
            const changes = this._stateDiffer.diff(this.state);
            if (changes) this._stateChanges(changes);
        }
    }

    setClass(classObj: { [key: string]: boolean }) {
        for (const key in classObj) {
            if (classObj[key]) {
                this.render.addClass(this.ele.nativeElement, key);
            } else {
                this.render.removeClass(this.ele.nativeElement, key);
            }
        }
    }

    setStyle(styleObj: { [key: string]: string }) {
        for (const key in styleObj) {
            this.render.setStyle(this.ele.nativeElement, key, styleObj[key]);
        }
    }

    removeStyle(styles: any) {
        if (type(styles) == 'array') {
            styles.map(key => {
                this.render.removeStyle(this.ele.nativeElement, key);
            });
        } else {
            this.render.removeStyle(this.ele.nativeElement, styles);
        }
    }

    addStyle(name: string, value: string) {
        this.render.setStyle(this.ele.nativeElement, name, value);
    }

    addClass(name: string) {
        this.render.addClass(this.ele.nativeElement, name);
    }

    setAttribute(classObj: { [key: string]: any }) {
        for (const key in classObj) {
            if (type(classObj[key]) === 'boolean') {
                if (classObj[key]) {
                    this.render.setAttribute(this.ele.nativeElement, key, 'true');
                } else {
                    this.render.removeAttribute(this.ele.nativeElement, key);
                }
            } else {
                this.render.setAttribute(this.ele.nativeElement, key, classObj[key]);
            }
        }
    }

    removeClass(name: string) {
        this.render.removeClass(this.ele.nativeElement, name);
    }

    private _stateChanges(changes: KeyValueChanges<string, T>) {
        this.onStateChange(changes);
        this.stateChange.emit(this.state);
    }
    private _propsChanges(changes) {
        this.onPropsChange(changes);
        this.propsChange.emit(this.props);
    }
    abstract onPropsChange(changes: KeyValueChanges<string, P>): void;
    abstract onStateChange(changes: KeyValueChanges<string, T>): void;
}
