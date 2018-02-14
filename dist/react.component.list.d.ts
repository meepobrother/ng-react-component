import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
export declare abstract class ReactComponentList<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    _allChecked: boolean;
    _indeterminate: boolean;
    _displayData: any[];
    data: any;
    constructor(differs: KeyValueDiffers, ele: ElementRef, render: Renderer2);
    _displayDataChange($event: any): void;
    _refreshStatus(): void;
    _checkAll(value: any): void;
}
