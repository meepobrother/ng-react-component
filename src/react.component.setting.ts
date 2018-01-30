import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
export abstract class ReactComponentSetting<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
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
        for (const key in this.props.style) {
            this.form.addControl(key, new FormControl(this.props.style[key]));
        }
        this.form.valueChanges.subscribe(res => {
            this.props.style = res;
            this.onStyleChange(res);
        });
    }

    onStyleChange(res) {
        this.setStyle(res, this.instance.ele.nativeElement);
    }
}