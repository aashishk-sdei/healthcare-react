const initialState = {
    records: [],
    count: 0,
    isActive: ''
    
}

export const tag = (state = initialState, action) => {
    switch (action.type) {
        // EMAIL TAG
        case "LIST_TAG":
            return { ...state, records: action.data.records, count: action.data.count };

        default:
            return state;
    }
};
