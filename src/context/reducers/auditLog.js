const initialState = {
    records: [],
    exportData: [],
    count: 0,
    headers: []
}

export const auditLog = (state = initialState, action) => {
    switch (action.type) {
        //Audit Log Data
        case "LIST_AUDIT_LOGS":
            return { ...state, records: action.data.records, count: action.data.count };
        case "EXPORT_AUDIT_LOGS":
            return {...state, exportData: action.data.records, headers: action.data.headers};
        default:
            return state;
    }
};
