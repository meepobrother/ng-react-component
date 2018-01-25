
import {
    ChangeDetectorRef, Directive, DoCheck, EmbeddedViewRef, Input,
    IterableChangeRecord, IterableChanges, IterableDiffer,
    IterableDiffers, NgIterable, OnChanges, SimpleChanges, TemplateRef,
    TrackByFunction, ViewContainerRef, forwardRef, isDevMode
} from '@angular/core';
import {
    KeyValueDiffer, KeyValueChanges, KeyValueChangeRecord,
    KeyValueDifferFactory, KeyValueDiffers
} from '@angular/core';
export interface EachKeyValue<T> {
    [key: string]: T;
}
export class NgEachOfContext<T> {
    constructor(
        public $implicit: T,
        public ngForOf: EachKeyValue<T>,
        public key: string,
    ) { }
}

@Directive({ selector: '[ngEach][ngEachOf]' })
export class NgEachOf<T> implements DoCheck, OnChanges {
    @Input() ngEachOf: EachKeyValue<T>;
    private _differ: KeyValueDiffer<string, T> | null = null;
    constructor(
        private _viewContainer: ViewContainerRef,
        private _template: TemplateRef<NgEachOfContext<T>>,
        private _differs: KeyValueDiffers
    ) { }
    @Input()
    set ngForTemplate(value: TemplateRef<NgEachOfContext<T>>) {
        if (value) {
            this._template = value;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('ngEachOf' in changes) {
            const value = changes['ngEachOf'].currentValue;
            if (!this._differ && value) {
                this._differ = this._differs.find(value).create();
            }
        }
    }
    ngDoCheck(): void {
        if (this._differ) {
            const changes = this._differ.diff(this.ngEachOf);
            if (changes) this._applyChanges(changes);
        }
    }

    private _applyChanges(changes: KeyValueChanges<string, T>) {
        const insertTuples: RecordViewTuple<T>[] = [];
        changes.forEachItem(
            (item: KeyValueChangeRecord<string, T>) => {
                if (item.previousValue == null) {
                    const view = this._viewContainer.createEmbeddedView(
                        this._template,
                        new NgEachOfContext<T>(item.currentValue, this.ngEachOf, item.key),
                        parseInt(item.key, 16)
                    );
                    const tuple = new RecordViewTuple<T>(item, view, parseInt(item.key, 16));
                    insertTuples.push(tuple);
                } else if (item.currentValue == null) {
                    this._viewContainer.remove(parseInt(item.key, 16));
                } else {
                    const view = this._viewContainer.get(parseInt(item.key, 16))!;
                    this._viewContainer.move(view, parseInt(item.key, 16));
                    const tuple = new RecordViewTuple(
                        item.currentValue,
                        <EmbeddedViewRef<NgEachOfContext<T>>>view,
                        parseInt(item.key, 16)
                    );
                    insertTuples.push(tuple);
                }
            }
        );
    }
}

class RecordViewTuple<T> {
    constructor(
        public record: any,
        public view: EmbeddedViewRef<NgEachOfContext<T>>,
        public index: number
    ) { }
}
