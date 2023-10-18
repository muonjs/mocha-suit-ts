'use strict';

import { TestingMethods } from '../setup';
import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { SpyMethod } from '../spy'

require("should");
const expect = require("expect.js");
const Promise = require("bluebird");

import {
    Suit,
    before as msBefore,
    beforeEach as msBeforeEach,
    after as msAfter,
    afterEach as msAfterEach,
    it as msIt,
    xit as msXIt
} from "mocha-suit-ts";


const DELAY = 10;
import Done = Mocha.Done;

describe("Asynchronous methods",function() {
    xdescribe("With 'done' method",function() {
        const TestSpyCall = (decorator: Function, spyMethod: SpyMethod) => {
            const callOrder: number[] = [];

            const call1 = function call1(done: Done){
                setTimeout(function(){
                    callOrder.push(1);
                    done();
                },DELAY);
            };

            const call2 = function(){
                callOrder.push(2);
            };

            before(function() {
                @Suit()
                class TargetSuit {
                    @decorator()
                    call1(done: Done) {
                        return call1(done);
                    }

                    @decorator()
                    call2() {
                        return call2();
                    }
                }

                new TargetSuit();
            });

            before(RunSpyMethods);

            before(function(done){
                // since mocha methods are spied we need to wait until first timeout is called
                setTimeout(done,DELAY*2);
            });

            it("Methods should be called in reverse order",function(){
                (callOrder as any).should.be.eql([2,1]);
            });

            it("Mochas done arguments from first call should be run",function(){
                const doneMethod = spyMethod.doneMethod(0);
                expect(doneMethod).to.be.ok();
                expect(doneMethod.called).to.be.ok();
            });

            after(ResetSpyMethods);
        };

        describe("before",function(){
            TestSpyCall(msBefore,TestingMethods.before);
        });

        describe("beforeEach",function(){
            TestSpyCall(msBeforeEach,TestingMethods.beforeEach);
        });

        describe("after",function(){
            TestSpyCall(msAfter,TestingMethods.after);
        });

        describe("afterEach",function(){
            TestSpyCall(msAfterEach,TestingMethods.afterEach);
        });

        describe("it",function(){
            TestSpyCall(msIt,TestingMethods.it);
        });

        describe("xit",function(){
            // xit is spied method, so it behaves same way as it and other methods.
            TestSpyCall(msXIt,TestingMethods.xit);
        });
    });

    describe("With Promises",function(){
        const TestSpyCall = function(decorator: Function, spy: SpyMethod) {
            before(function() {
                const call = function(){
                    return Promise.delay(DELAY);
                };

                @Suit()
                class TargetSuit {
                    @decorator()
                    suitCall() {
                        return call();
                    }
                }

                new TargetSuit();
            });

            before(RunSpyMethods);

            before(function(done){
                // since mocha methods are spied we need to wait until first timeout is called
                setTimeout(done,DELAY*2);
            });

            it("Decorated call should return Promise object",function(){
                const returned = spy.returned(0);
                expect(returned).to.be.ok();
                expect(returned.then).to.be.ok();
                returned.then.should.be.Function();
            });

            after(ResetSpyMethods);
        };

        describe("before",function(){
            TestSpyCall(msBefore,TestingMethods.before);
        });

        describe("beforeEach",function(){
            TestSpyCall(msBeforeEach,TestingMethods.beforeEach);
        });

        describe("after",function(){
            TestSpyCall(msAfter,TestingMethods.after);
        });

        describe("afterEach",function(){
            TestSpyCall(msAfterEach,TestingMethods.afterEach);
        });

        describe("it",function(){
            TestSpyCall(msIt,TestingMethods.it);
        });

        describe("xit",function(){
            // xit is spied method, so it behaves same way as it and other methods.
            TestSpyCall(msXIt,TestingMethods.xit);
        });
    });
});
