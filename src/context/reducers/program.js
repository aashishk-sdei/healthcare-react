const initialState = {
  records: [],
  count: 0,
  isActive: '',
  programtype: {
    records: [],
    count: 0
  },
  condition: {
    records: [],
    count: 0
  },
  lession: {
    records: [],
    count: 0
  },
  education: {
    records: [],
    count: 0
  },
  media: {
    records: [],
    count: 0
  }
}

export const program = (state = initialState, action) => {
  switch (action.type) {
    // PROGRAM
    case "LIST_PROGRAM":
      return { ...state, records: action.data.records, count: action.data.count };
    case "ADD_PROGRAM":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records, count }
        return { ...state };
      };
    case "UPDATE_PROGRAM": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_PROGRAM": {
      if (state.records.length > 1) {
        const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.records.splice(index, 1);
      } else {
        state.records = [];
        state.count = 0;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_PROGRAM": {
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
          state.records = [];
          state.count = 0;
        }
      }
      return { ...state };
    }

    // PROGRAM TYPE
    case "LIST_PROGRAM_TYPE":
      return { ...state, programtype: { ...state.programtype, records: action.data.records, count: action.data.count } };
    case "ADD_PROGRAM_TYPE":
      {
        // let records = state.condition.records;
        // records = [...records, ...action.data];
        // const count = records.length;
        // return { ...state, programtype: { ...state.programtype, records: records, count: count } }
        return { ...state };
      };
    case "UPDATE_PROGRAM_TYPE": {
      if (action.data)
        state.programtype.records = state.programtype.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_PROGRAM_TYPE": {
      if (state.programtype.records.length > 1) {
        const index = state.programtype.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.programtype.records.splice(index, 1);
      } else {
        state.programtype = {
          records: [],
          count: 0
        };
      }
      return { ...state };
    }
    case "UPDATE_MULTI_PROGRAM_TYPE": {
      if (action.data.status) {
        let updatedRecords = state.programtype.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        state.programtype.records = state.programtype.records.map(item => {
          const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (state.programtype.records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = state.programtype.records.findIndex(item => item['@rid'] === rid);
            state.programtype.records.splice(index, 1);
          });
        } else {
          state.programtype = { records: [], count: 0 };
        }
      }
      return { ...state };
    }

    // CONDITION TYPE
    case "LIST_CONDITION":
      return { ...state, condition: { ...state.condition, records: action.data.records, count: action.data.count } };
    case "ADD_CONDITION":
      {
        // let records = state.condition.records;
        // records = [...records, ...action.data]
        // const count = records.length;
        // return { ...state, condition: { ...state.condition, records: records, count: count } }
        return { ...state };
      };
    // LESSION
    case "LIST_LESSION":
      return { ...state, lession: { ...state.lession, records: action.data.records, count: action.data.count } };
    case "ADD_LESSION":
      {
        // let records = state.condition.records;
        // records = [...records, ...action.data];
        // const count = records.length;
        // return { ...state, lession: { ...state.lession, records: records, count: count } }
        return { ...state };
      };
    case "UPDATE_LESSION": {
      if (action.data)
        state.lession.records = state.lession.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_LESSION": {
      if (state.lession.records.length > 1) {
        const index = state.lession.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.lession.records.splice(index, 1);
      } else {
        state.lession = {
          records: [],
          count: 0
        };
      }
      return { ...state };
    }
    case "UPDATE_MULTI_LESSION": {
      if (action.data.status) {
        let updatedRecords = state.lession.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        state.lession.records = state.lession.records.map(item => {
          const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (state.lession.records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = state.lession.records.findIndex(item => item['@rid'] === rid);
            state.lession.records.splice(index, 1);
          });
        } else {
          state.lession = { records: [], count: 0 };
        }
      }
      return { ...state };
    }

    // Education
    case "LIST_EDUCATION": {
      return { ...state, education: { ...state.education, records: action.data.records, count: action.data.count } };
    }
    case "UPDATE_EDUCATION": {
      if (action.data)
        state.education.records = state.education.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }

    // MEDIA
    case "LIST_MEDIA": {
      return { ...state, media: { ...state.media, records: action.data.records, count: action.data.count } };
    }
    default:
      return state;
  }
};
