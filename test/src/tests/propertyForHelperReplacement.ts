'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

import {
    Suit, SuitHelper,
    before as msBefore,
    after as msAfter,
    it as msIt, that as msThat,
    xit as msXIt, xthat as msXThat,
    withHelper
} from "mocha-suit-ts";

describe.only("Helper property assigning",function(){
    let helperBeforeThis: any, helperAfterThis: any;
    let suitBeforeThis: any, suitAfterThis: any, suitThis: any;
    before(function(){
        interface HelperInterface {
            value: number;
            other: string;
        }
        @SuitHelper()
        class Helper implements HelperInterface {
            value: number;
            other: string;
            @msBefore()
            beforeHelper() {
                console.log("before helper",this);
                this.value = 2;
                helperBeforeThis = this;
            }

            @msAfter()
            afterHelper() {
                console.log("after helper",this);
                helperAfterThis = this;
            }

            constructor(arg: any) {
                console.log(arg);
                Object.assign(this,arg);
                // this.value = arg;
                // this.other = "2";
            }
        }

        // @Suit("")
        // class Super {
        //     @withHelper(Helper)
        //     _with: HelperInterface;
        // }

        @Suit("")
        class TargetSuit{
            @msBefore()
            beforeSuper() {
                suitBeforeThis = this;
                console.log("before _with helper",this._with);
            }

            @withHelper(Helper)
            get _with(): HelperInterface {
                return {
                    other: "some value",
                    value: 1
                }
            };

            @withHelper(Helper)
            get _otherWith(): HelperInterface {
                return {
                    other: "some other value",
                    value: 22234
                }
            };

            // delete later
            @msBefore()
            before2() {
                console.log("after _with helper",this);
            }

            @msAfter()
            afterSuper() {
                suitAfterThis = this;
            }

            a = 1;
            b: number;
            constructor() {
                // super();
                this.b = 2;
                // console.log("suit",this);
            }
        }

        new TargetSuit();
    });

    before(RunSpyMethods);

    // todo
    it("Some message here",function(){
        ((helperBeforeThis === helperAfterThis) as any).should.be.ok();
        // TestingMethods.before.calledTimes().should.be.eql(SETUP_CALL_TIMES);
    });

    after(ResetSpyMethods);
});
