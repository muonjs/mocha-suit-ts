'use strict;'

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

require("should");
const expect = require("expect.js");
import sinon = require("sinon");

import {
    Suit, SuitHelper,
    before as msBefore,
    beforeEach as msBeforeEach,
    after as msAfter,
    afterEach as msAfterEach,
    it as msIt, that as msThat,
    xit as msXIt, xthat as msXThat,
    withHelper
} from "mocha-suit-ts";


describe("Check mocha methods call.",function(){

    describe("Describe.",function(){
        describe("Base Suit generation.",function(){
            before(function(){
                @Suit()
                class TargetClass {}

                new TargetClass();
            });

            before(RunSpyMethods);

            it("One describe block should be generated.",function(){
                TestingMethods.describe.calledTimes().should.be.eql(1);
            });

            after(ResetSpyMethods);
        });

        describe("Describe with extend.",function(){
            before(function(){
                @Suit()
                class SuperClass {}

                @Suit()
                class TargetClass extends SuperClass {}

                new TargetClass();
            });

            before(RunSpyMethods);

            it("Two describe blocks should be generated.",function(){
                TestingMethods.describe.calledTimes().should.be.eql(2);
            });

            after(ResetSpyMethods);
        });

        describe("Describe with double extend.",function(){
            before(function(){
                @Suit()
                class BaseSuperClass {}

                @Suit()
                class SuperClass extends BaseSuperClass {}

                @Suit()
                class TargetClass extends SuperClass {}

                new TargetClass();
            });

            before(RunSpyMethods);

            it("Three describe blocks should be generated.",function(){
                TestingMethods.describe.calledTimes().should.be.eql(3);
            });

            after(ResetSpyMethods);
        });
    });

    const runSetup = function(method: Function, methodToBeCalled: Function){

        describe(method.name + ". Define multiple times(twice).",function(){
            const spy0 = sinon.spy();
            const spy1 = sinon.spy();

            before(function(){
                @Suit()
                class TargetSuit {
                    @method()
                    call0() { return spy0();}
                    @method()
                    call1() { return spy1();}
                }
                new TargetSuit();
            });

            before(RunSpyMethods);

            it(methodToBeCalled.name + " should be called twice",function(){
                TestingMethods[methodToBeCalled.name].calledTimes().should.be.eql(2);
            });

            it("Should be called each '"+method.name+"' definision",function(){
                expect(spy0.called).to.be.ok();
                expect(spy1.called).to.be.ok();
            });

            after(ResetSpyMethods);
        });
    };


    [msBefore,msBeforeEach,msAfter,msAfterEach,msIt,msXIt].forEach(function(method){
        runSetup(method, method);
    });
    runSetup(msThat, msIt);
    runSetup(msXThat, msXIt);

});
