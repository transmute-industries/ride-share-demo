// var RideManagerFactory = artifacts.require(
//   "./RideManagerFactory.sol"
// );
// var RideManager = artifacts.require("./RideManager.sol");

// const chai = require("chai");
// const expect = chai.expect;
// const TransmuteFramework = require("transmute-framework").default;

// contract("works with framework", accounts => {
//   let factory;
//   let oracle;
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
//     // process.exit(0);
//   })

//   it("RideManagerFactory is deployed", async () => {
//     expect(factory.address).to.be.a("string");
//   });

//   it("RideManagerFactory can create an RideManager", async () => {
//     let { events, tx } = await T.Factory.createEventStore(factory, accounts[0]);
//     let RideManagerAddress = events[0].payload.address;
//   });

//   it("RideManagerFactory can use transmute framework to get events from the factory...", async () => {
//     let event = await T.EventStore.readFSA(factory, accounts[0], 0);
//     expect(event.meta.txOrigin).to.equal(accounts[0]);
//   });

//   it("RideManager can use transmute framework to get events from the package manager...", async () => {
//     let factoryESCreatedEvent = await T.EventStore.readFSA(
//       factory,
//       accounts[0],
//       0
//     );
//     oracle = await RideManager.at(
//       factoryESCreatedEvent.payload.address
//     );
//     let savedEvent = await T.EventStore.writeFSA(oracle, accounts[0], {
//       type: "MY_DOMAIN_EVENT_HAPPENED",
//       payload: {
//         immutable: "story bro...",
//         ipfs: "data bro..."
//       }
//     });
//     let lastEvent =
//       (await oracle.eventCount.call({
//         from: accounts[0]
//       })).toNumber() - 1;

//     let retrievedEvent = await T.EventStore.readFSA(
//       oracle,
//       accounts[0],
//       lastEvent
//     );
//     expect(retrievedEvent.payload.immutable).to.equal("story bro...");
//   });
// });
