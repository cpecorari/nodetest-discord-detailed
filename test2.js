const fileTest2 = `
  Unit Tests
    Database tests
      Lib Snapshots
        Holdings functional testing
          onchain holdings
            wallet
              ✔ has gas and wrapped ttkns
              ✔ fetches gas and wrapped ttkns (6131ms)
              ✔ fetches stab ttkns (1902ms)
              ✔ fetches base ttkns (520ms)
            dex
              1) fetches dex position values
        computation testing
          2) "before all" hook for "computes correct values"


  4 passing (22s)
  3 pending
  2 failing

  1) Unit Tests
       Database tests
         Holdings Snapshots
           Holdings functional testing
             onchain holdings
               dex
                 fetches dex position values:
     AuthenticationError: c {"code":-1022,"msg":"Signature for this request is not valid."}
      at c.throwExactlyMatchedException (node_modules/libext/dist/cjs/src/base/cces.js:3287:19)
      at c.handleErrors (node_modules/libext/dist/cjs/src/c.js:8670:18)
      at /home/c/actions-runner/_work/ac/ac/node_modules/libext/dist/cjs/src/base/cces.js:789:51
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async c.fetch2 (node_modules/libext/dist/cjs/src/base/cces.js:2866:16)
      at async c.request (node_modules/libext/dist/cjs/src/c.js:8712:26)
      at async c.loadLeverageBrackets (node_modules/libext/dist/cjs/src/c.js:7490:30)
      at async c.fetchPositionsRisk (node_modules/libext/dist/cjs/src/c.js:7854:9)
      at async c.fetchPositions (node_modules/libext/dist/cjs/src/c.js:7787:20)
      at async Object.a (src/ccess/fftes.ts:374:33)

  2) Unit Tests
       Database tests
         Holdings Snapshots
           computation testing
             "before all" hook for "computes correct values":
     AuthenticationError: c {"code":-1022,"msg":"Signature for this request is not valid."}
      at c.throwExactlyMatchedException (node_modules/libext/dist/cjs/src/base/cces.js:3287:19)
      at c.handleErrors (node_modules/libext/dist/cjs/src/c.js:8670:18)
      at /home/c/actions-runner/_work/ac/ac/node_modules/libext/dist/cjs/src/base/cces.js:789:51
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async c.fetch2 (node_modules/libext/dist/cjs/src/base/cces.js:2866:16)
      at async c.request (node_modules/libext/dist/cjs/src/c.js:8712:26)
      at async c.loadLeverageBrackets (node_modules/libext/dist/cjs/src/c.js:7490:30)
      at async c.fetchPositionsRisk (node_modules/libext/dist/cjs/src/c.js:7854:9)
      at async c.fetchPositions (node_modules/libext/dist/cjs/src/c.js:7787:20)
      at async Object.a (src/ccess/fftes.ts:374:33)`;

module.exports.fileTest2 = fileTest2;
