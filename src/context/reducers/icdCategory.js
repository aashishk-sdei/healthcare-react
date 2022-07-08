const initialState = {
  records: [],
  recordsForSelect: [],
  details: {},
  count: 0,
  isActive: ''
}

export const icdCategory = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_ICD_CATEGORIES":
      return { ...state, records: action.data.docs, count: action.data.totalDocs };
    case "LIST_ICD_CATEGORIES_FOR_SELECT":
      return { ...state, recordsForSelect: action.data.docs, count: action.data.totalDocs };
    case "DETAILS_ICD_CATEGORIES": {
      return { ...state, details: action.data }
    }
    case "ADD_ICD_CATEGORIES":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_ICD_CATEGORIES": {
      if (action.data)
        state.records = state.records.map(x => (x._id === action.data._id ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_ICD_CATEGORIES": {
      if (state.records.length > 1) {
        let tester = [...state.records];
        const index = tester.findIndex(x => x._id === action.data['recordId'] && x.category_name === action.data.name);
        tester.splice(index, 1);
        if (action.ids.length > 0) {
          for (var i = 0; i < action.ids.length; i++) {
            const inx = tester.findIndex(x => x._id == action.ids[i]);
            tester.splice(inx, 1);
          }
        }
        state.records = tester;
      } else {
        state = initialState;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_ICD_CATEGORIES": {
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
