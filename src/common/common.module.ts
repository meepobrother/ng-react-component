import { NgModule } from '@angular/core';
import { NgEachOf } from './ng-each-of';
import { NgComponentPreviewDirective } from './ng-component';
@NgModule({
    exports: [
        NgEachOf,
        NgComponentPreviewDirective
    ],
    declarations: [
        NgEachOf,
        NgComponentPreviewDirective
    ]
})
export class ReactCommonModule { }
