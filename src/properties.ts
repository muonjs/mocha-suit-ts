import {SuitClass, SuitHelper, SuitHelperClass, SUITHELPERPROPERTY} from "./app";

const TestsProperties = new WeakMap<SuitClass,any>();
const SuitPropertyBindingList = new WeakMap<any,any>();

export function bindCallProperty(target: any, propertyKey: string): string {
    let propertyName: string = `${target.constructor.name}::${propertyKey}`;
    if (!(target[propertyKey] instanceof Function)) {
        throw new Error(`${propertyName} should be a class method`)
    }
    let boundProperties: string[] = SuitPropertyBindingList.get(target) || [];
    if (!SuitPropertyBindingList.has(target)) {
        SuitPropertyBindingList.set(target,boundProperties);
    }
    boundProperties.push(propertyKey);
    return propertyName;
}

export function bindHelperProperty(a: SuitHelperClass, target: any, propertyKey: string): SuitHelperClass {
    @SuitHelper()
    class Helper extends a {
        constructor(arg?: any) {
            super(arg);
        }
    }

    let boundProperties: string[] = SuitPropertyBindingList.get(target) || [];
    if (!SuitPropertyBindingList.has(target)) {
        SuitPropertyBindingList.set(target,boundProperties);
    }
    boundProperties.push(propertyKey);

    Helper.prototype[SUITHELPERPROPERTY].bindTo(function(suit: SuitClass) {
        const suitProperties = TestsProperties.get(suit) || {};
        if (!TestsProperties.has(suit)) {
            TestsProperties.set(suit,suitProperties);
        }

        if (!suitProperties[propertyKey]) {
            let propertyValue = suit[propertyKey];
            suitProperties[propertyKey] = new Helper(propertyValue);
            Object.defineProperty(suit,propertyKey,{
                enumerable: true,
                configurable: true,
                get: () => suitProperties[propertyKey]
            });
        }

        return suitProperties[propertyKey];
    });
    return Helper;
}

export function boundPropertyCheck(target: any, S: any) {
    let boundPropertyList: string[] = SuitPropertyBindingList.get(target) || [];
    if (boundPropertyList) {
        let parentS = S.parent;
        while (parentS) {
            let parentPropertyList = SuitPropertyBindingList.get(parentS);
            let intersection = parentPropertyList.find((el: string) => {
                return boundPropertyList.indexOf(el) !== -1;
            });
            if (intersection) {
                throw new Error(`Attribute '${intersection}' is already bound in parent suit: ${target.constructor.name}`);
            }
            parentS = parentS.parent;
        }
        SuitPropertyBindingList.set(S,boundPropertyList);
    }
}
