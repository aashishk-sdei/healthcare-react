const initialState = {
  records: [],
  csvrecord: [],
  count: 0,
  clientrecords: [],
  isActive: '',
  isMenuActive: false,
  menuTitle: '',
  isSubMenuActive: false,
  subMenuTitle: ''
}

export const client = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_CLIENT":
      {
        return { ...state, records: action.data.records, count: action.data.count }
      }
    case "SET_ACTIVE_NAN": {
      return { ...state, isActive: action.data }
    }
    case "SET_ACTIVE_MAIN_MENU": {
      return { ...state, isMenuActive: action.data }
    }
    case "SET_ACTIVE_MENU_TITLE": {
      return { ...state, menuTitle: action.data }
    }
    case "SET_ACTIVE_SUB_MENU": {
      return { ...state, isSubMenuActive: action.data }
    }
    case "SET_ACTIVE_SUB_MENU_TITLE": {
      return { ...state, subMenuTitle: action.data }
    }
    case "LIST_ALL_CLIENT": {
      return { ...state, csvrecord: action.data }
    }
    case "LIST_STAFF_CLIENT":
      {
        return { ...state, clientrecords: action.clientdata.records }
      }
    case "UPDATE_MULTI_CLIENT": {
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