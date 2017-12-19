const TransmuteFramework = require("transmute-framework").default;

const contractArtifacts = {
  aca: require("transmute-framework/build/contracts/RBAC"),
  esa: require("./contracts/RideManager"),
  esfa: require("./contracts/RideManagerFactory")
};

let config = {
  providerUrl: "http://localhost:8545",
  ipfsConfig: {
    host: "localhost",
    port: "5001",
    options: {
      protocol: "http"
    }
  },
  ...contractArtifacts,
  TRANSMUTE_API_ROOT: "http://localhost:3001"
};

const isBrowserEnv = !(
  typeof process === "object" && process + "" === "[object process]"
);

if (!isBrowserEnv && process.env.RPC_HOST ) {
  config = {
    ...config,
    ipfsConfig: {
      host: "ipfs",
      port: "5001",
      options: {
        protocol: "http"
      }
    },
    providerUrl: "http://testrpc:8545"
  };
}

const T = TransmuteFramework.init(config);

module.exports = T;
