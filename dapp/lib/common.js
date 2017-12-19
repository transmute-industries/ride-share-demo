const fse = require("fs-extra");
const path = require("path");

const { readModel, reducer } = require("./ReadModels/RideManager");

const getReadModel = async (T, eventStore, fromAddress) => {
  let updatedReadModel = await T.ReadModel.maybeSyncReadModel(
    eventStore,
    fromAddress,
    readModel,
    reducer
  );
  return updatedReadModel;
};

const writeFile = (targetPath, data) => {
  return new Promise((resolve, reject) => {
    fse.outputFile(targetPath, data, err => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};

const sleep = seconds => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

const sendEth = async (T, from, to, amountWei) => {
  return new Promise(async (resolve, reject) => {
    T.web3.eth.sendTransaction(
      {
        from: from,
        to: to,
        value: amountWei
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

const makeWallet = async (T) => {
  let mnemonic = await T.Toolbox.generateMnemonic(); // normally this should be a secret!
  let address = T.Toolbox.getDefaultAddressFromMnemonic(mnemonic);
  let wallet = T.Toolbox.getWalletFromMnemonic(mnemonic);
  return {
    mnemonic,
    wallet,
    address
  };
};


module.exports = {
  makeWallet,
  sendEth,
  getRideManagerReadModel: getReadModel,
  writeFile,
  sleep
};
