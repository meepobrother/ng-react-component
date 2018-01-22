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

### some.html
```html
<h2>{{props.title}}</h2>
<div *ngIf="state.loading"></div>
```

- or

```html
<h2>{{(props$|async).title}}</h2>
<div *ngIf="(state$|async).loading"></div>
```

### some.ts
```ts
export interface SomeProps{
    title: string;
}
export interface SomeState{
    loading: boolean;
}
@Component({
    selector: 'some-com',
    templateUrl: './some.html'
})
export class SomeComponennt extends ReactComponent<SomeProps,SomeState> implements OnInit{
    constructor(){ 
        super();
    }

    ngOnInit(){}

    changeTitle(){
        this.setProps({
            title: '测试使用'
        });
    }

    hideLoading(){
        this.setState({
            loading: false
        });
    }
}
```

### app.component.html

```html
<some-com [props]="props" [state]="state" (propsChange)="_propsChange($event)" (propsChange)="_stateChange($event)"></some-com>
```

### app.component.ts

```ts
export class AppComponent {
    props: SomeProps = {
        title: 'some title'
    }

    state: SomeState = {
        loading: true
    }

    _propsChange(props: SomeProps){
        console.log(props);
    }

    _stateChange(state: SomeState){
        console.log(state);
    }
}
```