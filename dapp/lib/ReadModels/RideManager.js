const readModel = {
  readModelStoreKey: "", // readModelType:contractAddress
  readModelType: "RideManager",
  contractAddress: "0x0000000000000000000000000000000000000000",
  lastEvent: null, // Last Event Index Processed
  model: {} // where all the updates from events will be made
};

const updatesFromMeta = meta => {
  return {
    lastEvent: meta.id
  };
};

const handlers = {
  ["RIDE_REQUESTED"]: (state, action) => {
    let { ride_guid, passenger_phone, from, to, ride_fare, ride_state } = action.payload;
    let updatesToModel = {
      model: {
        ...state.model,
        [ride_guid]: {
          ride_fare,
          passenger_phone,
          from,
          to,
          ride_state
        }
      }
    };
    let updatesToMeta = updatesFromMeta(action.meta);
    return {
      ...state,
      ...updatesToModel,
      ...updatesToMeta
    };
  },
  ["RIDE_ACCEPTED"]: (state, action) => {
    let { ride_guid, driver_phone, vehicle, ride_state } = action.payload;
    let updatesToModel = {
      model: {
        ...state.model,
        [ride_guid]: {
          ...state.model[ride_guid],
          driver_phone,
          vehicle,
          ride_state
        }
      }
    };
    let updatesToMeta = updatesFromMeta(action.meta);
    return {
      ...state,
      ...updatesToModel,
      ...updatesToMeta
    };
  },

  ["DRIVER_RATING"]: (state, action) => {
    let { ride_guid, driver_rating, ride_state } = action.payload;
    let updatesToModel = {
      model: {
        ...state.model,
        [ride_guid]: {
          ...state.model[ride_guid],
          driver_rating,
          ride_state
        }
      }
    };
    let updatesToMeta = updatesFromMeta(action.meta);
    return {
      ...state,
      ...updatesToModel,
      ...updatesToMeta
    };
  }
  
};

module.exports = {
  readModel,
  reducer: (state = readModel, action) => {
    return handlers[action.type](state, action);
  }
};
