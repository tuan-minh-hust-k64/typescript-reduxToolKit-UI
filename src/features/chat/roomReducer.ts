const roomReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MESS':
            return [
                ...state,
                action.data
            ]
        default:
            return [];
    }
}
export default roomReducer;