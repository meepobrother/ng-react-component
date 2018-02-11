import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DesignPropsService } from 'meepo-idesign-share';
export declare abstract class ReactComponentSetting<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    fb: FormBuilder;
    _props: DesignPropsService;
    form: FormGroup;
    instance: any;
    element: HTMLElement;
    constructor(differs: KeyValueDiffers, ele: ElementRef, render: Renderer2, fb: FormBuilder, _props: DesignPropsService);
    ngOnInit(): void;
    initStyleForm(): void;
    checkFormField(name: string, value: any, to?: FormGroup): void;
    checkFormGroup(name: string, obj: any): void;
    onStyleChange(res: any): void;
    removeSelf(): void;
}
