'use strict';

var fRegCheck = /^function\s*\S*?\s*\(\S+?\)/;

export function generateMochaMethod(name: string){

    var args: any[] = [];
    var ret: any[] = [];
    var called: any[] = [];
    var done: any[] = [];

    var method = {
        // name: args.push([].slice.call(arguments)),
        name: function(){
        args.push([].slice.call(arguments));
    },
        run: function(){
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
        },
        reset: function(){
            args = [];
            ret = [];
            done = [];
            called = [];
        },

        calledTimes: function(){
            return args.length;
        },

        isCalled: function(i: number){
            return called[i] === true;
        },

        calledWith: function(i: number){
            return args[i];
        },

        returned: function(i: number){
            return ret[i];
        },

        doneMethod: function(i: number){
            return done[i];
        }
    };

    return method;
};
