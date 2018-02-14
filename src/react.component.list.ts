import { ReactComponent, KeyValue } from './react.component';
import { KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// 设置
import { DesignPropsService } from 'meepo-idesign-share';
export abstract class ReactComponentList<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    _allChecked = false;
    _indeterminate = false;
    _displayData = [];
    data: any = [];
    constructor(
        differs: KeyValueDiffers,
        ele: ElementRef,
        render: Renderer2
    ) {
        super(differs, ele, render);
    }

    _displayDataChange($event) {
        this._displayData = $event;
        this._refreshStatus();
    }

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.disabled || value.checked);
        const allUnChecked = this._displayData.every(value => value.disabled || !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => {
                if (!data.disabled) {
                    data.checked = true;
                }
            });
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }
}