const commentReducer = (state, action) => {
    switch (action.type) {
      case 'SET_COMMENT':
        return [...action.data];
      case 'ADD_COMMENT':
        return [...state, action.data];
      case 'REMOVE_COMMENT':
        const newComments = state.filter((item) => item._id !== action.data);
        return newComments;
      default:
        return [];
    }
  };
  export default commentReducer;