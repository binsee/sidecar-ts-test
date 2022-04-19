# Sidecar test for typescript

Let's write code in typescript!

## Summary

Since sidecar directly wraps frida-agent-scripts through mustache, it essentially just adds code at the beginning and end to call the code in the agent.

But after the agent is written in typescript and compiled into a single js file using frida-compile, its code is an anonymous function, and you cannot access the functions inside the anonymous function.

So we need to find a way to export the functions inside the anonymous function to the global space, so that these functions can be found and called.

Fortunately, frida-complite has a parameter `standalone` to support this need.

https://github.com/frida/frida-compile/blob/0dda064d8924f02f09ceb5e9b469dd9180fc773e/bin/compile.js#L19

It can specify a global namespace, and the variables and functions exported by export in the agent can be linked to this namespace.

Therefore, we can access the data exported inside the anonymous function of the agent through the namespace outside the agent code.

## Need

- A test target. `gping` is selected here.
  - install: run `brew install gping`
- `frida-tools`: [Frida CLI | Frida • A world-class dynamic instrumentation framework](https://frida.re/docs/frida-cli/)
  - install: run `pip install frida-tools`
- Sidecar that supports ts
  - https://github.com/huan/sidecar/pull/35
  - If this pr is not merged, you need to manually compile the sidecar and replace it to the `node_modules/sidecar/dist/esm/src` directory.

## Test step

1. `npm i`
2. run `gping`: `gping 127.0.0.1`
3. run npm script

| script name       | note                                                     |
| ----------------- | -------------------------------------------------------- |
| `start`           | run `start:namespace`                                    |
| `start:base`      | build agent without namespace, and run sidecar test code |
| `start:namespace` | build agent use namespace, and run sidecar test code     |
| `start:run`       | run sidecar test code                                    |
| `dump`            | dump agent for sidecar                                   |
| `build`           | run `build:namespace`                                    |
| `build:base`      | build agent without namespace                            |
| `build:namespace` | build agent use namespace                                |
| `checkTarget`     | check test target                                        |
| `cli`             | run `cli:namespace`                                      |
| `cli:base`        | build agent without namespace, and run frida-cli         |
| `cli:namespace`   | build agent use namespace, and run frida-cli             |

## Verify

We use `frida` cli, load agent script, and verify it.

### Verify without namespaces

Compile the agent with frida-compile, but without namespaces.

1. run `npm run cli:base`
2. Output:

```bash
****> sidecar-ts-test@1.0.1 build:base
> frida-compile -t tsconfig-agent.json src/agent/mod.ts -o src/init-agent-script.js

     ____
    / _  |   Frida 15.1.17 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/
   . . . .
   . . . .   Connected to Local System (id=local)
Attaching...
Frida.version: 15.1.17
Script.runtime: QJS
Hello Tom!
[Local::gping ]->
---------------
namespace (global.demo) not exist!
Sidecar can't find `error()`, because it's inside an anonymous function.
---------------

[Local::gping ]->
```

### Verify Use namespace

Compile the agent with frida-compile, but without namespaces.

1. run `npm run cli:namespace`
2. Output:

```bash
> sidecar-ts-test@1.0.1 build:namespace
> frida-compile -t tsconfig-agent.json src/agent/mod.ts -o src/init-agent-script.js -s demo

     ____
    / _  |   Frida 15.1.17 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://frida.re/docs/home/
   . . . .
   . . . .   Connected to Local System (id=local)
Attaching...
Frida.version: 15.1.17
Script.runtime: QJS
Hello Tom!
[Local::gping ]-> Frida.version: 15.1.17
Script.runtime: QJS
Hello Tom!

---------------
namespace (global.demo) exist! type: object , global: {"sayCallback":"0x102e81010"}

Sidecar can find `demo.error()` and call it.
---------------

[Local::gping ]->
```

## Test sidecar

### Test sidecar without namespcae

Compile the agent with frida-compile, but without namespaces.

Then use sidecar to generate agent. You can run `npm run dump` to see the generated code.

1. run `npm run start:base`
2. Output:

```bash
> sidecar-ts-test@1.0.1 build:base
> frida-compile -t tsconfig-agent.json src/agent/mod.ts -o src/init-agent-script.js


> sidecar-ts-test@1.0.1 start:run
> cross-env NODE_OPTIONS="--no-warnings --loader=ts-node/esm" node src/demo/main.ts

Frida.version: 15.1.17
Script.runtime: QJS
Hello Tom!
16:54:08 ERR SidecarBody [SCRIPT_MESSAGRE_HANDLER_SYMBOL]() MessageType.Error: ReferenceError: 'sayCallback' is not defined
    at <anonymous> (/script1.js:426)
    at <eval> (/script1.js:430)
Error: ReferenceError: 'sayCallback' is not defined
    at DemoSidecar.[scriptMessageHandler] (file:///Users/binsee/CodeWork/test-sidecar/node_modules/sidecar/src/sidecar-body/sidecar-body.ts:399:21)
    at /Users/binsee/CodeWork/test-sidecar/node_modules/frida/dist/script.js:95:21
----- Agent Script Internal -----
ReferenceError: 'sayCallback' is not defined
    at <anonymous> (/script1.js:426)
    at <eval> (/script1.js:430)
```

### Test sidecar use namespcae

Compile the agent with frida-compile, use namespaces.

Then use sidecar to generate agent. You can run `npm run dump` to see the generated code.

1. run `npm run start:namespace`
2. Output:

```bash
> sidecar-ts-test@1.0.1 build:namespace
> frida-compile -t tsconfig-agent.json src/agent/mod.ts -o src/init-agent-script.js -s demo


> sidecar-ts-test@1.0.1 start:run
> cross-env NODE_OPTIONS="--no-warnings --loader=ts-node/esm" node src/demo/main.ts

Frida.version: 15.1.17
Script.runtime: QJS
Hello Tom!
get Name: Tom
output() arg: hello world
Recv Hook [sayCallback]: 1091059423 Tom say: hello world
call error() ...
error(): test error Error: test error
    at error (/script1.js:255)
    at __sidecar__error_Function_wrapper (/script1.js:357)
    at apply (native)
    at <anonymous> (frida/runtime/message-dispatcher.js:13)
    at c (frida/runtime/message-dispatcher.js:23)

---------------
namespace (global.demo) exist! type: object , global: {"sayCallback":"0x102d20010"} 

Sidecar can find `demo.error()` and call it.
---------------
```

## Known issues

The agent generated by the sidecar cannot obtain the positioning information of ts when an error occurs. The reason is that sourceMap does not take effect, and the code has been dislocated.

