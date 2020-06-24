'use strict';

import 'source-map-support/register'

var should = require("should");

should.config.checkProtoEql = false;

const globalVariable: any = global;

export var method_names = require("mocha-suit/lib/method_names");

import {generateMochaMethod, SpyMethod} from './spy';

interface MochaMethods {
    describe: SpyMethod;
    xdescribe: SpyMethod;
    before: SpyMethod;
    beforeAll: SpyMethod;
    beforeEach: SpyMethod;
    it: SpyMethod;
    xit: SpyMethod;
    after: SpyMethod;
    afterEach: SpyMethod;
    afterAll: SpyMethod;
    [key:string]: SpyMethod;
};

export const TestingMethods: MochaMethods = {
    describe: generateMochaMethod(),
    xdescribe: generateMochaMethod(),
    before: generateMochaMethod(),
    beforeAll: generateMochaMethod(),
    beforeEach: generateMochaMethod(),
    it: generateMochaMethod(),
    xit: generateMochaMethod(),
    after: generateMochaMethod(),
    afterEach: generateMochaMethod(),
    afterAll: generateMochaMethod()
};

Object.keys(TestingMethods).forEach(function(method){
    globalVariable["test_"+method] = TestingMethods[method];
});

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

export const ResetSpyMethods = function(){
    Object.keys(TestingMethods).forEach(function(method){
        TestingMethods[method].reset();
    });
};

export const RunSpyMethods = function(){
    Object.keys(TestingMethods).forEach(function(method){
        TestingMethods[method].run();
    });
};

export const capitalize = function(str: string) {
    var temp = str.split("");
    var firstLetter = temp.shift();
    temp.unshift(firstLetter.toUpperCase());
    return temp.join("");
};
