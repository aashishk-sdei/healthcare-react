const initialState = {
    records: [],
    count: 0,
    isActive: '',
    diagnosis: {
        records: [],
        count: 0
    }
}

export const carepath = (state = initialState, action) => {
    switch (action.type) {
        //CARE PATHWAY
        case "LIST_CARE_PATH":
            return { ...state, records: action.data.docs, count: action.data.totalDocs };
        case "LIST_DIGNOSIS_SEARCH":
            return { ...state, diagnosis: { ...state.diagnosis, records: action.data.docs, count: action.data.totalDocs } };
        case "LIST_DIGNOSIS_LOAD_MORE":
            return { ...state, diagnosis: { ...state.diagnosis, records: [...state.diagnosis.records, ...action.data.records], count: action.data.count } };
        case "ADD_CARE_PATH":
            {
                return { ...state };
            };
        case "UPDATE_CARE_PATH": {
            if (action.data)
                state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "DELETE_CARE_PATH": {
            if (state.records.length > 1) {
                const index = state.records.findIndex(x => x['@rid'] === action.data['recordId']);
                state.records.splice(index, 1);
            } else {
                state.records = [];
                state.count = 0;
            }
            return { ...state };
        }
        case "UPDATE_MULTI_CARE_PATH": {
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
