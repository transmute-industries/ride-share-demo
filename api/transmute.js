const TransmuteFramework = require("transmute-framework").default;

const contractArtifacts = {
  aca: require("transmute-framework/build/contracts/RBAC"),
  esa: require("./dapp/src/contracts/RideManager"),
  esfa: require("./dapp/src/contracts/RideManagerFactory")
};

let config = {
  ipfsConfig: {
    host: "ipfs",
    port: "5001",
    options: {
      protocol: "http"
    }
  },
  providerUrl: "http://testrpc:8545",
  ...contractArtifacts,
  TRANSMUTE_API_ROOT: "http://localhost:3001"
};

const T = TransmuteFramework.init(config);

module.exports = T;
