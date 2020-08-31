export const SUITPROPERTY = "__SUIT__";
export const SUITHELPERPROPERTY = "__SUIT_HELPER__";

const MochaSuit = require("mocha-suit");

import {
    applyBindings,
    appendSuitBinding,
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
import {bindCallProperty, bindHelperProperty, boundPropertyCheck} from "./properties";

export type SuitClass = any;
export type SuitHelperClass = any;

// Attribute list of mocha context (based on mocha@8.1.2)
export class MochaSuite {
    suit: any;
    currentTest: any;
    _runnable: any;
    test: any;
    runnable(arg: any) {}
    timeout(ms: number) {}
    enableTimeouts(enabled: boolean):void {}
    slow(ms: number): void {}
    skip(): void {}
    inspect():string { return ""}
}

export function Suit(describe: string = "") {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        let S: any;
        if (constructor.prototype[SUITPROPERTY]) {
            S = constructor.prototype[SUITPROPERTY].extend(describe);
        } else {
            S = MochaSuit(describe,{});
        }

        boundPropertyCheck(constructor.prototype, S);

        Object.defineProperty(constructor.prototype,SUITPROPERTY, {
            value: S, configurable: false, enumerable: false, writable: false
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

        boundPropertyCheck(constructor.prototype, S);

        Object.defineProperty(constructor.prototype,SUITHELPERPROPERTY, {
            value: S, configurable: false, enumerable: false, writable: false
        });

        applyBindings(constructor.prototype,S);

        return class SuitHelperClassFactory extends constructor implements SuitHelperClass {
            constructor(...args: any[]) {
                super(...args);
            }
        };
    }
}

export function SuitFactory(Suit: SuitClass, testSet: any) {
    Object.keys(testSet).forEach((describe) => {
        let ParentS = Suit.prototype[SUITPROPERTY];
        let S = ParentS.copy(`${ParentS.describe}: ${describe}`);

        class FactoryClass extends Suit {
            constructor(...args: any[]) {
                super(...args);
                S(...args);
            }
        }

        Object.defineProperty(FactoryClass.prototype,SUITPROPERTY, {
            value: S, configurable: false, enumerable: false, writable: false
        });

        new FactoryClass(testSet[describe]);
    });
}

function applyDecorator(BindingMap: any, a?: string | SuitHelperClass) {
    return function(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        if (a && a.prototype && a.prototype[SUITHELPERPROPERTY]) {
            let Helper = bindHelperProperty(a, target, propertyKey);
            appendSuitBinding(target, new BindingMap(undefined, Helper));
        } else {
            let propertyName = bindCallProperty(target, propertyKey);
            appendSuitBinding(target, new BindingMap(`${propertyName}: ${a}`, target[propertyKey]));
        }
    }
}

export function before(description?: string): MethodDecorator;
export function before(helper: SuitHelperClass): PropertyDecorator;
export function before(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(BeforeBindingMapDescriptor,a);
}

export function beforeEach(description?: string): MethodDecorator;
export function beforeEach(helper: SuitHelperClass): PropertyDecorator;
export function beforeEach(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(BeforeEachBindingMapDescriptor,a);
}

export function after(description?: string): MethodDecorator;
export function after(helper: SuitHelperClass): PropertyDecorator;
export function after(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(AfterBindingMapDescriptor,a);
}

export function afterEach(description?: string): MethodDecorator;
export function afterEach(helper: SuitHelperClass): PropertyDecorator;
export function afterEach(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(AfterEachBindingMapDescriptor,a);
}

export function it(description?: string): MethodDecorator;
export function it(helper: SuitHelperClass): PropertyDecorator;
export function it(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(ItBindingMapDescriptor,a);
}

export function that(description?: string): MethodDecorator;
export function that(helper: SuitHelperClass): PropertyDecorator;
export function that(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(ThatBindingMapDescriptor,a);
}

export function xit(description?: string): MethodDecorator;
export function xit(helper: SuitHelperClass): PropertyDecorator;
export function xit(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(XItBindingMapDescriptor,a);
}

export function xthat(description?: string): MethodDecorator;
export function xthat(helper: SuitHelperClass): PropertyDecorator;
export function xthat(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    return applyDecorator(XThatBindingMapDescriptor,a);
}

export function withHelper(a: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        let Helper = bindHelperProperty(a,target,propertyKey);
        appendSuitBinding(target,new WithBindingMapDescriptor(Helper));
    }
}

export function insertAbove(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        let Helper = bindHelperProperty(helper,target,propertyKey);
        appendSuitBinding(target,new InsertAboveBindingMapDescriptor(s,Helper));
    }
}

export function insertBelow(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        let Helper = bindHelperProperty(helper,target,propertyKey);
        appendSuitBinding(target,new InsertBelowBindingMapDescriptor(s,Helper));
    }
}

export function replaceWith(s: SuitClass, helper: SuitHelperClass): PropertyDecorator {
    return function(target: any, propertyKey: string) {
        let Helper = bindHelperProperty(helper,target,propertyKey);
        appendSuitBinding(target,new ReplaceBindingMapDescriptor(s,Helper));
    }
}
