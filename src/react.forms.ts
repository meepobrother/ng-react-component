import { ReactComponent, KeyValue } from './react.component';
import { KeyValueChanges, KeyValueDiffers } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export abstract class ReactForms<P extends KeyValue, T extends KeyValue> extends ReactComponent<P, T> {
    form: FormGroup;

    abstract initForms(): void;
}
