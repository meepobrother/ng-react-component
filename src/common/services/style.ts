import {
    Directive, DoCheck, ElementRef, Input, KeyValueChanges,
    KeyValueDiffer, KeyValueDiffers, Renderer2, Injectable
} from '@angular/core';

@Injectable()
export class StyleService {
    private _ngStyle: { [key: string]: string };
    private _differ: KeyValueDiffer<string, string | number>;
    constructor(
        private _differs: KeyValueDiffers,
        private _ngEl: ElementRef,
        private _renderer: Renderer2
    ) { }

    set ngStyle(v: { [key: string]: string }) {
        this._ngStyle = v;
        if (!this._differ && v) {
            this._differ = this._differs.find(v).create();
            this.ngDoCheck();
        }
    }

    private ngDoCheck() {
        if (this._differ) {
            const changes = this._differ.diff(this._ngStyle);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    }
    private _applyChanges(changes: KeyValueChanges<string, string | number>): void {
        changes.forEachRemovedItem((record) => this._setStyle(record.key, null));
        changes.forEachAddedItem((record) => this._setStyle(record.key, record.currentValue));
        changes.forEachChangedItem((record) => this._setStyle(record.key, record.currentValue));
    }
    private _setStyle(nameAndUnit: string, value: string | number | null | undefined): void {
        const [name, unit] = nameAndUnit.split('.');
        value = value != null && unit ? `${value}${unit}` : value;
        this._renderer.setStyle(this._ngEl.nativeElement, name, value as string);
    }
}
