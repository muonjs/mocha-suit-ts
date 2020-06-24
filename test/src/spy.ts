'use strict';

import Func = Mocha.Func;

var fRegCheck = /^function\s*\S*?\s*\(\S+?\)/;

interface SpyProperties {
    run?: Function;
    reset?: Function;
    calledTimes?: Function;
    isCalled?: Function;
    calledWith?: Function;
    returned?: Function;
    doneMethod?: Function;
}

export interface SpyMethod extends SpyProperties {
    (): any;
}

export function generateMochaMethod() : SpyMethod {
    var args: any[] = [];
    var ret: any[] = [];
    var called: any[] = [];
    var done: any[] = [];

    var method: SpyMethod = function() {
        args.push([].slice.call(arguments));
    };

    method.run = function(){
            var ctx = {};
            for(var _i = 0; _i < args.length; _i++) {
                (function(i){
                    if (called[i]) {
                        return;
                    }
                    args[i].forEach(function(arg: any){
                        // console.log(1,(arg || "").toString(),);
                        if (arg instanceof Function) {
                            if (fRegCheck.test(arg.toString())) {
                                done[i] = function(){
                                    done[i].called = true;
                                };
                                ret[i] = arg.call(ctx,done[i]);
                            } else {
                                done[i] = null;
                                ret[i] = arg.call(ctx);
                            }
                        }
                        called[i] = true;
                    });
                })(_i);
            }
        };
    method.reset = function(){
            args = [];
            ret = [];
            done = [];
            called = [];
        };
    method.calledTimes = function(){
            return args.length;
        };
    method.isCalled = function(i: number){
            return called[i] === true;
        };
    method.calledWith = function(i: number){
            return args[i];
        };
    method.returned = function(i: number){
            return ret[i];
        };
    method.doneMethod = function(i: number){
            return done[i];
        };

    return method;
};
