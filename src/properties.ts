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

export function bindHelperProperty(a: SuitHelperClass, target: any, propertyKey: string, ...args: any[]): SuitHelperClass {
    @SuitHelper()
    class Helper extends a {
        constructor() {
            super(...args);
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

        let propertyValue = suit[propertyKey];
        if (!suitProperties[propertyKey]) {
            if (propertyValue instanceof a) {
                suitProperties[propertyKey] = propertyValue;
            } else {
                suitProperties[propertyKey] = new Helper();
            }
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
