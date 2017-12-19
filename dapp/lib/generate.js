const csv = require("csvtojson");

const T = require("../src/transmute");

const com = require("./common");

const { writeFile } = require("./common");

const getBalance = async address => {
  return new Promise((resolve, reject) => {
    T.web3.eth.getBalance(address, (err, val) => {
      if (err) {
        reject(err);
      }
      resolve(val.toNumber());
    });
  });
};

const ensureFunded = async (fundingAddress, someAddress) => {
  let bal = await getBalance(someAddress);
  if (bal < 50000000000000000) {
    remaining = 50000000000000000 - bal;
    let receipt = await com.sendEth(T, fundingAddress, someAddress, remaining);
  } else {
    console.log(someAddress + " is funded.");
  }
};

const fundWallets = async () => {
  let rideJson = require("../data/demoData.json");
  let accounts = await T.getAccounts();
  console.log("verifying accounts have funds.");
  let fundingPromises = rideJson.map(async ride => {
    await ensureFunded(accounts[0], ride.driver_account.address);
    return await ensureFunded(accounts[0], ride.driver_account.address);
  });
  return Promise.all(fundingPromises);
};

const rideDataWithAddresses = async () => {
  const csvFilePath = "./data/subset.csv";
  let rides = [];

  const accounts = await T.getAccounts();

  const getAccountWithBalance = async () => {
    const address = accounts.pop();
    const account = {
      address
    };
    return account;
  };
  
  await new Promise((resolve, reject) => {
    csv()
      .fromFile(csvFilePath)
      .on("json", async jsonObj => {
        jsonObj.driver_account = await getAccountWithBalance();
        jsonObj.passenger_account = await getAccountWithBalance();
        rides.push(jsonObj);
      })
      .on("done", async error => {
        if (error) {
          reject(error);
        }
        await writeFile(
          "./data/demoData.json",
          JSON.stringify(rides, null, 2)
        );
        resolve(true);
      });
  });

  await fundWallets();

};

module.exports = {
  rideDataWithAddresses
};
