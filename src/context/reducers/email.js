const initialState = {
    records: [],
    count: 0,
    isActive: '',
    emailtype: {
        records: [],
        count: 0
    },
    emailtemplate: {
        records: [],
        count: 0
    }
    
}

export const emails = (state = initialState, action) => {
    switch (action.type) {
        // EMAIL TYPE
        case "LIST_EMAIL_TYPE":
            return { ...state, emailtype: { records: action.data.records, count: action.data.count } };
        case "ADD_EMAIL_TYPE":
            {
                return { ...state };
            };
        case "UPDATE_EMAIL_TYPE": {
            if (action.data)
                state.emailtype.records = state.emailtype.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "DELETE_EMAIL_TYPE": {
            if (state.emailtype.records.length > 1) {
                const index = state.emailtype.records.findIndex(x => x['@rid'] === action.data['recordId']);
                state.emailtype.records.splice(index, 1);
            } else {
                state.emailtype.records = [];
                state.emailtype.count = 0;
            }
            return { ...state };
        }
        case "UPDATE_MULTI_EMAIL_TYPE": {
            if (action.data.status) {
                let updatedRecords = state.emailtype.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
                updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
                state.emailtype.records = state.emailtype.records.map(item => {
                    const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
                    return record ? { ...item, ...record } : item;
                })
            } else {
                if (state.records.length > 1) {
                    action.data.recordIds.map(rid => {
                        const index = state.emailtype.records.findIndex(item => item['@rid'] === rid);
                        state.emailtype.records.splice(index, 1);
                    });
                } else {
                    state.emailtype.records = [];
                    state.emailtype.count = 0;
                }
            }
            return { ...state };
        }
        //MANAGE  EMAIL TEMPLATE
        case "LIST_EMAIL_TEMPLATE":
            return { ...state, emailtemplate: { records: action.data.records, count: action.data.count } };
        case "ADD_EMAIL_TYPE":
            {
                return { ...state };
            };
        case "UPDATE_EMAIL_TEMPLATE": {
            if (action.data)
                state.emailtemplate.records = state.emailtemplate.records.map(x => (x['@rid'] === action.data['@rid'] ? { ...action.data } : x))
            return { ...state };
        }
        case "DELETE_EMAIL_TEMPLATE": {
            if (state.emailtemplate.records.length > 1) {
                const index = state.emailtemplate.records.findIndex(x => x['@rid'] === action.data['recordId']);
                state.emailtemplate.records.splice(index, 1);
            } else {
                state.emailtemplate.records = [];
                state.emailtemplate.count = 0;
            }
            return { ...state };
        }
        case "UPDATE_MULTI_EMAIL_TEMPLATE": {
            if (action.data.status) {
                let updatedRecords = state.emailtemplate.records.filter(item => action.data.recordIds.find(rid => rid === item['@rid']));
                updatedRecords = updatedRecords.map(item => ({ ...item, status: action.data.status }));
                state.emailtemplate.records = state.emailtemplate.records.map(item => {
                    const record = updatedRecords.find(val => val['@rid'] === item['@rid']);
                    return record ? { ...item, ...record } : item;
                })
            } else {
                if (state.records.length > 1) {
                    action.data.recordIds.map(rid => {
                        const index = state.emailtemplate.records.findIndex(item => item['@rid'] === rid);
                        state.emailtemplate.records.splice(index, 1);
                    });
                } else {
                    state.emailtemplate.records = [];
                    state.emailtemplate.count = 0;
                }
            }
            return { ...state };
        }

        default:
            return state;
    }
};
