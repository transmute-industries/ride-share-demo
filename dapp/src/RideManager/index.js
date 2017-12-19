import React, { Component } from "react";

import T from "../transmute";

import { getReadModel } from "./Helpers";

let CONTRACT_ADDRESS = require("../RideManager.ReadModel.json").contractAddress;

class RideManager extends Component {
  state = {
    contractAddress: CONTRACT_ADDRESS,
    readModel: {},
    rideManagerReadModel: JSON.stringify({}, null, 2),
    allEvents: JSON.stringify([], null, 2),
  };

  onContractAddressChange = event => {
    this.setState({
      contractAddress: event.target.value
    });
  };

  loadPackageData = async () => {
    let eventStore = await T.EventStoreContract.at(this.state.contractAddress);
    let rideManagerReadModel = await getReadModel(
      T,
      eventStore,
      this.props.currentAddress
    );
   
    let allEvents = await T.EventStore.readFSAs(eventStore, this.props.currentAddress, 0)
   
    this.setState({
      rideManagerReadModel: JSON.stringify(rideManagerReadModel, null, 2),
      allEvents: JSON.stringify(allEvents, null, 2),
    });

  };

  async componentWillMount() {
    await this.loadPackageData();
  }

  render() {
    return (
      <div className="RideManager">
        <h2>Ride Manager Contact ReadModel</h2>
        <input
          name="contractAddress"
          value={this.state.contractAddress}
          onChange={this.onContractAddressChange}
        />
        <pre>{this.state.rideManagerReadModel}</pre>

        <h2>All Events</h2>

        <pre>{this.state.allEvents}</pre>
      </div>
    );
  }
}

export default RideManager;
