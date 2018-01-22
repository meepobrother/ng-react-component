# ReactComponent<P,T> 

```ts
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
    setState(state: T, key?: string): Observable<KeyValue>;
    setProps(props: P, key?: string): Observable<P>;
    private _stateChanges();
    private _propsChanges();
    abstract onPropsChange(changes: KeyValueChanges<string, any>): void;
    abstract onStateChange(changes: KeyValueChanges<string, any>): void;
    abstract getDefaultProps(): P;
    abstract getInitialState(): T;
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
import { ReactComponent } from 'ng-react-component';
import { KeyValueChanges, KeyValueDiffers } from '@angular/core';

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
    constructor(
        differs: KeyValueDiffers
    ){ 
        super(differs);
    }

    ngOnInit() { }

    changeTitle() {
        this.setProps({
            title: '测试使用'
        });
    }

    hideLoading() {
        this.setState({
            loading: false
        });
    }

    onPropsChange(changes: KeyValueChanges<string, SomeProps>){

    }
    onStateChange(changes: KeyValueChanges<string, SomeState>){

    }

    getDefaultProps(): SomeProps{
        return {
            title: ''
        }
    }

    getInitialState(): SomeState{
        return {
            loading: false
        }
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