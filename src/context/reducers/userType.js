const initialState = { records: [], assignedPermission: [],isActive:'',assigned: [], count: 0 }
export const userType = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_USER_TYPE":
      return { ...state, records: action.data.records, count: action.data.count }
    case "ADD_USER_TYPE":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_USER_TYPE": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_USER_TYPE": {
      const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
      state.records.splice(index, 1);
      return { ...state };
    }
    case "UPDATE_MULTI_USER_TYPE": {
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
    default:
      return state;
  }
};
