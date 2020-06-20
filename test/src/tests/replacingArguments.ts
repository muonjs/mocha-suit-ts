'use strict';

import { RunSpyMethods } from '../setup';
import { ResetSpyMethods } from '../setup';

var DELAY = 10;

var MSG = "Extending suit arguments.";

describe(MSG,function(){
    var mod = require("mocha-suit");

    ["before","after","beforeAll","afterAll","it","that"].forEach(function(method) {
        describe("For '"+method+"' method",function(){
            before(function() {
                this.Suit = mod();
                this.AnotherSuit = mod();

                var result: any[] = this.result = [];

                var methodArguments = [function() {
                    result.push({
                        argument1: this.suit.argument1,
                        argument2: this.suit.argument2
                    });
                }];

                if (["it","that"].indexOf(method) !== -1) {
                    var description: any = "";
                    methodArguments.unshift(description);
                }

                this.Suit[method].apply(this.Suit,methodArguments);

                this.AnotherSuit[method](this.Suit,{
                    argument1: 1,
                    argument2: 2
                });

                this.AnotherSuit[method](this.Suit,{
                   argument1: 3,
                   argument2: 4
                });
            });

            before(function(){
                this.AnotherSuit();
            });

            before(RunSpyMethods);

            it("First method run should contain arguments of first call",function(){
                this.result[0].should.have.property("argument1",1);
                this.result[0].should.have.property("argument2",2);
            });
            it("Second method run should contain arguments of second call",function(){
                this.result[1].should.have.property("argument1",3);
                this.result[1].should.have.property("argument2",4);
            });

            after(ResetSpyMethods);
        });
    });

    describe("For 'with' method",function(){
        before(function() {
            this.Suit = mod();
            this.AnotherSuit = mod();

            var beforeResult: any[] = this.beforeResult = [];
            var afterResult: any[] = this.afterResult = [];
            var itResult: any[] = this.itResult = [];

            this.Suit.before(function() {
                beforeResult.push({
                    argument1: this.suit.argument1,
                    argument2: this.suit.argument2
                });
            });

            this.Suit.it("",function() {
                itResult.push({
                    argument1: this.suit.argument1,
                    argument2: this.suit.argument2
                });
            });

            this.Suit.after(function() {
                afterResult.push({
                    argument1: this.suit.argument1,
                    argument2: this.suit.argument2
                });
            });

            this.AnotherSuit.with(this.Suit,{
                argument1: 1,
                argument2: 2
            });

            this.AnotherSuit.with(this.Suit,{
                argument1: 3,
                argument2: 4
            });
        });

        before(function(){
            this.AnotherSuit();
        });

        before(RunSpyMethods);

        it("Before runs should contain arguments of first and than second call",function(){
            this.beforeResult[0].should.have.property("argument1",1);
            this.beforeResult[0].should.have.property("argument2",2);
            this.beforeResult[1].should.have.property("argument1",3);
            this.beforeResult[1].should.have.property("argument2",4);
        });

        it("It runs should contain arguments of first and than second call",function(){
            this.itResult[0].should.have.property("argument1",1);
            this.itResult[0].should.have.property("argument2",2);
            this.itResult[1].should.have.property("argument1",3);
            this.itResult[1].should.have.property("argument2",4);
        });

        it("After runs should contain arguments of first and than second call",function(){
            this.afterResult[0].should.have.property("argument1",1);
            this.afterResult[0].should.have.property("argument2",2);
            this.afterResult[1].should.have.property("argument1",3);
            this.afterResult[1].should.have.property("argument2",4);
        });

        after(ResetSpyMethods);
    });

    describe("For 'with' method",function(){
        before(function() {
            this.Suit = mod();
            this.AnotherSuit = mod();

            var beforeResult: any[] = this.beforeResult = [];

            this.Suit.before(function(done: any) {
                beforeResult.push({
                    argument1: this.suit.argument1,
                    argument2: this.suit.argument2
                });
                setTimeout(function() {
                    done();
                },DELAY);
            });

            this.AnotherSuit.before(this.Suit,{
                argument1: 1,
                argument2: 2
            });

            this.AnotherSuit.before(this.Suit,{
                argument1: 3,
                argument2: 4
            });
        });

        before(function(){
            this.AnotherSuit();
        });

        before(RunSpyMethods);

        before(function(done){
            // since mocha methods are spied we need to wait until first timeout is called
            setTimeout(done,DELAY*2);
        });

        it("Before runs should contain arguments of first and than second call",function(){
            this.beforeResult[0].should.have.property("argument1",1);
            this.beforeResult[0].should.have.property("argument2",2);
            this.beforeResult[1].should.have.property("argument1",3);
            this.beforeResult[1].should.have.property("argument2",4);
        });

        after(ResetSpyMethods);
    });
});
