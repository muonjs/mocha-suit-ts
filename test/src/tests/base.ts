'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

require("should");
const expect = require("expect.js");
import sinon = require("sinon");

import {
    Suit,
    before as msBefore,
    beforeEach as msBeforeEach,
    after as msAfter,
    afterEach as msAfterEach,
    it as msIt, that as msThat,
    xit as msXIt, xthat as msXThat,
} from "mocha-suit-ts";

const MSG = "Base system test.";

describe(MSG,function(){

  const checkCalling = function(methodToBeCalled: Function){
    let timesCalled = 1;
    if ((methodToBeCalled.name=='it') || (methodToBeCalled.name=='xit')){
      timesCalled = 2;
    }

    it(methodToBeCalled.name + " should be called "+timesCalled,function(){
      TestingMethods[methodToBeCalled.name].calledTimes().should.be.eql(timesCalled);
    });
  };


  describe("Test simple suite methods calling",function(){
    before(function(){
      @Suit()
      class TestSuit {
        @msBefore()
        emptyBefore(){}

        @msBeforeEach()
        emptyBeforeEach(){}

        @msAfter()
        emptyAfter(){}

        @msAfterEach()
        emptyAfterEach(){}

        @msIt()
        emptyIt(){}

        @msThat()
        emptyThat(){}

        @msXIt()
        emptyXit(){}

        @msXThat()
        emptyXThat(){}
      }

      new TestSuit();
    });

    before(RunSpyMethods);

    [msBefore,msBeforeEach,msAfter,msAfterEach,msIt,msXIt].forEach(function(method){
       checkCalling(method);
    });

    after(ResetSpyMethods);
  });

  describe("Generated suit",function(){
    before(function(){
      @Suit()
      class TestSuit {}

      new TestSuit();
    });

    before(RunSpyMethods);

    it("'before' should not be called",function(){
      TestingMethods.before.calledTimes().should.be.eql(0);
    });

    after(ResetSpyMethods);
  });

  describe("Extended suit",function(){
    before(function(){
      @Suit()
      class ParentSuit {

        @msBefore()
        parentBefore(){}

      }

      @Suit()
      class TestSuit extends ParentSuit {}

      new TestSuit();
    });

    before(RunSpyMethods);

    it("'before' should be called once",function(){
      TestingMethods.before.calledTimes().should.be.eql(1);
    });

    after(ResetSpyMethods);
  });
});
