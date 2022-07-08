const initialState = {
  records: [],
  count: 0,
  isActive:''
}

export const modules = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_MODULES":
      return { ...state, records: action.data.records, count: action.data.count };
    case "ADD_MODULES":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_MODULES": {
      if (action.data) {
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      }
      return { ...state };
    }
    case "LIST_BD_COLLECTIONS": 
      return { ...state, collections: action.data };
    default:
      return state;
  }
};
