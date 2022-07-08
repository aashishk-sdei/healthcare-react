const initialState = {
  records: [],
  assignedPermission: [],
  count: 0,
  isActive:''
}

export const permission = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_ASSIGNED_PERMISSION":
      return { ...state, assignedPermission: action.data.records };
    case "ASSIGNED__RESET_PERMISSION":
      return { ...state, assignedPermission: [] };
    case "LIST_PERMISSION":
      return { ...state, records: action.data.records, count: action.data.count };
    case "ADD_PERMISSION":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_PERMISSION": {
      if (action.data) {
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      }
      return { ...state };
    }
    default:
      return state;
  }
};
