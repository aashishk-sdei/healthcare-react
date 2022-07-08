const initialState = {
  records: [],
  count: 0,
  isActive:''
}

export const icd = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_ICD":
      return { ...state, records: action.data.docs, count: action.data.totalDocs };
    case "ADD_ICD":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_ICD": {
      if (action.data)
        state.records = state.records.map(x => (x._id === action.data._id ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_ICD": {
      if (state.records.length > 1) {
        const index = state.records.findIndex(x => x._id === action.data['recordId']);
        state.records.splice(index, 1);
      } else {
        state = initialState;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_ICD": {
      if (action.data.status) {
        let updatedRecords = state.records.filter(item => action.data.recordIds.find(rid => rid === item._id));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        state.records = state.records.map(item => {
          const record = updatedRecords.find(val => val._id === item._id);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (state.records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = state.records.findIndex(item => item._id === rid);
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
