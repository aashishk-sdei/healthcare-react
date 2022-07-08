const initialState = {
  count: 0,
  language: [],
  loading: false,
  activeTab: '1',
  isActive: '',
  param1: '',
  param2: '',
  filterParam: ''
}

export const general = (state = initialState, action) => {
  switch (action.type) {
    case "ISLOADING":
      return { ...state, loading: action.data }
    case "GET_LANGUAGE": {
      return { ...state, language: action.data }
    }
    case "SET_ACTIVE_TAB": {
      return { ...state, activeTab: action.data }
    }
    case "SET_PARAMS": {
      return { ...state, param1: action.data }
    }
    case "SET_OBJ1": {
      return { ...state, object1: action.data }
    }
    case "SET_PARAMS2": {
      return { ...state, param2: action.data }
    }
    case "SET_FILTER_PARAMS": {
      return { ...state, filterParam: action.data }
    }
    case "RESET_All": { return { ...state, param2: '', activeTab: '2' } }
    case 'LOADING':
      return { ...state, loading: action.data };
    default:
      return state;
  }
};
