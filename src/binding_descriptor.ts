import {SuitHelperClass} from "./app";

let suitBindingMap  = new WeakMap();

export function appendSuitBinding(target: any,binding: BindingMapDescriptor) {
    if (!suitBindingMap.has(target)) {
        suitBindingMap.set(target,[]);
    }
    let arr: BindingMapDescriptor[] = suitBindingMap.get(target);
    arr.push(binding);
}

export function applyBindings(target: any, suit: any) {
    let bindings: BindingMapDescriptor[] = (suitBindingMap.get(target) || []);
    bindings.forEach((binding) => {
        binding.bindTo(suit);
    });
}

export class BindingMapDescriptor {
    describe: string;
    method: string;
    call: Function|SuitHelperClass;
    constructor(m:string,d:string,c:Function|SuitHelperClass) {
        this.method = m;
        this.call = c;
        this.describe = d;
    }

    bindTo(S: any) {
        S[this.method](this.call);
    }
}

export class BeforeBindingMapDescriptor extends  BindingMapDescriptor {
    constructor(m:string,d:string,c:Function|SuitHelperClass) {
        super(m,d,c);
        this.method = "before";
    }
}

export class ItBindingMapDescriptor extends  BindingMapDescriptor {
    bindTo(S: any) {
        S[this.method](this.describe,this.call);
    }
}
