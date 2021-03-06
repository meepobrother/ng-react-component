
import {
    EventEmitter, NgZone, Input, Output,
    KeyValueDiffer, HostListener, HostBinding, ElementRef,
    Renderer2, isDevMode
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
    @HostListener('click', ['$event'])
    _onClick(e: Event) {
        this.onClick.emit(e);
    }

    @Input() params = {};
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

    public createMobileUrl(_do: string, params?: any, isDev: boolean = false) {
        params = params || {};
        params = { ...params, ...this.params };
        params['do'] = _do;
        params['c'] = params['c'] || 'entry';
        params['i'] = params['i'] || '2';
        let url = this.puts(params);
        return `${this.getRoot()}/app/index.php${url}`;
    }
    public createWebUrl(_do: string, params?: any, isDev: boolean = false) {
        params = params || {};
        params = { ...params, ...this.params };
        params['do'] = _do;
        params['c'] = params['c'] || 'site';
        params['a'] = params['a'] || 'entry';
        params['i'] = params['i'] || '2';
        let url = ``;
        if (!isDevMode() || isDev) {
            return `${this.getRoot()}/web/index.php${this.puts(params)}`;
        } else {
            return `/assets/data/${params['i']}/web/${_do}.json`
        }
    }

    private getRoot() {
        const { origin, protocol, port, host } = window.location;
        if (isDevMode()) {
            return `https://meepo.com.cn`;
        } else {
            return `${protocol}//${host}`;
        }
    }

    private parseURL(): { [k: string]: string } {
        const ret = {};
        const seg = location.search.replace(/^\?/, '').split('&').filter(function (v, i) {
            if (v !== '' && v.indexOf('=')) {
                return true;
            }
        });
        seg.forEach((element, index) => {
            const idx = element.indexOf('=');
            const key = element.substring(0, idx);
            const val = element.substring(idx + 1);
            ret[key] = val;
        });
        return ret;
    }

    public get(name: string): string {
        const parse = this.parseURL();
        return parse[name] ? parse[name] : '';
    }

    public put(name: string, value: any, loc?: string) {
        const parse = this.parseURL();
        loc = loc || location.search;
        // 是否有
        if (loc.indexOf(`${name}=`) > -1) {
            loc = loc.replace(`${name}=${parse[name]}`, `${name}=${value}`);
        } else {
            loc = `${loc}&${name}=${value}`;
        }
        return loc;
    }

    public puts(values: { [k: string]: string }) {
        let loc = location.search;
        for (const key in values) {
            loc = this.put(key, values[key], loc);
        }
        return loc;
    }
    abstract onPropsChange(changes: KeyValueChanges<string, P>): void;
    abstract onStateChange(changes: KeyValueChanges<string, T>): void;
}
