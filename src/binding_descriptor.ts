import {SuitClass, SuitHelperClass, SUITHELPERPROPERTY, SUITPROPERTY} from "./app";

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
        let _c: any  = c;
        if (_c.prototype && _c.prototype[SUITHELPERPROPERTY]) {
            this.call = _c.prototype[SUITHELPERPROPERTY];
        } else {
            this.call = c;
        }

        this.describe = d;
    }

    bindTo(S: any) {
        S[this.method](this.call);
    }
}

class ChainModifyingBindingMapDescriptor extends  BindingMapDescriptor {
    positional: SuitClass;
    constructor(p:SuitClass,m:string,c:Function|SuitHelperClass) {
        super(m,undefined,c);
        let _p: any  = p;
        if (_p.prototype && _p.prototype[SUITPROPERTY]) {
            this.positional = _p.prototype[SUITPROPERTY];
        } else {
            throw Error("First argument of 'set' decorator should be a Suit class");
        }
    }

    bindTo(S: any) {
        S[this.method](this.positional,this.call);
    }

}

export class BeforeBindingMapDescriptor extends  BindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("before",d,c);
    }
}

export class BeforeEachBindingMapDescriptor extends  BindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("beforeEach",d,c);
    }
    bindTo(S: any) {
        super.bindTo(S);
    }
}

export class AfterBindingMapDescriptor extends  BindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("after",d,c);
    }
}

export class AfterEachBindingMapDescriptor extends  BindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("afterEach",d,c);
    }
}

class ExecBindingMapDescriptor extends BindingMapDescriptor {
    bindTo(S: any) {
        S[this.method](this.describe,this.call);
    }
}

export class ItBindingMapDescriptor extends ExecBindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("it",d,c);
    }
}

export class ThatBindingMapDescriptor extends ExecBindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("that",d,c);
    }
}

export class XItBindingMapDescriptor extends ExecBindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("xit",d,c);
    }
}

export class XThatBindingMapDescriptor extends ExecBindingMapDescriptor {
    constructor(d:string,c:Function|SuitHelperClass) {
        super("xthat",d,c);
    }
}

export class WithBindingMapDescriptor extends BindingMapDescriptor {
    constructor(c:SuitHelperClass) {
        super("with",undefined,c);
    }
}

export class InsertAboveBindingMapDescriptor extends ChainModifyingBindingMapDescriptor {
    constructor(p:SuitClass,c:SuitHelperClass) {
        super(p,"insertAbove",c);
    }
}

export class InsertBelowBindingMapDescriptor extends ChainModifyingBindingMapDescriptor {
    constructor(p:SuitClass,c:SuitHelperClass) {
        super(p,"insertBelow",c);
    }
}

export class ReplaceBindingMapDescriptor extends ChainModifyingBindingMapDescriptor {
    constructor(p:SuitClass,c:SuitHelperClass) {
        super(p,"replaceWith",c);
    }
}
