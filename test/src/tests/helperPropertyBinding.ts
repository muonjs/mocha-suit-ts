'use strict';

import { TestingMethods, RunSpyMethods, ResetSpyMethods } from '../setup';

require("should");
const expect = require("expect.js");

import {
    Suit,
    before as msBefore,
    after as msAfter,
    it as msIt,
    withHelper, SuitHelper
} from "mocha-suit-ts";

describe('Helper property binding check', function () {
    describe("withHelper explicit property check", function() {
        let helperBeforeContext: any,
            helperItContext: any,
            helperAfterContext: any,
            helperConstructorContext: any,
            suitProperty: any;

        before(function() {
            @SuitHelper()
            class Helper {
                @msBefore()
                helperBefore() {
                    helperBeforeContext = this;
                }

                @msIt()
                helperIT() {
                    helperItContext = this;
                }

                @msAfter()
                helperAfter() {
                    helperAfterContext = this;
                }

                constructor() {
                    helperConstructorContext = this;
                }
            }

            @Suit()
            class TargetSuit {
                @withHelper(Helper)
                property = new Helper();

                constructor() {
                    suitProperty = this.property;
                }
            }

            new TargetSuit();
        });
        before(RunSpyMethods);

        it("property of TargetSuit should be passed to Helper constructor",function() {
            expect(suitProperty).to.be(helperConstructorContext);
        });

        it("property of TargetSuit should be passed as context to Helper before call",function() {
            expect(suitProperty).to.be(helperBeforeContext);
        });

        it("property of TargetSuit should be passed as context to Helper it call",function() {
            expect(suitProperty).to.be(helperItContext);
        });

        it("property of TargetSuit should be passed as context to Helper after call",function() {
            expect(suitProperty).to.be(helperAfterContext);
        });

        after(ResetSpyMethods);
    });

    describe("withHelper implicit property with arguments check", function() {
        let helperBeforeContext: any,
            helperItContext: any,
            helperAfterContext: any,
            helperConstructorContext: any,
            suitProperty: any;

        const ARG1 = 1, ARG2 = 2, ARG3 = 3;
        let arg1ToCheck: any, arg2ToCheck: any, arg3ToCheck: any;

        before(function() {
            @SuitHelper()
            class Helper {
                @msBefore()
                helperBefore() {
                    helperBeforeContext = this;
                }

                @msIt()
                helperIT() {
                    helperItContext = this;
                }

                @msAfter()
                helperAfter() {
                    helperAfterContext = this;
                }

                constructor(arg1: any,arg2: any,arg3: any) {
                    arg1ToCheck = arg1;
                    arg2ToCheck = arg2;
                    arg3ToCheck = arg3;
                    helperConstructorContext = this;
                }
            }

            @Suit()
            class TargetSuit {
                @withHelper(Helper,ARG1,ARG2,ARG3)
                _1: undefined;

                constructor() {
                    suitProperty = this._1;
                }
            }

            new TargetSuit();
        });
        before(RunSpyMethods);

        it("property of TargetSuit should stay undefined",function() {
            expect(suitProperty).to.be(undefined);
        });

        it("helper instance should be passed as context to Helper before call",function() {
            expect(helperConstructorContext).to.be(helperBeforeContext);
        });

        it("helper instance should be passed as context to Helper it call",function() {
            expect(helperConstructorContext).to.be(helperItContext);
        });

        it("helper instance should be passed as context to Helper after call",function() {
            expect(helperConstructorContext).to.be(helperAfterContext);
        });

        it("decorator arguments should be put as Helper constructor arguments", function() {
            expect(arg1ToCheck).to.be(ARG1);
            expect(arg2ToCheck).to.be(ARG2);
            expect(arg3ToCheck).to.be(ARG3);
        });

        after(ResetSpyMethods);
    });
});
