const initialState = {
    records: [],
    count: 0,
    detail:{},
    isActive: '',
    icdCode: [],
}

export const diagnosis = (state = initialState, action) => {
    switch (action.type) {
        //DIAGNOSIS
        case "LIST_DIAGNOSIS":
            return { ...state, records: action.data.docs, count: action.data.totalDocs };
        case "LIST_DIAGNOSIS_LOAD_MORE":
            return { ...state, records: [...state.records, ...action.data.docs], count: action.data.totalDocs };
        case "DIAGNOSIS_DETAIL":
            return { ...state, detail: action.data.records };
        case "LIST_ICD_CODE":
            return { ...state, icdCode: action.data.docs };
        case "ADD_DIAGNOSIS":
            {
                return { ...state };
            };
        case "UPDATE_DIAGNOSIS": {
            if (action.data)
                state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "DELETE_DIAGNOSIS": {
            if (state.records.length > 1) {
                const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
                state.records.splice(index, 1);
            } else {
                state.records = [];
                state.count = 0;
            }
            return { ...state };
        }
        case "UPDATE_MULTI_DIAGNOSIS": {
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

        default:
            return state;
    }
};
