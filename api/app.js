const express = require("express");

const app = express();
require("express-async-await")(app);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { Client } = require("pg");
const client = new Client();

const com = require("./dapp/lib/common");

app.get("/", (req, res) => {
  res.json({
    reset: "http://localhost:3001/reset",
    list: "http://localhost:3001/read_models"
  });
});

app.get("/demo", async (req, res) => {
  const T = require("./transmute");
  const rideManagerReadModel = require("./dapp/src/RideManager.ReadModel.json");

  const accounts = await T.getAccounts();

  const eventStore = await T.EventStoreContract.at(
    rideManagerReadModel.contractAddress
  );
  const readModel = await com.getRideManagerReadModel(
    T,
    eventStore,
    accounts[0]
  );

  const allEvents = await T.EventStore.readFSAs(eventStore, accounts[0], 0);

  res.json({
    accounts,
    readModel,
    allEvents
  });
});

app.get("/reset", async (req, res, next) => {
  await client.query(`
  DROP TABLE read_models;
`);

  await client.query(`
  CREATE TABLE read_models(
    ADDRESS CHAR(42) PRIMARY KEY NOT NULL,
    TYPE TEXT NOT NULL,
    DATA JSONB NOT NULL
 );`);
  res.json(true);
});

app.get("/read_models", async (req, res, next) => {
  let { rows } = await client.query("SELECT * FROM read_models");
  res.json(
    rows.map(r => {
      return r.data;
    })
  );
});

app.post("/read_models/:address", async (req, res, next) => {
  if (req.params.address !== req.body.contractAddress) {
    throw Error("expected address to match body");
  }
  // TOTALLY NOT SAFE SQL INJECTION....
  let m = req.body;
  let modelAsString = JSON.stringify(m);
  await client.query(`
  INSERT INTO read_models (ADDRESS,TYPE,DATA)
  VALUES ('${m.contractAddress}', '${m.readModelType}', '${modelAsString}')
  ON CONFLICT (ADDRESS) DO UPDATE
  SET DATA = '${modelAsString}';
  `);
  res.json(m);
});

app.get("/read_models/:address", async (req, res, next) => {
  let { rows } = await client.query(`
  SELECT * FROM read_models
  WHERE ADDRESS = '${req.params.address}'
  `);
  res.json(rows[0].data);
});

app.listen(3001, async () => {
  await client.connect();
  console.log("Example app listening on port 3001!");
});
