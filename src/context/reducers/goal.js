const initialState = {
    records: [],
    count: 0,
    isActive: '',
    icdCode: [],
}

export const goal = (state = initialState, action) => {
    switch (action.type) {
        //GOAL
        case "LIST_GOAL":
            return { ...state, records: action.data.records, count: action.data.count };
        case "GOAL_DETAIL":
            return { ...state, detail: action.data };    
        case "ADD_GOAL":
            {
                return { ...state };
            };
        case "UPDATE_GOAL": {
            if (action.data)
                state.records = state.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "UPDATE_MULTI_GOAL": {
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
