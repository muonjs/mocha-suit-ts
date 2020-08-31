// 'use strict';
//
// import { capitalize } from '../setup';
// import { RunSpyMethods } from '../setup';
// import { ResetSpyMethods } from '../setup';
// import { TestingMethods } from '../setup';
//
// import sinon = require("sinon");
//
// const MSG = "Composing Suit.";
//
// describe(MSG,function(){
//     const mod = require("mocha-suit");
//
//     ["before","beforeEach","beforeAll","after","afterAll","afterEach"].forEach(function(method){
//         describe(capitalize(method)+".",function(){
//             before(function() {
//                 this.suit = mod();
//                 this.helperSuit = mod();
//                 this.helperSpy = sinon.spy();
//                 this.helperSuit[method](this.helperSpy);
//
//                 this.suit.before(function(){});
//                 this.suit.beforeEach(function(){});
//                 this.suit.beforeAll(function(){});
//                 this.suit.after(function(){});
//                 this.suit.afterEach(function(){});
//                 this.suit.afterAll(function(){});
//                 this.suit.it("",function(){});
//                 this.suit.xit("",function(){});
//                 this.suit.that("",function(){});
//                 this.suit.xthat("",function(){});
//
//                 this.suit[method](this.helperSuit);
//                 this.suit();
//             });
//
//             before(RunSpyMethods);
//
//             it(method+" should be run twice",function(){
//                 TestingMethods.it.calledTimes().should.be.eql(2);
//                 this.helperSpy.called.should.be.true()
//             });
//
//             after(ResetSpyMethods);
//         });
//     });
//
//     ["it","xit","that","xthat"].forEach(function(method){
//         describe(capitalize(method)+".",function(){
//             before(function() {
//                 this.suit = mod();
//                 this.helperSuit = mod();
//                 this.helperSpy = sinon.spy();
//                 this.helperSuit[method]("",this.helperSpy);
//
//                 this.suit.before(function(){});
//                 this.suit.beforeEach(function(){});
//                 this.suit.after(function(){});
//                 this.suit.afterEach(function(){});
//                 this.suit.it("",function(){});
//                 this.suit.xit("",function(){});
//                 this.suit.that("",function(){});
//                 this.suit.xthat("",function(){});
//
//                 this.suit[method](this.helperSuit);
//                 this.suit();
//             });
//
//             before(RunSpyMethods);
//
//             it(method+" should be run twice",function(){
//                 if (/^x/.test(method)) {
//                     TestingMethods.xit.calledTimes().should.be.eql(3);
//                 } else {
//                     TestingMethods.it.calledTimes().should.be.eql(3);
//                 }
//                 this.helperSpy.called.should.be.true()
//             });
//
//             after(ResetSpyMethods);
//         });
//     });
//
//     describe("With.",function(){
//         before(function(){
//             this.helperSuit = mod();
//
//             this.beforeSpy = sinon.spy();
//             this.helperSuit.before(this.beforeSpy);
//
//             this.beforeEachSpy = sinon.spy();
//             this.helperSuit.beforeEach(this.beforeEachSpy);
//
//             this.beforeAllSpy = sinon.spy();
//             this.helperSuit.beforeAll(this.beforeAllSpy);
//
//             this.afterSpy = sinon.spy();
//             this.helperSuit.after(this.afterSpy);
//
//             this.afterEachSpy = sinon.spy();
//             this.helperSuit.afterEach(this.afterEachSpy);
//
//             this.afterAllSpy = sinon.spy();
//             this.helperSuit.afterAll(this.afterAllSpy);
//
//             this.itSpy = sinon.spy();
//             this.helperSuit.it("",this.itSpy);
//
//             this.xitSpy = sinon.spy();
//             this.helperSuit.xit("",this.xitSpy);
//
//             this.thatSpy = sinon.spy();
//             this.helperSuit.that("",this.thatSpy);
//
//             this.xthatSpy = sinon.spy();
//             this.helperSuit.xthat("",this.xthatSpy);
//         });
//
//         before(function(){
//             this.suit = mod();
//             this.suit.before(function(){});
//             this.suit.beforeEach(function(){});
//             this.suit.beforeAll(function(){});
//             this.suit.after(function(){});
//             this.suit.afterEach(function(){});
//             this.suit.afterAll(function(){});
//             this.suit.it("",function(){});
//             this.suit.xit("",function(){});
//             this.suit.that("",function(){});
//             this.suit.xthat("",function(){});
//
//             this.suit.with(this.helperSuit);
//             this.suit();
//         });
//
//         before(RunSpyMethods);
//
//         it("before spy should be called",function(){
//             this.beforeSpy.called.should.be.true();
//         });
//
//         it("beforeEach spy should be called",function(){
//             this.beforeEachSpy.called.should.be.true();
//         });
//
//         it("beforeAll spy should be called",function(){
//             this.beforeAllSpy.called.should.be.true();
//         });
//
//         it("after spy should be called",function(){
//             this.afterSpy.called.should.be.true();
//         });
//
//         it("afterEach spy should be called",function(){
//             this.afterEachSpy.called.should.be.true();
//         });
//
//         it("afterAll spy should be called",function(){
//             this.afterAllSpy.called.should.be.true();
//         });
//
//         it("it spy should be called",function(){
//             this.itSpy.called.should.be.true();
//         });
//
//         it("xit spy should be called",function(){
//             this.xitSpy.called.should.be.true();
//         });
//
//         it("that spy should be called",function(){
//             this.thatSpy.called.should.be.true();
//         });
//
//         it("xthat spy should be called",function(){
//             this.xthatSpy.called.should.be.true();
//         });
//
//         after(ResetSpyMethods);
//     });
// });


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
         afterEach as msAfterEach, } from 'mocha-suit-ts';

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
                    @msBefore(Helper)
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

                    @msMethod(Helper)  //у меня так не работает: helperSpy() не запускается
                    simpleHelperMethod: any;
                };

                new SuperSuit();
            });

            before(RunSpyMethods);

            it(msMethod.name+" should be run twice",function(){
                TestingMethods[msMethod.name].calledTimes().should.be.eql(2);
            });
            it("helper method should be called", function() {
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

            it(msMethod.name+" should be run triple",function(){
                if (/^x/.test(msMethod.name)) {
                    TestingMethods.xit.calledTimes().should.be.eql(3);
                } else {
                    TestingMethods.it.calledTimes().should.be.eql(3);
                };
                expect(helperSpy.called).to.be.ok();
            });

            after(ResetSpyMethods);
        });
    })
});
