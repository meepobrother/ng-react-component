import { DoCheck, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { KeyValueDiffers } from '@angular/core';
export interface EachKeyValue<T> {
    [key: string]: T;
}
export declare class NgEachOfContext<T> {
    $implicit: T;
    ngForOf: EachKeyValue<T>;
    key: string;
    constructor($implicit: T, ngForOf: EachKeyValue<T>, key: string);
}
export declare class NgEachOf<T> implements DoCheck, OnChanges {
    private _viewContainer;
    private _template;
    private _differs;
    ngEachOf: EachKeyValue<T>;
    private _differ;
    constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<NgEachOfContext<T>>, _differs: KeyValueDiffers);
    ngForTemplate: TemplateRef<NgEachOfContext<T>>;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    private _applyChanges(changes);
}
