'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

import {
    Suit,
    before as msBefore,
    after as msAfter,
    it as msIt, that as msThat,
    xit as msXIt, xthat as msXThat
} from "mocha-suit-ts";

describe("Suit forking from SuperSuit with extend",function(){

    var suitCallStackForTarget1: number[] = [];
    var suitCallStackForTarget2: number[] = [];

    before(function(){
        @Suit("")
        class SuperSuit {
            @msBefore()
            beforeSuper() {
                this.callstack.push(1)
            }

            @msIt()
            itSuper() {
                this.callstack.push(2)
            }

            @msThat()
            thatSuper() {
                this.callstack.push(3)
            }

            @msXIt()
            xitSuper() {
                this.callstack.push(4)
            }

            @msXThat()
            xthatSuper() {
                this.callstack.push(5)
            }

            @msAfter()
            afterSuper() {
                this.callstack.push(6)
            }

            constructor(protected callstack: number[]) {
                callstack.push(0);
            }
        }

        @Suit("")
        class TargetSuit1 extends SuperSuit {
            @msBefore()
            beforeTarget() {
                this.callstack.push(11)
            }

            @msIt()
            itTarget() {
                this.callstack.push(12)
            }

            @msXIt()
            xitTarget() {
                this.callstack.push(13)
            }

            @msAfter()
            afterTarget() {
                this.callstack.push(14)
            }

            constructor() {
                super(suitCallStackForTarget1);
                this.callstack.push(10)
            }
        }

        @Suit("")
        class TargetSuit2 extends SuperSuit {
            @msBefore()
            beforeTarget() {
                this.callstack.push(21)
            }

            @msIt()
            itTarget() {
                this.callstack.push(22)
            }

            @msXIt()
            xitTarget() {
                this.callstack.push(23)
            }

            @msAfter()
            afterTarget() {
                this.callstack.push(24)
            }

            constructor() {
                super(suitCallStackForTarget2);
                this.callstack.push(20)
            }
        }

        new TargetSuit1();
        new TargetSuit2();
    });

    before(RunSpyMethods);

    it("",function(){
        console.log(suitCallStackForTarget1);
        console.log(suitCallStackForTarget2);
    });

    after(ResetSpyMethods);
});
