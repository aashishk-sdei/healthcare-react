const initialState = {
  records: [],
  count: 0,
  isActive:''
}

export const view = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_VIEW":
      return { ...state, records: action.data.records, count: action.data.count };
    case "ADD_VIEW":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_VIEW": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_VIEW": {
      if (state.records.length > 1) {
        const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.records.splice(index, 1);
      } else {
        state = initialState;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_VIEW": {
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
