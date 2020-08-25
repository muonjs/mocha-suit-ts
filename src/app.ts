import 'source-map-support/register'
export const SUITPROPERTY = "__SUIT__";
export const SUITHELPERPROPERTY = "__SUIT_HELPER__";

import MochaSuit = require("mocha-suit");

import {
    applyBindings,
    appendSuitBinding,
    BindingMapDescriptor,
    BeforeBindingMapDescriptor,
    ItBindingMapDescriptor,
    BeforeEachBindingMapDescriptor,
    XItBindingMapDescriptor,
    AfterBindingMapDescriptor,
    AfterEachBindingMapDescriptor,
    WithBindingMapDescriptor,
    XThatBindingMapDescriptor,
    ThatBindingMapDescriptor,
    InsertAboveBindingMapDescriptor,
    InsertBelowBindingMapDescriptor,
    ReplaceBindingMapDescriptor
} from "./binding_descriptor";

export type SuitClass = any;
export type SuitHelperClass = any;

const TestsProperties = new WeakMap<SuitClass,any>();
const SuitPropertyBindingList = new WeakMap<any,any>();

export function Suit(describe: string = "") {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        let S: any;
        if (constructor.prototype[SUITPROPERTY]) {
            S = constructor.prototype[SUITPROPERTY].extend(describe);
        } else {
            S = MochaSuit(describe,{});
        }

        // let boundPropertyList: string[] = SuitPropertyBindingList.get(constructor.prototype);
        // if (boundPropertyList) {
        //     // todo check for same properties of parents
        //     console.log(constructor,boundPropertyList);
        // }

        Object.defineProperty(constructor.prototype,SUITPROPERTY, {
            get() { return S; }
        });
        applyBindings(constructor.prototype,S);

        return class SuitClassFactory extends constructor implements SuitClass {
            constructor(...args: any[]) {
                super(...args);
                S.bindTo(this);
                if (S == (this as any)[SUITPROPERTY]) {
                    S(...args);
                }
            }
        };
    }
}

export function SuitHelper() {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        let S: any;
        if (constructor.prototype[SUITHELPERPROPERTY]) {
            S = constructor.prototype[SUITHELPERPROPERTY].copy();
        } else {
            S = MochaSuit();
        }

        // let boundPropertyList: string[] = SuitPropertyBindingList.get(constructor.prototype);
        // if (boundPropertyList) {
        //     // todo check for same properties of parents
        //     console.log(constructor,boundPropertyList);
        // }

        Object.defineProperty(constructor.prototype,SUITHELPERPROPERTY, {
            get() { return S; }
        });

        applyBindings(constructor.prototype,S);

        return class SuitHelperClassFactory extends constructor implements SuitHelperClass {
            constructor(...args: any[]) {
                super(...args);
            }
        };
    }
}

export function before(description?: string): MethodDecorator;
export function before(helper: SuitHelperClass): PropertyDecorator;
export function before(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new BeforeBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new BeforeBindingMapDescriptor(undefined,a));
        }
    }
}

export function beforeEach(description?: string): MethodDecorator;
export function beforeEach(helper: SuitHelperClass): PropertyDecorator;
export function beforeEach(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new BeforeEachBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new BeforeEachBindingMapDescriptor(undefined,a));
        }
    }
}

export function after(description?: string): MethodDecorator;
export function after(helper: SuitHelperClass): PropertyDecorator;
export function after(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new AfterBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new AfterBindingMapDescriptor(undefined,a));
        }
    }
}

export function afterEach(description?: string): MethodDecorator;
export function afterEach(helper: SuitHelperClass): PropertyDecorator;
export function afterEach(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new AfterEachBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new AfterEachBindingMapDescriptor(undefined,a));
        }
    }
}

export function it(description?: string): MethodDecorator;
export function it(helper: SuitHelperClass): PropertyDecorator;
export function it(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new ItBindingMapDescriptor(a as string || "",target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new ItBindingMapDescriptor(undefined,a));
        }
    }
}

export function that(description?: string): MethodDecorator;
export function that(helper: SuitHelperClass): PropertyDecorator;
export function that(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new ThatBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new ThatBindingMapDescriptor(undefined,a));
        }
    }
}

export function xit(description?: string): MethodDecorator;
export function xit(helper: SuitHelperClass): PropertyDecorator;
export function xit(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new XItBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new XItBindingMapDescriptor(undefined,a));
        }
    }
}

export function xthat(description?: string): MethodDecorator;
export function xthat(helper: SuitHelperClass): PropertyDecorator;
export function xthat(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new XThatBindingMapDescriptor(a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new XThatBindingMapDescriptor(undefined,a));
        }
    }
}

export function withHelper(a: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        @SuitHelper()
        class Helper extends a {
            constructor(arg?: any) {
                super(arg);
            }
        }
        // Object.keys().forEach((key) => {
        //    Helper
        // });
        // aObject.assign({},.extend());
        // let boundProperties: string[] = SuitPropertyBindingList.get(target) || [];
        // if (!SuitPropertyBindingList.has(target)) {
        //     SuitPropertyBindingList.set(target,boundProperties);
        // }
        // boundProperties.push(propertyKey);
        // console.log("HERE",propertyKey);
        // Helper.targetProperty = propertyKey;
        // console.log(propertyKey,target,Helper);
        Helper.prototype[SUITHELPERPROPERTY].bindTo(function(suit: SuitClass) {
            const suitProperties = TestsProperties.get(suit) || {};
            if (!TestsProperties.has(suit)) {
                TestsProperties.set(suit,suitProperties);
            }

            // todo arguments returned from getter or object should be passed to constructor
            // constructor should take single object argument with the type it implements
            // class Helper implements SomeProp {
            //  constructor (init: SomePropsList) {
            //    super({} as SomeSuperClass props)
            //    Object.assign(this,init);
            //  }
            // }

            if (!suitProperties[propertyKey]) {
                let propertyValue = suit[propertyKey];
                suitProperties[propertyKey] = new Helper(propertyValue);
                Object.defineProperty(suit,propertyKey,{
                    enumerable: true,
                    // writable: false,
                    configurable: true,
                    get: () => suitProperties[propertyKey]
                });
            }

            return suitProperties[propertyKey];
        });
        appendSuitBinding(target,new WithBindingMapDescriptor(Helper));
    }
}

export function SuitFactory(suit: SuitClass, testSet: any) {
    let s: any = suit;
    Object.keys(testSet).forEach((describe) => {
        @Suit(describe)
        class SuitFactoryGeneratedClass extends s {
            constructor(...args: any[]) {
                super(...args);
            }
        }
        new SuitFactoryGeneratedClass(testSet[describe]);
    });
}

export function insertAbove(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        appendSuitBinding(target,new InsertAboveBindingMapDescriptor(s,helper));
    }
}

export function insertBelow(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new InsertBelowBindingMapDescriptor(s,helper));
        }
}

export function replaceWith(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        appendSuitBinding(target,new ReplaceBindingMapDescriptor(s,helper));
    }
}
