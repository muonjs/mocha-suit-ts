'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

import {
    Suit,
    before as msBefore,
    after as msAfter,
    insertAbove as msInsertAbove,
    insertBelow as msInsertBelow,
    replaceWith as msReplaceWith,
    SuitHelper
} from "mocha-suit-ts";

describe("Modifying suit chain with set methods.",function(){
    const mod = require("mocha-suit");

    describe("Normal chain execution check.",function(){
        before(function() {
            const self = this;

            this.beforeCallStack = [];
            this.afterCallStack = [];

            @Suit("")
            class Target {
                @msBefore()
                targetBefore(){
                    self.beforeCallStack.push(1);
                }

                @msAfter()
                targetAfter(){
                    self.afterCallStack.push(1);
                }
            }

            @Suit("")
            class Target2 extends Target {
                @msBefore()
                target2Before(){
                    self.beforeCallStack.push(2);
                }

                @msAfter()
                target2After(){
                    self.afterCallStack.push(2);
                }
            }

            @Suit("")
            class Target3 extends Target2 {
                @msBefore()
                target3Before(){
                    self.beforeCallStack.push(3);
                }

                @msAfter()
                target3After(){
                    self.afterCallStack.push(3);
                }
            }

            this.CallTarget = Target3;
        });

        before(function(){
            new (this.CallTarget)();
        });

        before(RunSpyMethods);

        it("before call stack should be in right order",function(){
            this.beforeCallStack.should.be.eql([1,2,3]);
        });

        it("after call stack should be in right order",function(){
            this.beforeCallStack.should.be.eql([1,2,3]);
        });

        after(ResetSpyMethods);
    });

    const newHelper = (beforeStack: number[], afterStack: number[], value: number) => {
        @SuitHelper()
        class Helper {
            @msBefore()
            helperCallBefore() {
                beforeStack.push(value);
            }

            @msAfter()
            helperCallAfter() {
                afterStack.push(value);
            }
        }
        return Helper;
    };

    describe("insertAbove execution check.",function() {
        before(function () {
            const self = this;
            this.beforeCallStack = [] as number[];
            this.afterCallStack = [] as number[];

            @Suit()
            class Target {
                @msBefore()
                targetCall() {
                    self.beforeCallStack.push(1);
                }

                @msAfter()
                targetAfterCall() {
                    self.afterCallStack.push(1);
                }
            }

            @Suit()
            class Target2 extends Target {
                @msBefore()
                target2Call() {
                    self.beforeCallStack.push(2);
                }

                @msAfter()
                target2AfterCall() {
                    self.afterCallStack.push(2);
                }
            }

            const Helper3above2 = newHelper(this.beforeCallStack,this.afterCallStack,31);

            @Suit()
            class Target3 extends Target2 {
                @msInsertAbove(Target2,Helper3above2)
                helper3above2: any;

                @msBefore()
                target3Call() {
                    self.beforeCallStack.push(3);
                }

                @msAfter()
                target3AfterCall() {
                    self.afterCallStack.push(3);
                }
            }

            const Helper4above2_1 = newHelper(this.beforeCallStack,this.afterCallStack,41);
            const Helper4above2_2 = newHelper(this.beforeCallStack,this.afterCallStack,42);


            @Suit()
            class Target4 extends Target3 {
                @msInsertAbove(Target2,Helper4above2_1)
                helper4above2_1: any;

                @msInsertAbove(Target2,Helper4above2_2)
                helper4above2_2: any;

                @msBefore()
                target4Call() {
                    self.beforeCallStack.push(4);
                }

                @msAfter()
                target4AfterCall() {
                    self.afterCallStack.push(4);
                }
            }

            const Helper5above2 = newHelper(this.beforeCallStack,this.afterCallStack,51);

            @Suit()
            class Target5 extends Target4 {
                @msInsertAbove(Target2,Helper5above2)
                helper5above2: any;

                @msBefore()
                target5call() {
                    self.beforeCallStack.push(5);
                }

                @msAfter()
                target5AfterCall() {
                    self.afterCallStack.push(5);
                }
            }

            new Target5();
        });

        before(RunSpyMethods);

        it("before call stack should have inserted calls before second suit", function () {
            this.beforeCallStack.should.be.eql([1, 51, 41, 42, 31, 2, 3, 4, 5]);
        });

        // afterCallStack is reversed due to it is spied
        it("after call stack should have inserted calls before second suit", function () {
            this.afterCallStack.should.be.eql([5, 4, 3, 2, 31, 42, 41, 51, 1].reverse());
        });

        after(ResetSpyMethods);
    });

    describe("insertAbove execution check.",function() {
        before(function () {
            const self = this;
            this.beforeCallStack = [] as number[];
            this.afterCallStack = [] as number[];

            @Suit()
            class Target {
                @msBefore()
                targetCall() {
                    self.beforeCallStack.push(1);
                }

                @msAfter()
                targetAfterCall() {
                    self.afterCallStack.push(1);
                }
            }

            @Suit()
            class Target2 extends Target {
                @msBefore()
                target2Call() {
                    self.beforeCallStack.push(2);
                }

                @msAfter()
                target2AfterCall() {
                    self.afterCallStack.push(2);
                }
            }

            const Helper3below2 = newHelper(this.beforeCallStack,this.afterCallStack,31);

            @Suit()
            class Target3 extends Target2 {
                @msInsertBelow(Target2,Helper3below2)
                helper3below2: any;

                @msBefore()
                target3Call() {
                    self.beforeCallStack.push(3);
                }

                @msAfter()
                target3AafterCall() {
                    self.afterCallStack.push(3);
                }
            }

            const Helper4below2_1 = newHelper(this.beforeCallStack,this.afterCallStack,41);
            const Helper4below2_2 = newHelper(this.beforeCallStack,this.afterCallStack,42);


            @Suit()
            class Target4 extends Target3 {
                @msInsertBelow(Target2,Helper4below2_1)
                helper4below2_1: any;

                @msInsertBelow(Target2,Helper4below2_2)
                helper4below2_2: any;

                @msBefore()
                target4Call() {
                    self.beforeCallStack.push(4);
                }

                @msAfter()
                target4AfterCall() {
                    self.afterCallStack.push(4);
                }
            }

            const Helper5below2 = newHelper(this.beforeCallStack,this.afterCallStack,51);

            @Suit()
            class Target5 extends Target4 {
                @msInsertBelow(Target2,Helper5below2)
                helper5below2: any;

                @msBefore()
                target5Call() {
                    self.beforeCallStack.push(5);
                }

                @msAfter()
                target5AfterCall() {
                    self.afterCallStack.push(5);
                }
            }

            new Target5();
        });

        before(RunSpyMethods);

        it("before call stack should have inserted calls after second suit", function () {
            this.beforeCallStack.should.be.eql([1, 2, 31, 41, 42, 51, 3, 4, 5]);
        });

        // afterCallStack is reversed due to it is spied
        it("after call stack should have inserted calls after second suit", function () {
            this.afterCallStack.should.be.eql([5, 4, 3, 51, 42, 41, 31, 2, 1].reverse());
        });

        after(ResetSpyMethods);
    });

    describe("replaceWith execution check.",function() {
        before(function () {
            const self = this;
            this.beforeCallStack = [] as number[];
            this.afterCallStack = [] as number[];

            @SuitHelper()
            class Replacer {
                @msBefore()
                replacerCall() {
                    self.beforeCallStack.push(0);
                }

                @msAfter()
                replacerAfterCall() {
                    self.afterCallStack.push(0);
                }
            }

            @Suit()
            class Target {
                @msBefore()
                targetCall() {
                    self.beforeCallStack.push(1);
                }

                @msAfter()
                targetAfterCall() {
                    self.afterCallStack.push(1);
                }
            }

            @Suit()
            class Target2 extends Target {
                @msBefore()
                target2Call() {
                    self.beforeCallStack.push(2);
                }

                @msAfter()
                target2AfterCall() {
                    self.afterCallStack.push(2);
                }
            }

            @Suit()
            class Target3 extends Target2 {
                @msReplaceWith(Target2,Replacer)
                replacedAttr: any;

                @msBefore()
                target3Call() {
                    self.beforeCallStack.push(3);
                }

                @msAfter()
                target3AfterCall() {
                    self.afterCallStack.push(3);
                }
            }

            new Target3();
        });

        before(RunSpyMethods);

        it("before call stack should have inserted calls after second suit", function () {
            this.beforeCallStack.should.be.eql([1, 0, 3]);
        });

        // afterCallStack is reversed due to it is spied
        it("after call stack should have inserted calls after second suit", function () {
            this.afterCallStack.should.be.eql([3, 0, 1].reverse());
        });

        after(ResetSpyMethods);
    });
});
