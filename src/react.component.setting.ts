import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// 设置
import { DesignPropsService } from 'meepo-idesign-share';
export abstract class ReactComponentSetting<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    form: FormGroup;
    instance: any;
    element: HTMLElement;
    constructor(
        differs: KeyValueDiffers,
        ele: ElementRef,
        render: Renderer2,
        public fb: FormBuilder,
        public _props: DesignPropsService
    ) {
        super(differs, ele, render);
        this.form = this.fb.group({});
    }

    ngOnInit() {
        this.instance = this.instance || this._props.instance;
        if (this.instance) {
            this.element = this.instance.ele.nativeElement;
            this.initStyleForm();
        }
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

    checkFormField(name: string, value: any, to?: FormGroup) {
        if (to) {
            if (!to.contains(name)) {
                to.addControl(name, new FormControl(value))
            }
        } else {
            if (!this.form.contains(name)) {
                this.form.addControl(name, new FormControl(value))
            }
        }
    }

    checkFormGroup(name: string, obj: any) {
        let group = this.fb.group({});
        for (const key in obj) {
            this.checkFormField(key, obj[key], group);
        }
        if (!this.form.contains(name)) {
            this.form.addControl(name, group);
        }
    }

    onStyleChange(res) {
        this.setStyle(res, this.instance.ele.nativeElement);
    }

    removeSelf() {
        const props: any = this._props.getPropsByUid(this.guid);
        this._props.removePropsByUid(props.uuid);
    }
}