import { ComponentRef, SimpleChanges, ViewContainerRef, OnInit } from '@angular/core';
export declare class NgComponentDirective implements OnInit {
    viewContainerRef: any;
    componentRef: ComponentRef<any>;
    moduleRef: any;
    ngComponent: any;
    ngComponentInput: any;
    Output: any;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
