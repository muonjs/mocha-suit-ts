// 'use strict;'
//
// import { RunSpyMethods } from '../setup';
// import { ResetSpyMethods } from '../setup';
// import { capitalize } from '../setup';
// import { TestingMethods } from '../setup';
//
// import sinon = require("sinon");
//
// import {
//     Suit, SuitHelper,
//     before as msBefore,
//     beforeEach as msBeforeEach,
//     after as msAfter,
//     afterEach as msAfterEach,
//     it as msIt, that as msThat,
//     xit as msXIt, xthat as msXThat,
//     withHelper
// } from "mocha-suit-ts";
//
//
// describe("Check mocha methods call.",function(){
//
//     describe("Describe.",function(){
//         describe("Base Suit generation.",function(){
//             before(function(){
//                 @Suit()
//                 class TargetClass {}
//
//                 new TargetClass();
//             });
//
//             before(RunSpyMethods);
//
//             it("One describe block should be generated.",function(){
//                 TestingMethods.describe.calledTimes().should.be.eql(1);
//             });
//
//             after(ResetSpyMethods);
//         });
//
//         describe("Describe with extend.",function(){
//             before(function(){
//                 @Suit()
//                 class SuperClass {}
//
//                 @Suit()
//                 class TargetClass extends SuperClass {}
//
//                 new TargetClass();
//             });
//
//             before(RunSpyMethods);
//
//             it("Two describe blocks should be generated.",function(){
//                 TestingMethods.describe.calledTimes().should.be.eql(2);
//             });
//
//             after(ResetSpyMethods);
//         });
//
//         describe("Describe with double extend.",function(){
//             before(function(){
//                 @Suit()
//                 class BaseSuperClass {}
//
//                 @Suit()
//                 class SuperClass extends BaseSuperClass {}
//
//                 @Suit()
//                 class TargetClass extends SuperClass {}
//
//                 new TargetClass();
//             });
//
//             before(RunSpyMethods);
//
//             it("Three describe blocks should be generated.",function(){
//                 TestingMethods.describe.calledTimes().should.be.eql(3);
//             });
//
//             after(ResetSpyMethods);
//         });
//     });
//
//     const runSetup = function(d: any){
//         describe("",function(){
//             before(function(){
//                 const spy = sinon.spy();
//                 class TargetSuit {
//                     @d.method()
//                     call() { return spy(); }
//                 }
//                 this.spies = [];
//                 for(let i = 0; i < d.times; i++) {
//                     this.spies.push(spy);
//                     this.suit(spy);
//                 }
//
//                 this.suit();
//             });
//
//             before(RunSpyMethods);
//
//             it(d.method + " should be called once",function(){
//                 TestingMethods[d.method].calledTimes().should.be.eql(d.times);
//             });
//
//             it(d.method + " spy should be called",function(){
//                 for(let i = 0; i < d.times; i++) {
//                     this.spies[i].called.should.be.true();
//                 }
//             });
//
//             after(ResetSpyMethods);
//         });
//     };
//
//     [msBefore,msBeforeEach,msAfter,msAfterEach].forEach(function(method){
//         runSetup({ method: method, times: 10});
//     });
//
//     // const runIt = function(d: any){
//     //     describe(d.describe,function(){
//     //         before(function(){
//     //             this.suit = mod();
//     //             this.spies = [];
//     //             for(let i = 0; i < d.times; i++) {
//     //                 const spy = sinon.spy();
//     //                 this.spies.push(spy);
//     //                 this.suit[d.method]("",spy);
//     //             }
//     //
//     //             this.suit();
//     //         });
//     //
//     //         before(RunSpyMethods);
//     //
//     //         it(d.toBeCalled + " should be called once",function(){
//     //             TestingMethods[d.toBeCalled].calledTimes().should.be.eql(d.times);
//     //         });
//     //
//     //         it(d.toBeCalled + " spy should be called",function(){
//     //             for(let i = 0; i < d.times; i++) {
//     //                 this.spies[i].called.should.be.true();
//     //             }
//     //         });
//     //
//     //         after(ResetSpyMethods);
//     //     });
//     // };
//     //
//     // [
//     //     {method: "that", toBeCalled: "it"},
//     //     {method: "xthat", toBeCalled: "xit"},
//     //     {method: "it", toBeCalled: "it"},
//     //     {method: "xit", toBeCalled: "xit"}
//     // ].forEach(function(descr: any){
//     //     descr.describe = capitalize(descr.method);
//     //     descr.times = 10;
//     //     runIt(descr);
//     // });
// });
