'use strict';

var should = require("should");

should.config.checkProtoEql = false;

export var method_names = require("mocha-suit/lib/method_names");

import { generateMochaMethod } from './spy';

let testMethods = [
    "describe",
    "xdescribe",
    "before",
    "beforeAll",
    "beforeEach",
    "it",
    "xit",
    "after",
    "afterEach",
    "afterAll"
];

export var substitutedMethods:any = {};

method_names.renameMethod({
    describeMethod: "test_describe",
    xdescribeMethod: "test_xdescribe",
    beforeMethod: "test_before",
    beforeAllMethod: "test_beforeAll",
    beforeEachMethod: "test_beforeEach",
    afterMethod: "test_after",
    afterEachMethod: "test_afterEach",
    afterAllMethod: "test_afterAll",
    itMethod: "test_it",
    xitMethod: "test_xit"
});

export const NormalizeTests = function(method: any){
    if (!method.hasOwnProperty("before") && !method.hasOwnProperty("beforeAll")) {
        throw Error("There is no proper setup methods. Probably unknown Test framework. Exiting.")
    }

    if (!method.hasOwnProperty("before") && method.hasOwnProperty("beforeAll")) {
        method.before = method.beforeAll;
        method.after = method.afterAll;
    }
};

testMethods.forEach(function(method){
    substitutedMethods[method] = method_names["test_"+method] = generateMochaMethod("test_"+method);
});

export const ResetSpyMethods = function(){
    testMethods.forEach(function(method){
        substitutedMethods[method].reset();
    });
};

export const RunSpyMethods = function(){
    testMethods.forEach(function(method){
        substitutedMethods[method].run();
    });
};

export const capitalize = function(str: string) {
    var temp = str.split("");
    var firstLetter = temp.shift();
    temp.unshift(firstLetter.toUpperCase());
    return temp.join("");
};
