'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

import { Suit,
         it as msIt,
         before as msBefore } from "mocha-suit-ts";

const MSG = "Context generation.";

describe(MSG,function(){
    describe("Pass context with same key as Suit class creation argument", function() {
        let passedTestCtx = {
            testKey: "passedKey"
        };

        before(function() {
            const self = this;

            @Suit()
            class SuperSuit {
                testKey = "classKey"

                constructor(testCtx: any) {};

                @msIt()
                itFunction() {
                    self.suitCtx = this
                };
            };

            new SuperSuit(passedTestCtx);
        });

        before(RunSpyMethods);

        it("Suit should have passed context value", function() {
            this.suitCtx.should.be.eql(passedTestCtx);
        });

        after(ResetSpyMethods);
    });

    describe("Pass context to extended class with same key as super class", function() {
        let passedTestCtx = {
            testKey: "passedKey"
        };

        before(function() {
            const self = this;

            @Suit()
            class SuperSuit {
                testKey = "superClassKey";

                constructor(testCtx: any) {};

                @msBefore()
                itFunction() {
                    self.suitCtx = this
                };
            };

            @Suit()
            class TargetSuit extends SuperSuit {
                testKey = "targetClassKey";
            };

            new TargetSuit(passedTestCtx);
        });

        before(RunSpyMethods);

        it("Extended class Suit should have passed context value", function() {
            this.suitCtx.should.be.eql(passedTestCtx);
        });

        after(ResetSpyMethods);
    });

    describe("Before method call with ctx changing passed ctx.",function(){
        let beforeTestCtx = {
            testKey: "beforeKey"
        };
        let passedTestCtx = {
            testKey: "passedKey"
        };

        before(function(){
            const self = this;

            @Suit()
            class SuperSuit {
                testKey: any;

                constructor(testCtx:any) {}

                @msBefore()
                beforeFunction() {
                    this.testKey = beforeTestCtx.testKey;
                };

                @msIt()
                itFunction() {
                    self.suitCtx = this;
                };
            };

            new SuperSuit(passedTestCtx);
        });

        before(RunSpyMethods);

        it("Before method call with ctx changing should rewrite passed ctx.", function() {
            this.suitCtx.should.be.eql(beforeTestCtx);
        });

        after(ResetSpyMethods);
    });
});
