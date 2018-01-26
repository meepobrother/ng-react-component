# ReactComponent<P,T> 

```ts
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
    addClass(name: string): void;
    removeClass(name: string): void;
    addStyle(name: string, value: string): void;
    removeStyle(name: string): void;
    private _stateChanges(changes);
    private _propsChanges(changes);
    abstract onPropsChange(changes: KeyValueChanges<string, P>): void;
    abstract onStateChange(changes: KeyValueChanges<string, T>): void;
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