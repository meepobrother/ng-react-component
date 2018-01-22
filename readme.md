# ReactComponent<P,T> 

```ts
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
```

- 使用

```html
<h2>{{props.title}}</h2>
<div *ngIf="state.loading"></div>
```

- or

```html
<h2>{{(props$|async).title}}</h2>
<div *ngIf="(state$|async).loading"></div>
```

```ts
export interface SomeProps{
    title: string;
}
export interface SomeState{
    loading: boolean;
}
export class SomeComponennt extends ReactComponent<SomeProps,SomeState> implements OnInit{
    constructor(){
        this.setState({
            loading: true
        });
        this.setProps({
            title: '测试使用'
        });
    }

    ngOnInit(){
        this.setState({
            loading: false
        })
    }
}
```