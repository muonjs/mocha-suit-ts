// 'use strict';
//
// import { RunSpyMethods,
//     ResetSpyMethods,
//     TestingMethods } from '../setup';
//
// import {
//     Suit, SuitHelper,
//     before as msBefore,
//     after as msAfter,
//     it as msIt, that as msThat,
//     xit as msXIt, xthat as msXThat,
//     withHelper
// } from "mocha-suit-ts";
// import {MochaSuite} from "../../../src/app";
//
// describe("Helper property assigning",function(){
//
//     before(function(){
//         interface HelperInterface {
//             value: number;
//             other: string;
//             [key:string]: any;
//         }
//
//         @SuitHelper()
//         class OtherHelper extends MochaSuite implements HelperInterface {
//             value: number;
//             other: string;
//             @msBefore()
//             beforeHelper() {
//                 // console.log("before other helper: this",this);
//             }
//
//             constructor(arg: any) {
//                 super();
//                 Object.assign(this,arg);
//             }
//         }
// //
// //         @SuitHelper()
// //         class Helper implements HelperInterface {
// //             value: number;
// //             other: string;
// //
// //             @withHelper(OtherHelper)
// //             get some(): HelperInterface {
// //                 return {
// //                     value: 1+this.value,
// //                     other: "other helper for some"
// //                 }
// //             }
// //
// //             @msBefore()
// //             doSomething() {
// //                 // console.log("before helper: this",this);
// //             }
// //
// //             constructor(arg: any) {
// //                 Object.assign(this,arg);
// //             }
// //         }
// //
// //         @Suit("")
// //         class SuperSuit {
// //             @withHelper(Helper)
// //             get _with(): HelperInterface {
// //                 return {
// //                     other: "some value",
// //                     value: 100
// //                 }
// //             };
// //         }
// //
// //         @Suit("")
// //         class TargetSuit extends SuperSuit {
// //             @msBefore()
// //             beforeSuper() {
// //                 suitBeforeThis = this;
// //                 // console.log("before suit: this._with",this._with);
// //
// //             }
// //
// //             @withHelper(Helper)
// //             get _with1(): HelperInterface {
// //                 return {
// //                     other: "some value",
// //                     value: 10
// //                 }
// //             };
// //
// //             @withHelper(Helper)
// //             get _otherWith(): HelperInterface {
// //                 return {
// //                     other: "some other value",
// //                     value: 20
// //                 }
// //             };
// //
// //
// //             @msAfter()
// //             afterSuit() {
// //                 // console.log("after suit: this",this);
// //                 // console.log("after suit: this._with",this._with);
// //                 // console.log("after suit: this._otherWith",this._otherWith);
// //                 // console.log("after suit: this._with.some",this._with["some"]);
// //                 // console.log("after suit: this._otherWith.some",this._otherWith["some"]);
// //             }
// //
// //             a = 1;
// //             b: number;
// //             constructor() {
// //                 super();
// //                 this.b = 2;
// //             }
// //         }
// //
// //         new TargetSuit();
// //     });
// //
// //     before(RunSpyMethods);
// //
// //     // todo
// //     it("Some message here",function(){
// //         ((helperBeforeThis === helperAfterThis) as any).should.be.ok();
// //         // TestingMethods.before.calledTimes().should.be.eql(SETUP_CALL_TIMES);
// //     });
// //
// //     after(ResetSpyMethods);
// });
