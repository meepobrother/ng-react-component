export class CreateLib {
    constructor(
        public name: string,
        public title: string,
        public props: any = {},
        public children: any[] = [],
        public state: any = {}
    ) { }
}
