import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export declare abstract class ReactComponentSetting<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    fb: FormBuilder;
    form: FormGroup;
    constructor(differs: KeyValueDiffers, ele: ElementRef, render: Renderer2, fb: FormBuilder);
    initStyleForm(): void;
    onStyleChange(res: any): void;
}
