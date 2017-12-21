const vorpal = require("vorpal")();
const path = require("path");
const fse = require("fs-extra");
const fs = require("fs");

const T = require("./src/transmute");
const demoUtils = require("./lib");

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fse.outputFile(path, data, err => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};

vorpal
  .command("version", "display version information")
  .action((args, callback) => {
    console.log("Transmute PM: " + require("../package.json").version);
    callback();
  });

vorpal
  .command(
    "create",
    "create a ride manager contract from the deployed factory."
  )
  .action(async (args, callback) => {
    if (!fs.existsSync("./src/RideManager.ReadModel.json")) {
      let accounts = await T.getAccounts();
      let factory = await T.EventStoreFactoryContract.deployed();
      let { events, tx } = await T.Factory.createEventStore(
        factory,
        accounts[0]
      );
      let rideShareManager = await T.EventStoreContract.at(
        events[0].payload.address
      );
      let readModel = await demoUtils.com.getRideManagerReadModel(
        T,
        rideShareManager,
        accounts[0]
      );
      await writeFile(
        path.join(process.cwd(), "./src/RideManager.ReadModel.json"),
        JSON.stringify(readModel, null, 2)
      );
      console.log("created ./src/RideManager.ReadModel.json");
    } else {
      console.warn(
        "./src/RideManager.ReadModel.json already exists! Delete it, if you wish to create a new contract."
      );
    }
    callback();
  });

vorpal
  .command("simulate", "generate and simulate some ride data")
  .action(async (args, callback) => {
    console.log("\n");
    await demoUtils.rideDataWithAddresses();
    await demoUtils.simulateRides();
    console.log(
      "complete. see ./data/demoReadModel.json for a consolidated history of smart contract activity."
    );
    callback();
  });

vorpal
  .parse(process.argv)
  .delimiter("🦄   $")
  .show();
