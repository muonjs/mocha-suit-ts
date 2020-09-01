import { capitalize } from '../setup';
import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';
import { TestingMethods } from '../setup';

import { Suit, SuitHelper,
         before as msBefore,
         beforeEach as msBeforeEach,
         it as msIt,
         xit as msXIt,
         that as msThat,
         xthat as msXThat,
         after as msAfter,
         afterEach as msAfterEach,
         withHelper} from 'mocha-suit-ts';

import sinon = require("sinon");

const expect = require("expect.js");

const MSG = "Composing Suit.";

describe(MSG, function(){
    [msBefore, msBeforeEach, msAfter, msAfterEach].forEach(function(msMethod) {
        describe(capitalize(msMethod.name), function() {
            const helperSpy = sinon.spy();

            before(function(){

                @SuitHelper()
                class Helper {
                    @msMethod()
                    helperMethod() {
                        helperSpy();
                    };
                };

                @Suit()
                class SuperSuit {
                    @msBefore()
                    beforeFunction() {};

                    @msBeforeEach()
                    beforeEachFunction() {};

                    @msIt()
                    itFunction() {};

                    @msXIt()
                    xitFunction() {};

                    @msThat()
                    thatFunction() {};

                    @msXThat()
                    xthatFunction() {};

                    @msAfterEach()
                    afterEachFunction() {};

                    @msAfter()
                    afterFunction() {};

                    @msMethod(Helper)
                    simpleHelperMethod: any;
                };

                new SuperSuit();
            });

            before(RunSpyMethods);

            it(msMethod.name+" method should be run twice",function(){
                TestingMethods[msMethod.name].calledTimes().should.be.eql(2);
            });
            it(msMethod.name+" helper method should be called", function() {
                expect(helperSpy.called).to.be.ok();
            });

            after(ResetSpyMethods);
        });
    });

    [msIt, msXIt, msThat, msXThat].forEach(function(msMethod) {
        describe(capitalize(msMethod.name), function() {
            const helperSpy = sinon.spy();

            before(function(){

                @SuitHelper()
                class Helper{
                    @msMethod()
                    helperMethod() { return helperSpy(); };
                };

                @Suit()
                class SuperSuit{
                    @msBefore()
                    beforeFunction() {};

                    @msBeforeEach()
                    beforeEachFunction() {};

                    @msIt()
                    itFunction() {};

                    @msXIt()
                    xitFunction() {};

                    @msThat()
                    thatFunction() {};

                    @msXThat()
                    xthatFunction() {};

                    @msAfterEach()
                    afterEachFunction() {};

                    @msAfter()
                    afterFunction() {};

                    @msMethod(Helper)
                    simpleHelperMethod: any;
                };

                new SuperSuit();
            });

            before(RunSpyMethods);

            it(msMethod.name+" method should be run triple",function(){
                if (/^x/.test(msMethod.name)) {
                    TestingMethods.xit.calledTimes().should.be.eql(3);
                } else {
                    TestingMethods.it.calledTimes().should.be.eql(3);
                };
            });
            it(msMethod.name+" helper method should be called", function(){
                expect(helperSpy.called).to.be.ok();
            });

            after(ResetSpyMethods);
        });
    });

    describe("withHelper", function() {
        let beforeSpy = sinon.spy();
        let beforeEachSpy = sinon.spy();
        let itSpy = sinon.spy();
        let xitSpy = sinon.spy();
        let thatSpy = sinon.spy();
        let xthatSpy = sinon.spy();
        let afterEachSpy = sinon.spy();
        let afterSpy = sinon.spy();

        before(function() {
            @SuitHelper()
            class Helper{
                @msBefore()
                beforeFunction() { return beforeSpy(); }

                @msBeforeEach()
                beforeEachFunction() { return beforeEachSpy(); }

                @msIt()
                itFunction() { return itSpy(); }

                @msXIt()
                xitFunction() { return xitSpy(); }

                @msThat()
                thatFunction() {return thatSpy(); }

                @msXThat()
                xthatFunction() { return xthatSpy(); }

                @msAfterEach()
                afterEachFunction() { return afterEachSpy(); }

                @msAfter()
                afterFunction() { return afterSpy(); }
            };

            @Suit()
            class SuperSuit {
                @msBefore()
                beforeFunction() {};

                @msBeforeEach()
                beforeEachFunction() {};

                @msIt()
                itFunction() {};

                @msXIt()
                xitFunction() {};

                @msThat()
                thatFunction() {};

                @msXThat()
                xthatFunction() {};

                @msAfterEach()
                afterEachFunction() {};

                @msAfter()
                afterFunction() {};

                @withHelper(Helper)
                helperProp: any;
            };

            new SuperSuit()
        });

        before(RunSpyMethods);

        [beforeSpy, beforeEachSpy, itSpy, xitSpy, thatSpy, xthatSpy, afterEachSpy, afterSpy].forEach(function(spyMethod) {
            it(spyMethod.name + " helper method should be called",function(){
                expect(spyMethod.called).to.be.ok();
            });

        after(ResetSpyMethods);
        });
    });
});
