const initialState = {
  records: [],
  details: {},
  count: 0,
  isActive: ''
}

export const group = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_GROUP":
      return { ...state, records: action.data ? action.data.records : [], count: action.data ? action.data.count : 0 };
    case "DETAILS_GROUP": {
      return { ...state, details: action.data }
    }
    case "ADD_GROUP":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_GROUP": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_GROUP": {
      if (state.records.length > 1) {
        const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.records.splice(index, 1);
      } else {
        state = initialState;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_GROUP": {
      if (action.data.status) {
        let updatedRecords = state.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        state.records = state.records.map(item => {
          const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (state.records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = state.records.findIndex(item => item['@rid'] === rid);
            state.records.splice(index, 1);
          });
        } else {
          state = initialState;
        }
      }
      return { ...state };
    }

    /* Group Module Reducer */

    case "ADD_GROUP_MODULE":
      {
        let detail = state.details;
        detail.modules.push(action.data);
        return { ...state, details: detail };
      };

    case "DELETE_GROUP_MODULE": {
      if (state.details.modules.length > 1) {
        const index = state.details.modules.findIndex(x => x['moduleID'] === action.data['moduleID']);
        state.details.modules.splice(index, 1);
      } else {
        state.details.modules = [];
      }
      return { ...state };
    }

    default:
      return state;
  }
};
