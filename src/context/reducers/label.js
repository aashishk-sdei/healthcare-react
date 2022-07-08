const initialState = {
    records: [],
    count: 0,
    isActive:''
  }
  
  export const label = (state = initialState, action) => {
    switch (action.type) {
      case "LIST_LABEL":
        return { ...state, records: action.data.records, count: action.data.count };
      case "ADD_LABEL":
        {
          // const records = state.records.push(action);
          // const count = records.length;
          // return { ...state, records, count }
          return { ...state };
        };
      case "UPDATE_LABEL": {
        if (action.data) {
          if (action.flag && action.data.status != 1) {
            state.records.forEach(d => {
              if (d.parent_id === action.data.id) {
                d.status = action.data.status
              }
            })
          }
          state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
          return { ...state };
        }
      }
      case "DELETE_LABEL": {
        if (state.records.length > 1) {
          const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
          const stateRecords = state.records;
          let del = state.records[index];
          stateRecords.forEach((d, indx) => {
            if (d.parent_id === del.id) {
              let dlIndx = state.records.findIndex(x => x.parent_id === del.id)
              if (dlIndx != -1)
                state.records.splice(dlIndx, 1);
            }
          })
          const indx = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
          state.records.splice(indx, 1);
        } else {
          state = initialState;
        }
        return { ...state };
      }
      case "UPDATE_MULTI_LABEL": {
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
  