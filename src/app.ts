import 'source-map-support/register'
const SUITPROPERTY = "__SUIT__";

const MochaSuit = require("mocha-suit");

import {
    applyBindings,
    appendSuitBinding,
    BindingMapDescriptor,
    BeforeBindingMapDescriptor,
    ItBindingMapDescriptor
} from "./binding_descriptor";

export interface SuitClass {};
export interface SuitHelperClass {};

export function Suit(describe: string = "") {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        let S: any;
        if (constructor.prototype[SUITPROPERTY]) {
            S = constructor.prototype[SUITPROPERTY].extend(describe);
        } else {
            S = MochaSuit(describe,{});
        }

        Object.defineProperty(constructor.prototype,SUITPROPERTY, {
            get() { return S; }
        });

        applyBindings(constructor.prototype,S);

        S.it("ok",function() {});

        return class SuitClassFactory extends constructor implements SuitClass {
            constructor(...args: any[]) {
                super();
                S(...args);
            }
        };
    }
}

export function SuitHelper() {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        let S: any;
        if (constructor.prototype[SUITPROPERTY]) {
            S = constructor.prototype[SUITPROPERTY].extend();
        } else {
            S = MochaSuit({});
        }

        Object.defineProperty(constructor,SUITPROPERTY, {
            get() { return S; }
        });

        applyBindings(constructor.prototype,S);

        return class SuitHelperClassFactory extends constructor implements SuitHelperClass {
            constructor(...args: any[]) {
                super();
                S(...args);
            }
        };
    }
}

export function before(description?: string): MethodDecorator;
export function before(helper: SuitHelperClass): PropertyDecorator;
export function before(a?: string | SuitHelperClass): MethodDecorator | PropertyDecorator {
    if ((typeof a === "string") || a === undefined) {
        return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            appendSuitBinding(target,new BindingMapDescriptor("before",a as string,target[propertyKey]));
        }
    } else {
        return function(target: any, propertyKey: string) {
            appendSuitBinding(target,new BindingMapDescriptor("before",undefined,a));
        }
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
