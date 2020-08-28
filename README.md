# MochaSuit for TypeScript

**MochaSuit for TS** - is a wrapper for widely spread [Mocha](https://mochajs.org) testing framework,
which utilize all benefits of OOP and static typing provided by [TypeScript](http://typescriptlang.org/).

## How it works

Instead of reading long explanations just look at this code:

```typescript
import { Suit, before, it, after } from "mocha-suit-ts";
const Request = require('request');
const expect = require("expect.js");

@Suit("Checking HTTP status code")
class GetRequestCheck {
    statusCode: number;

    @before()
    sendRequestToServer(done) {        
        Request("https://www.google.com",(error, response) => {
            this.statusCode = response && response.statusCode;
            done();
        })
    }    

    @it("status code should be 200")
    checkStatusCode() {
        expect(this.statusCode).to.be(200);
    }   
    
    @after()
    sayByeBye() {
        // "Google is up!" =)
    }
}

new GetRequestCheck();
```

Equivalent Mocha code for this example:

```javascript
const Request = require('request');
const expect = require("expect.js");

describe("Checking HTTP status code",function() {
    before("GetRequestCheck::sendRequestToServer",function(done) {        
        Request("https://www.google.com",(error, response) => {
            this.statusCode = response && response.statusCode;
            done();
        });
    });    
    
    it("GetRequestCheck::checkStatusCode: status code should be 200",function() {
        expect(this.statusCode).to.be(200);
    });
    
    after("GetRequestCheck::sayByeBye",function() {
        // "Google is up!" =)
    });
});
```

Result of code execution looks like well known Spec reporter (or any of your choice) output: 

```text
  Checking HTTP status code.
    ✓ GetRequestCheck::checkStatusCode: status code should be 200

  1 passing (292ms)
```

For full list of **MochaSuit for TS** advantages look at [use cases](#use-cases)

## Installation and running 

**MochaSuit for TS** can be installed as any other NPM-package. 
Also you need to install Mocha and TypeScript compiler by yourself.

```shell script
$ npm i --save mocha-suit-ts
$ npm i -g mocha
$ npm i -g typescript
```

### Tests code directory tree

You may organize tests directory as you wish as long as it complies requirements of Mocha framework.
Considering need of translation TypeScript code to JavaScript you may embrace next tests directory tree:

```shell script
$ tree .
└── test/
    ├── tsconfig.json # <- TypeScript configuration dedicated for tests
    ├── src/
    |   └──yourtest.ts  
    └── build/
        └──yourtest.js # <- automaticaly generated JavaScipt
```

### TypeScript configuring

Major trait of **MochaSuit for TS** is using of TypeScript decorators, which are still language experimental feature. 
Hence do not forget to include `experimentalDecorators` in your `tsconfig.json`.

Here is `tsc` compiler configuration which is used for building MochaSuit for TS itself:

```json
{
  "compilerOptions": {
    "outDir": "./build",
    "allowJs": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": false,
    "inlineSourceMap": true,
    "lib": ["es2015"],
    "module": "commonjs",
    "target": "es5",
    "experimentalDecorators": true
  },
  "include":[
    "./src/**/*"
  ]
}
```

### Running

Launch tests is easy as any other mocha tests:

```shell script
$ tsc -p test
$ mocha --recursive test/build
```

# Use cases

*Coming soon*

## LICENSE

Copyright (c) 2020 [Kirill Sukharev](sukharevkirill@gmail.com). The MIT License [MIT](./LICENSE)








 

