'use strict';


import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

const expect = require("expect.js");

import {
  Suit,
  SuitFactory,
  it as msIt
  } from "mocha-suit-ts";


const MSG = "Context generation for testSet with SuitFactory.";

describe(MSG,function(){

    describe("Generate set of two suits.",function() {

        interface SimpleSuitInterface {
          testKey: string;
        }
        let suitsCtx: any = []

        @Suit()
        class SimpleSuit implements SimpleSuitInterface {
          testKey: string;
          @msIt("some simple check")
          simpleCheck() {
            suitsCtx.push(this);
          }
          constructor(obj: SimpleSuitInterface) {
            this.testKey = obj.testKey;
          }
        }

        before(function(){
            const testSet: any = {
              "description 1": {
                  testKey: "value1"
                },
              "description 2": {
                  testKey: "value2"
                }
              }
            SuitFactory(SimpleSuit, testSet);
        });

        before(RunSpyMethods);

        it("Suits contexts should be different",function() {
          expect(suitsCtx[0].testKey).to.not.be.eql(suitsCtx[1].testKey)
        });

        after(ResetSpyMethods);
    });
});
