const initialState = {
  records: [],
  isActive: '',
  count: 0,
  groupObj: {},
  staff_members: [],
  views: [],
  users: [],
  assigned: [],
  allassigned: [],
  permission: [],
  staff_permission: [],
  tab: '1'
}

export const staff = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_STAFF":
      {
        return { ...state, records: action.data, count: action.count }
      }
    case "LIST_STAFF_MEMBER":
      {
        return { ...state, staff_members: action.data.records }
      }
    case "ADD_STAFF_MEMBER": {
      let staffMembers = state.staff_members;
      staffMembers.push(action.data);
      return { ...state, staff_members: staffMembers }
    }
    case "UPDATE_STAFF": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_STAFF": {
      console.log("action.data: ", action.data);
      state.records = state.records.map(x => (x['@rid'] === action.data['recordId'] ? { ...x, status: 0 } : x))
      return { ...state };
    }
    case "LIST_STAFF_CAT": {
      if (action.data)
        return { ...state, liststaff: action.data.records }
    }
    case "SET_TAB":
      { return { ...state, tab: action.tabvalue } }
    case "LIST_ASSIGNED_CLIENT":
      {
        return { ...state, assigned: action.assigneddata }
      }
    case "STAFF_PERMISSION_MODULE":
      {
        return { ...state, staff_permission: action.staff_permission }
      }
    case "ALL_ASSIGNED_CLIENT":
      return { ...state, allassigned: action.newdata }
    case "PERMISSION_MODULE":
      return { ...state, permission: action.permission_data }
    case "SET_GROUPID": {
      return { ...state, groupObj: action.group ? action.group : {} }
    }
    case "LIST_VIEWS":
      {
        return { ...state, views: action.data.records }

      }
    case "LIST_USER":
      {
        return { ...state, users: action.data.records }

      }
    default:
      return state;
  }
};