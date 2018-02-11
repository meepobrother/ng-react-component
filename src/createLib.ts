export class CreateLib {
    constructor(
        public name: string,
        public title: string,
        public props: any = {},
        public children: any[] = [],
        public father: string = null,
        public uuid: string = null,
        public state: any = {},
        public items: any[] = []
    ) { 
        this.uuid = this.uuid || guid();
    }
}

export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
