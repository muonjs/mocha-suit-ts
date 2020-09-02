'use strict';


import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

const expect = require("expect.js");

import {
  Suit,
  SuitHelper,
  withHelper,
  before as msBefore,
  beforeEach as msBeforeEach,
  after as msAfter,
  afterEach as msAfterEach,
  it as msIt, that as msThat,
  xit as msXIt, xthat as msXThat,
} from "mocha-suit-ts";


const MSG = "Context generation for suit that use helper.";

describe(MSG,function(){

  let setupByMethod = function(method: any) {
    let helperMethod = (method === withHelper) ? msBefore : method;
    describe(`Apply helper by '${method.name}'`, function() {

        let suitCtx: any;
        let helperCtx: any;

        @SuitHelper()
        class SimpleHelper {
          helperKey: string = "val";
          @helperMethod()
          helperMethod() {
            helperCtx = this;
          }
        }

        @Suit()
        class SimpleSuit {
          suitKey: string = "val";
          @method(SimpleHelper)
          helper: any;
          @msIt("some simple check")
          simpleCheck() {
            suitCtx = this;
          }
        }

        before(function(){
          new SimpleSuit();
        });

        before(RunSpyMethods);

        it("Suit and helper contexts should be different",function() {
          expect(suitCtx).to.have.property('suitKey')
          expect(helperCtx).to.not.have.property('suitKey')
          expect(helperCtx).to.have.property('helperKey')
          expect(suitCtx).to.not.have.property('helperKey')
        });

        after(ResetSpyMethods);
    });
  };

  [msBefore,msBeforeEach,msAfter,msAfterEach,msIt,msXIt,msThat,msXThat,withHelper].forEach(function(method){
      setupByMethod(method);
  });

});
