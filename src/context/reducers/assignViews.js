const initialState = {
    records: [],
    assigned:[],
    count: 0,
    isActive:''
  }
  
  export const assignViews = (state = initialState, action) => {
    switch (action.type) {
      case "ASSIGN_VIEW":
        {
          const records = state.records.push(action);
          const count = records.length;
          return { ...state, records, count }
        }
        case "ASSIGNED_VIEW":{
          return { ...state, assigned: action.data.records };
        }
        case "ASSIGNED__RESETVIEW":{
          return { ...state, assigned: [] };
        }
      default:
        return state;
    }
  };
  