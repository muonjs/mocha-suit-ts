// 'use strict';
//
// import {Suit} from "../../../src/app";
//
// const MSG = "Base system test.";
//
// const expect = require("expect.js");
// describe(MSG,function(){
//     const mod = require("mocha-suit");
//     const run = function(){
//         it("Suit should have all base factory methods.",function(){
//             const self = this;
//             @Suit("")
//             class TargetSuit {
//
//             }
//             self.suit.should.have.property("name","Suit");
//             [
//                 "extend",
//                 "before","beforeEach","beforeAll",
//                 "after","afterEach","afterAll",
//                 "it","xit",
//                 "that","xthat",
//                 "with","replaceWith",
//                 "setBefore","setAfter",
//                 "setBeforeAll","setAfterAll"
//             ].forEach(function(prop){
//                 self.suit.should.have.property(prop).which.is.a.Function();
//             });
//         });
//
//     };
//
//     describe("Generated suit",function(){
//         before(function(){
//
//             @Suit('')
//             class TestSuit {}
//
//             this.suit = TestSuit;
//         });
//         run();
//         it("Suit parent should be null",function(){
//             expect(this.suit.parent).to.eql(null);
//         });
//     });
//
//     describe("Extended suit",function(){
//         before(function(){
//             this.parent = mod();
//             this.suit = this.parent.extend("some");
//         });
//         run();
//         it("Suit parent should be null",function(){
//             expect(this.suit.parent).to.eql(this.parent);
//         });
//     });
// });
