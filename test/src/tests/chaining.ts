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

describe("Suit chaining",function(){
    const SETUP_CALL_TIMES = 4;
    const TEST_CALL_TIMES = 5;
    before(function(){
        @SuitHelper()
        class Helper {
            @msBefore()
            beforeHelper() {}

            @msIt()
            itHelper() {}

            @msXIt()
            xitHelper() {}

            @msThat()
            thatHelper() {}

            @msXThat()
            xthatHelper() {}

            @msAfter()
            afterHelper() {}

            constructor() {}
        }

        @Suit("")
        class SuperSuit {
            @msBefore()
            beforeSuper() {}

            @msIt()
            itSuper() {}

            @msThat()
            thatSuper() {}

            @msXIt()
            xitSuper() {}

            @msXThat()
            xthatSuper() {}

            @withHelper(Helper)
            _with: any;

            @msAfter()
            afterSuper() {}

            constructor() {}
        }

        @Suit("")
        class TargetSuit extends SuperSuit {
            @msBefore()
            beforeTarget() {}

            @msIt()
            itTarget() {}

            @msXIt()
            xitTarget() {}

            @withHelper(Helper)
            _with: any;

            @msAfter()
            afterTarget() {}

            constructor() {
                super();
            }
        }

        new TargetSuit();
    });

    before(RunSpyMethods);

    it("Before should called from target, super and both helpers",function(){
        TestingMethods.before.calledTimes().should.be.eql(SETUP_CALL_TIMES);
    });

    it("After should called from target, super and both helpers",function(){
        TestingMethods.after.calledTimes().should.be.eql(SETUP_CALL_TIMES);
    });

    it("xit should called from from target, helper; xthat - from super and both helpers",function(){
        TestingMethods.xit.calledTimes().should.be.eql(TEST_CALL_TIMES);
    });

    it("it should called from from target, helper; that - from super and both helpers",function(){
        TestingMethods.it.calledTimes().should.be.eql(TEST_CALL_TIMES);
    });

    after(ResetSpyMethods);
});
