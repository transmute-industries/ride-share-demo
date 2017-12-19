const csv = require("csvtojson");

let T = require("../src/transmute");

const com = require("./common");

const requestRide = async (store, rideData) => {
  return new Promise(async (resolve, reject) => {
    let savedEvent = await T.EventStore.writeFSA(
      store,
      rideData.passenger_account.address,
      {
        type: "RIDE_REQUESTED",
        payload: {
          ride_guid: rideData.id,
          from: rideData.from,
          to: rideData.to,
          ride_fare: rideData.ride_fare,
          passenger_phone: rideData.passenger_phone,
          ride_state: "PENDING"
        }
      }
    );
    resolve(true);
  });
};

const acceptRide = async (store, rideData) => {
  return new Promise(async (resolve, reject) => {
    let savedEvent = await T.EventStore.writeFSA(
      store,
      rideData.driver_account.address,
      {
        type: "RIDE_ACCEPTED",
        payload: {
          ride_guid: rideData.id,
          driver_phone: rideData.driver_phone,
          vehicle: {
            make: rideData.make,
            model: rideData.model,
            year: rideData.year
          },
          ride_state: "IN_PROGRESS"
        }
      }
    );
    resolve(true);
  });
};

const getRandomArbitrary = (min, max) => {
  return parseInt(Math.random() * (max - min) + min);
};

const rateDriver = async (store, rideData) => {
  return new Promise(async (resolve, reject) => {
    let savedEvent = await T.EventStore.writeFSA(
      store,
      rideData.passenger_account.address,
      {
        type: "DRIVER_RATING",
        payload: {
          ride_guid: rideData.id,
          driver_rating: getRandomArbitrary(1, 5),
          ride_state: "COMPLETE"
        }
      }
    );
    resolve(true);
  });
};

const simulateRides = async () => {
  let rideManagerReadModel = require("../src/RideManager.ReadModel.json");
  let rideJson = require("../data/demoData.json");
  let rideManagerContract = await T.EventStoreContract.at(
    rideManagerReadModel.contractAddress
  );
  let accounts = await T.getAccounts();
  console.log("simulating...");
  await com.sleep(10);

  let promises = rideJson.map(async rideData => {
    
    await requestRide(rideManagerContract, rideData);
    await com.sleep(5);

    // make data messy so all states are visible in demoData...
    if (rideJson.indexOf(rideData) > 0) {
      await acceptRide(rideManagerContract, rideData);
      await com.sleep(5);
    }
    
    if (rideJson.indexOf(rideData) > 1) {
      await rateDriver(rideManagerContract, rideData);
    }

    return true;
  });
  await Promise.all(promises);

  await com.sleep(10);

  let updatedRideManagerReadModel = await com.getRideManagerReadModel(
    T,
    rideManagerContract,
    accounts[0]
  );
  await com.writeFile(
    "./data/demoReadModel.json",
    JSON.stringify(updatedRideManagerReadModel, null, 2)
  );
};

module.exports = {
  simulateRides
};
