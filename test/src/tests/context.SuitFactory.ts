'use strict';


import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

const expect = require("expect.js");

import {
  Suit,
  SuitFactory,
  it as msIt, that as msThat
  } from "mocha-suit-ts";


const MSG = "Context generation for testSet with SuitFactory.";

describe(MSG,function(){

    describe("Generate set of two suits.",function() {
        interface SuperSuitI {
          superKey: string;
        }
        interface SimpleSuitI {
          targetKey: string;
        }

        let targetSuitsCtx: any = []
        let superSuitsCtx: any = []

        @Suit()
        class SuperSuit implements SuperSuitI {
            superKey: string;
            @msThat("some super check")
            superCheck() {
              superSuitsCtx.push(this);
            }
            constructor(obj: any) {
              this.superKey = obj.superKey;
            }
        }

        @Suit()
        class SimpleSuit extends SuperSuit implements SimpleSuitI  {
          targetKey: string;
          @msIt("some target check")
          targetCheck() {
            targetSuitsCtx.push(this);
          }
          constructor(obj: any) {
            super(obj);
            this.targetKey = obj.targetKey;
          }
        }

        before(function(){
            const testSet: any = {
              "description 1": {
                  superKey: "super1",
                  targetKey: "value1"
                },
              "description 2": {
                  superKey: "super2",
                  targetKey: "value2"
                }
              }
            SuitFactory(SimpleSuit, testSet);
        });

        before(RunSpyMethods);

        it("Suits target contexts should be different",function() {
          expect(targetSuitsCtx[0].targetKey).to.not.be.eql(targetSuitsCtx[1].targetKey)
        });

        it("Suits super contexts should be different",function() {
          expect(superSuitsCtx[0].superKey).to.not.be.eql(superSuitsCtx[1].superKey)
        });

        after(ResetSpyMethods);
    });
});
