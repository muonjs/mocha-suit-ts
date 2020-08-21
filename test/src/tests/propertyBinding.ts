'use strict';

import { TestingMethods, RunSpyMethods, ResetSpyMethods } from '../setup';

require("should");
const expect = require("expect.js");

import {
    Suit,
    before as msBefore,
    beforeEach as msBeforeEach,
    after as msAfter,
    afterEach as msAfterEach,
    it as msIt,
    xit as msXIt
} from "mocha-suit-ts";

describe('Property binding check', function () {
    describe("Simple Suit property check",function() {
        const PROPERTY_VAL = Date.now();

        [ msBefore, msBeforeEach, msAfter, msAfterEach, msIt, msXIt ].forEach((method) => {
            describe(method.name,function() {
                before(function() {
                    const self = this;

                    @Suit()
                    class TargetSuit {
                        private property = PROPERTY_VAL;
                        @method()
                        targetMethod() {
                            self.methodThis = this;
                        }
                        constructor() {
                            self.constructorThis = this;
                        }
                    }

                    this.TargetSuit = TargetSuit;

                    new TargetSuit();

                    this.testContext = new TargetSuit();
                });

                before(RunSpyMethods);

                it(`'this' withing ${method.name} call should be instance of TargetSuit`,function(){
                    expect(this.methodThis).to.be.a(this.TargetSuit);
                });

                it(`'this' withing ${method.name} should be the same as constructor`,function(){
                    expect(this.methodThis).to.be(this.constructorThis);
                });

                it(`'this' withing ${method.name} should has private property`,function(){
                    expect(this.methodThis.property).to.be.eql(PROPERTY_VAL);
                });

                it(`'this' should match the object from second 'new' call`,function(){
                    expect(this.methodThis).to.be.eql(this.testContext);
                });

                after(ResetSpyMethods);
            });
        });
    });

    describe("Extended Suit property check",function() {
        [ msBefore, msBeforeEach, msAfter, msAfterEach ].forEach((method) => {
            describe(method.name,function() {
                const SUPER_PROP_VAL = Date.now() * Math.random();
                const TARGET_PROP_VAL = Date.now() * Math.random();

                before(function() {
                    const self = this;

                    @Suit()
                    class SuperSuit {
                        protected superProperty = SUPER_PROP_VAL;

                        @method()
                        superMethod() {
                            self.superMethodThis = this;
                        }

                        constructor() {
                            self.superConstructorThis = this;
                        }
                    }

                    @Suit()
                    class TargetSuit extends SuperSuit {
                        private targetProperty = TARGET_PROP_VAL;
                        @method()
                        targetMethod() {
                            self.methodThis = this;
                        }
                        constructor() {
                            super()
                            self.constructorThis = this;
                        }
                    }

                    this.TargetSuit = TargetSuit;

                    new TargetSuit();
                });

                before(RunSpyMethods);

                it(`'this' should be instance of TargetSuit`,function(){
                    expect(this.methodThis).to.be.a(this.TargetSuit);
                });

                it(`'this' should be the same as constructor`,function(){
                    expect(this.methodThis).to.be(this.constructorThis);
                });

                if ([msIt, msXIt].indexOf(method) === -1) {
                    it(`'this' should be the same as super method of this`,function(){
                        expect(this.methodThis).to.be(this.superMethodThis);
                    });
                }

                it(`'this' should be the same as super constructor`,function(){
                    expect(this.constructorThis).to.be(this.superConstructorThis);
                });

                it(`'this' should has property from target class`,function(){
                    expect(this.methodThis.targetProperty).to.be.eql(TARGET_PROP_VAL);
                });

                it(`'this' should has property from super class`,function(){
                    expect(this.methodThis.superProperty).to.be.eql(SUPER_PROP_VAL);
                });

                after(ResetSpyMethods);
            })
        })
    })
});
