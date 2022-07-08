const initialState = {
  records: [],
  count: 0,
  isActive: '',
  question: {
    records: [],
    count: 0
  },
  categoryquestion: {
    records: [],
    count: 0
  },
  questioncategory: {
    records: [],
    recordsForSelect: [],
    count: 0
  },
  types: {
    records: [],
    count: 0
  },
  assignedQuestionnaire: {
    records: [],
    count: 0
  }
}

export const questionnaire = (state = initialState, action) => {
  switch (action.type) {
    // QUESTION
    case "LIST_QUESTION":
      return { ...state, question: { ...state.question, records: action.data.records, count: action.data.count } };
    case "ADD_QUESTION":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, question: { ...state.question, records: records, count: count } }
        return { ...state };
      };
    case "UPDATE_QUESTION": {
      return { ...state, question: { ...state.question, records: state.question.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x)) } };
    }
    case "DELETE_QUESTION": {
      let records = state.question.records;
      if (records.length > 1) {
        const index = records.findIndex(x => x['@rid'] === action.data['recordId']);
        records.splice(index, 1);
      } else {
        state.question = [{ records: [], count: 0 }];
      }
      return { ...state, question: { ...state.question, records: records } };
    }
    case "UPDATE_MULTI_QUESTION": {
      let records = state.question.records;
      if (action.data.status) {
        let updatedRecords = records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        records = records.map(item => {
          const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = records.findIndex(item => item['@rid'] === rid);
            records.splice(index, 1);
          });
        } else {
          state.question = { records: [], count: 0 };
        }
      }
      return { ...state, question: { ...state.question, records: records } };
    }

    // QUESTION CATEGORY
    case "LIST_CATEGORY_QUESTION":
      return { ...state, categoryquestion: { ...state.categoryquestion, records: action.data.records, count: action.data.count } };
    case "LIST_QUESTION_CATEGORY":
      return { ...state, questioncategory: { ...state.questioncategory, records: action.data.records, count: action.data.count } };
    case "LIST_QUESTION_CATEGORY_FOR_SELECT":
      return { ...state, questioncategory: { ...state.questioncategory, recordsForSelect: action.data.records, count: action.data.count } };
    case "ADD_QUESTION_CATEGORY":
      {
        return { ...state };
      };
    case "UPDATE_QUESTION_CATEGORY": {
      if (action.data)
        state.questioncategory.records = state.questioncategory.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_QUESTION_CATEGORY": {
      if (state.questioncategory.records.length > 1) {
        const index = state.questioncategory.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.questioncategory.records.splice(index, 1);
      } else {
        state.questioncategory = {
          records: [],
          count: 0
        };
      }
      return { ...state };
    }
    case "UPDATE_MULTI_QUESTION_CATEGORY": {
      if (action.data.status) {
        let updatedRecords = state.questioncategory.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
        updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
        state.questioncategory.records = state.questioncategory.records.map(item => {
          const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
          return record ? { ...item, ...record } : item;
        })
      } else {
        if (state.questioncategory.records.length > 1) {
          action.data.recordIds.map(rid => {
            const index = state.questioncategory.records.findIndex(item => item['@rid'] === rid);
            state.questioncategory.records.splice(index, 1);
          });
        } else {
          state.questioncategory = { records: [], count: 0 };
        }
      }
      return { ...state };
    }

    // QUESTIONNAIRE
    case "LIST_QUESTIONNAIRE":
      return { ...state, records: action.data.records, count: action.data.count };
    case "ADD_QUESTIONNAIRE":
      {
        // const records = state.records.push(action);
        // const count = records.length;
        // return { ...state, records: records, count: count }
        return { ...state };
      };
    case "UPDATE_QUESTIONNAIRE": {
      if (action.data)
        state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
      return { ...state };
    }
    case "DELETE_QUESTIONNAIRE": {
      if (state.records.length > 1) {
        const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
        state.records.splice(index, 1);
      } else {
        state = initialState;
      }
      return { ...state };
    }
    case "UPDATE_MULTI_QUESTIONNAIRE": {
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
    // Questionnaire TYpe
    case "LIST_QUESTIONNAIRE_TYPES": {
      return { ...state, types: { ...state.types, records: action.data.records ? action.data.records : [] } }
    }

    // Assigned Questionnaire for lession
    case "LIST_ASSIGNED_QUESTIONNAIRE": {
      return { ...state, assignedQuestionnaire: { ...state.assignedQuestionnaire, records: action.data, count: action.data.length } };
    }

    default:
      return state;
  }
};
