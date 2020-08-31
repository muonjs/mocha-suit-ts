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
    describe("withHelper property check", function() {
        let helperBeforeProxyAttribute: any,
            helperItProxyAttribute: any,
            helperAfterProxyAttribute: any,
            helperConstructorArgument: any,
            suitProperty: any;

        before(function() {
            class HelperProxy {}

            @SuitHelper()
            class Helper {
                proxy: HelperProxy;
                @msBefore()
                helperBefore() {
                    helperBeforeProxyAttribute = this.proxy;
                }

                @msIt()
                helperIT() {
                    helperItProxyAttribute = this.proxy;
                }

                @msAfter()
                helperAfter() {
                    helperAfterProxyAttribute = this.proxy;
                }

                constructor(arg: HelperProxy) {
                    this.proxy = arg;
                    helperConstructorArgument = this.proxy;
                }
            }

            @Suit()
            class TargetSuit {
                @withHelper(Helper)
                property: HelperProxy;

                constructor() {
                    this.property = new HelperProxy();
                    suitProperty = this.property;
                }
            }

            new TargetSuit();
        });
        before(RunSpyMethods);

        it("property of TargetSuit should be passed to Helper constructor",function() {
            expect(suitProperty).to.be(helperConstructorArgument);
        });

        it("property of TargetSuit should be passed to Helper before call",function() {
            expect(suitProperty).to.be(helperBeforeProxyAttribute);
        });

        it("property of TargetSuit should be passed to Helper it call",function() {
            expect(suitProperty).to.be(helperItProxyAttribute);
        });

        it("property of TargetSuit should be passed to Helper after call",function() {
            expect(suitProperty).to.be(helperAfterProxyAttribute);
        });

        after(ResetSpyMethods);
    });

    describe("withHelper getter property check", function() {
        let helperBeforeProxyAttribute: any,
            helperItProxyAttribute: any,
            helperAfterProxyAttribute: any,
            helperConstructorArgument: any,
            suitProperty: any,
            helperProxyArgument: any;

        before(function() {
            class HelperProxy {
                argument: boolean;
                constructor() {
                    this.argument = false;
                }
            }

            @SuitHelper()
            class Helper {
                proxy: HelperProxy;
                @msBefore()
                helperBefore() {
                    helperBeforeProxyAttribute = this.proxy;
                }

                @msIt()
                helperIT() {
                    helperItProxyAttribute = this.proxy;
                }

                @msAfter()
                helperAfter() {
                    helperAfterProxyAttribute = this.proxy;
                }

                constructor(arg: HelperProxy) {
                    this.proxy = arg;
                    helperConstructorArgument = this.proxy;
                    helperProxyArgument = this.proxy.argument;
                }
            }

            @Suit()
            class TargetSuit {
                _property: HelperProxy;

                @msBefore()
                setPropertyArgument() {
                    this._property.argument = true;
                }

                @withHelper(Helper)
                get property(): HelperProxy {
                    return this._property;
                }

                constructor() {
                    this._property = new HelperProxy();
                    suitProperty = this.property;
                }
            }

            new TargetSuit();
        });
        before(RunSpyMethods);

        it("_property of TargetSuit should be passed to Helper constructor (via getter)",function() {
            expect(suitProperty).to.be(helperConstructorArgument);
        });

        it("_property of TargetSuit should be passed to Helper before call (via getter)",function() {
            expect(suitProperty).to.be(helperBeforeProxyAttribute);
        });

        it("_property of TargetSuit should be passed to Helper it call (via getter)",function() {
            expect(suitProperty).to.be(helperItProxyAttribute);
        });

        it("_property of TargetSuit should be passed to Helper after call (via getter)",function() {
            expect(suitProperty).to.be(helperAfterProxyAttribute);
        });

        it("constructor of Helper should be called right before first Helper before call",function() {
            expect(helperProxyArgument).to.be(true);
        });

        after(ResetSpyMethods);
    });
});
