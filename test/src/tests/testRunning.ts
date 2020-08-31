'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

require("should");
const expect = require("expect.js");

import {
  Suit,
  SuitFactory,
  it as msIt
  } from "mocha-suit-ts";

const MSG = "Test running.";

describe(MSG,function(){

    @Suit()
    class SimpleSuit {
      @msIt("some simple check")
      simpleCheck() {}
    }

    describe("Single test",function(){
        before(function(){
            new SimpleSuit();
        });

        before(RunSpyMethods);

        it("'it' should be called",function(){
          expect(TestingMethods.it.isCalled).to.be.ok();
        });

        after(ResetSpyMethods);
    });

    describe("With testSet",function(){
        const TIMES = 10;

        before(function(){
            const ctxSet: any = {};
            for(let i = 0; i < TIMES; i++) {
                ctxSet["description"+i] = {};
            }
            SuitFactory(SimpleSuit, ctxSet);
        });

        before(RunSpyMethods);

        it("'it' should be called multiple times (testSet items count)", function(){
            TestingMethods.it.calledTimes().should.be.eql(TIMES);
        });

        after(ResetSpyMethods);
    });
});
