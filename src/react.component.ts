
import {
    EventEmitter, NgZone, Input, Output,
    KeyValueDiffer, HostListener, HostBinding, ElementRef,
    Renderer2
} from '@angular/core';
import { OnChanges, KeyValueChanges, DoCheck, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
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
    children: any[];
}

export interface ReactBase extends KeyValue {
    // 可拖拽
    canDrag?: boolean;
    // 可放置
    canDrop?: boolean;
    // 可移动
    canMove?: boolean;
    // 可缩放
    canScale?: boolean;
    // focus
    focus?: boolean;
    // 可配置
    canSetting?: boolean;
}

export abstract class ReactComponent<P extends ReactBase, T extends KeyValue> implements OnChanges, DoCheck {
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
    @Output() onHover: EventEmitter<any> = new EventEmitter();

    @HostListener('mouseenter', ['$event'])
    mouseover() {
        this.props.focus = true;
        this.onHover.emit(this.props.focus);
    }
    @HostListener('mouseleave', ['$event'])
    mouseleave() {
        this.props.focus = false;
        this.onHover.emit(this.props.focus);
    }
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

    set guid(val: string) {
        this._id = val;
    }
    get guid() {
        return this._id;
    }
    instance: any;
    @HostBinding('attr.id') _id: string;
    constructor(
        private _differs: KeyValueDiffers,
        public ele: ElementRef,
        public render: Renderer2
    ) {
        this.props = {
            children: []
        } as P;
        this.state = {} as T;
    }

    createGuid() {
        return guid();
    }

    getNative() {
        return this.ele.nativeElement;
    }

    setState(state: T): void {
        this._stateDiffer = this._differs.find(this.state).create();
        this.state = state;
        this.ngDoCheck();
    }

    setProps(props: P): void {
        this._propsDiffer = this._differs.find(this.props).create();
        this.props = props;
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

    setClass(classObj: { [key: string]: boolean }, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const key in classObj) {
            if (classObj[key]) {
                this.render.addClass(ele, key);
            } else {
                this.render.removeClass(ele, key);
            }
        }
    }

    setStyle(styleObj: { [key: string]: string }, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const key in styleObj) {
            // 检查单位
            let [name, unit] = key.split('.');
            let value = styleObj[key];
            value = value != null && unit ? `${value}${unit}` : value;
            name = this.humpToHyphen(name);
            this.render.setStyle(ele, name, value);
        }
    }

    removeStyle(styles: any, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        if (type(styles) == 'array' && type(styles) !== 'undefined') {
            styles.map(key => {
                this.render.removeStyle(ele, key);
            });
        } else {
            this.render.removeStyle(ele, styles);
        }
    }
    // 下划线转驼峰
    hyphenToHump(str: string) {
        const preg = new RegExp('//-(/w)/g');
        return str.replace(preg, (all, letter) => {
            return letter.toUpperCase();
        });
    }
    // 驼峰转下划线
    humpToHyphen(str: string) {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    addStyle(name: string, value: string, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.setStyle(ele, name, value);
    }

    addClass(name: string, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.addClass(this.ele.nativeElement, name);
    }

    setAttribute(classObj: { [key: string]: any }, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        for (const key in classObj) {
            if (type(classObj[key]) === 'boolean') {
                if (classObj[key]) {
                    this.render.setAttribute(ele, key, 'true');
                } else {
                    this.render.removeAttribute(ele, key);
                }
            } else {
                this.render.setAttribute(ele, key, classObj[key]);
            }
        }
    }

    removeClass(name: string, ele?: HTMLElement) {
        ele = ele || this.getNative();
        if (!ele) {
            return '';
        }
        this.render.removeClass(ele, name);
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
