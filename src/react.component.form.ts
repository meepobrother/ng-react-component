import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// 表单
export interface ReactFormProps extends KeyValue {
    form: FormBuilder;
    url: string;
}
export abstract class ReactComponentForm<P extends ReactFormProps, T extends KeyValue> extends ReactComponent<P, T> {
    form: FormGroup;
    constructor(
        differs: KeyValueDiffers,
        ele: ElementRef,
        render: Renderer2,
        public fb: FormBuilder
    ) {
        super(differs, ele, render);
        this.form = this.fb.group({});
    }

    initStyleForm() {
        for (const key in this.props.form) {
            this.form.addControl(key, new FormControl(this.props.form[key]));
        }
        this.form.valueChanges.subscribe(res => {
            this.props.form = res;
            this.onValueChange(res);
        });
    }

    onValueChange(res) {
        console.log(res);
    }
}