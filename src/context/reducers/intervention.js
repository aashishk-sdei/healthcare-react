const initialState = {
    records: [],
    interventionCategory:[],
    count: 0,
    isActive: '',
    icdCode: [],
}

export const intervention = (state = initialState, action) => {
    switch (action.type) {
        //INTERVENTION
        case "LIST_INTERVENTION":
            return { ...state, records: action.data.records, count: action.data.count };
        case "LIST_INTERVENTION_CATEGORY":
            return { ...state, interventionCategory: action.data.records, count: action.data.count };
        case "INTERVENTION_DETAIL":
            return { ...state, detail: action.data };
        case "ADD_INTERVENTION":
            {
                return { ...state };
            };
        case "UPDATE_INTERVENTION": {
            if (action.data)
                state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "UPDATE_MULTI_INTERVENTION": {
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
