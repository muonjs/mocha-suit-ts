import { before, Suit, SuitHelper, SuitFactory } from "mocha-suit-ts";

interface SomeHelperDescriptor {
    some: string
}

@SuitHelper()
class SomeHelper implements SomeHelperDescriptor {
    requestedURL: string;
    cookies: any;
    some: string;
    constructor() {}
}

@Suit("some")
class Some {
    private hello: number;
    private url: string = "some";
    @before("doing something")
    call() {
        this.hello = 1;
        console.log("call",this.hello);
    }
    @before(SomeHelper)
    get variable(): SomeHelperDescriptor {
        console.log("variable",this.hello);
        return {
            some: "1"
        }
    }

    constructor(arg: any) {}
}

@Suit("other")
class Other extends Some {
    @before("doing something other")
    otherCall() {
        console.log("No body has though");
    }
    constructor(arg: any) {
        super(arg);
    }
}

new Some({
    arg: 1,
    b: 2
});

new Other({
    arg: 1,
    b: 2
});

SuitFactory(Some, {
    "case1": {
        a: 1,
    },
    "case2": {
        a: 2
    }
});
