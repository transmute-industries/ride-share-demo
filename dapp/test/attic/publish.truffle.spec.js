// var RideManagerFactory = artifacts.require("./RideManagerFactory.sol");
// var RideManager = artifacts.require("./RideManager.sol");

// const chai = require("chai");
// const expect = chai.expect;
// const TransmuteFramework = require("transmute-framework").default;

// const demoUtils = require("../lib");

// const { lstatSync, readdirSync } = require("fs");
// const { join } = require("path");

// const isDirectory = source => lstatSync(source).isDirectory();
// const getDirectories = source =>
//   readdirSync(source)
//     .map(name => join(source, name))
//     .filter(isDirectory);

// contract("works with framework", accounts => {
//   let T;
//   let factory;
//   let rideShareManager;

//   before(async () => {
//     T = TransmuteFramework.init({
//       providerUrl: "http://localhost:8545",
//       ipfsConfig: {
//         host: "localhost",
//         port: "5001",
//         options: {
//           protocol: "http"
//         }
//       },
//       TRANSMUTE_API_ROOT: "http://localhost:3001"
//     });

//     factory = await RideManagerFactory.deployed();
//   });

//   after(async () => {
//     // sometimes truffle test hangs... likely due to rpc activity...
//     process.exit(0);
//   })

//   it("factory can create an package manager", async () => {
//     let { events, tx } = await T.Factory.createEventStore(factory, accounts[0]);
//     rideShareManager = await RideManager.at(events[0].payload.address);
//   });

//   it("package manager can publish all packages in a directory", async () => {
//     return Promise.all(
//       getDirectories("./packages").map(async packageDir => {
//         let fsaEvent = await demoUtils.publish(
//           T,
//           rideShareManager,
//           accounts[0],
//           packageDir
//         );
//         expect(fsaEvent.type).to.equal("PACKAGE_PUBLISHED");
//         return fsaEvent;
//       })
//     );
//   });

//   it("library can list all published packages", async () => {
//     await demoUtils.list(T, rideShareManager, accounts[0]);
//   });
// });
