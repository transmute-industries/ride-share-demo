


var AddressSetLib = artifacts.require("../node_modules/transmute-framework/contracts/TransmuteFramework/SetLib/AddressSetLib.sol");

var EventStoreLib = artifacts.require("../node_modules/transmute-framework/contracts/TransmuteFramework/EventStoreLib.sol");
var UnsafeEventStore = artifacts.require("../node_modules/transmute-framework/contracts/TransmuteFramework/UnsafeEventStore.sol");

var RideManager = artifacts.require("./RideManager.sol");
var RideManagerFactory = artifacts.require("./RideManagerFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(AddressSetLib);

  deployer.deploy(EventStoreLib);
  deployer.link(AddressSetLib, UnsafeEventStore);
  deployer.link(EventStoreLib, UnsafeEventStore);
  deployer.deploy(UnsafeEventStore);

  deployer.link(EventStoreLib, RideManager);
  deployer.deploy(RideManager);

  deployer.link(AddressSetLib, RideManagerFactory);
  deployer.link(EventStoreLib, RideManagerFactory);
  deployer.deploy(RideManagerFactory);

};


