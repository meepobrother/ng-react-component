import { NgModule } from '@angular/core';
import { NgEachOf } from './ng-each-of';
import { NgComponentDirective } from './ng-component';
@NgModule({
    exports: [
        NgEachOf,
        NgComponentDirective
    ],
    declarations: [
        NgEachOf,
        NgComponentDirective
    ]
})
export class ReactCommonModule { }
