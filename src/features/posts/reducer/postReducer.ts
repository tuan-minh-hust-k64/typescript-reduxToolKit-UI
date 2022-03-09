const postReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_POST':
        return {
          ...state,
          posts: [...state.posts, action.data],
        };
      case 'REMOVE_POST':
        const newPosts = state.posts.filter((post) => post._id !== action.data);
        return {
          ...state,
          posts: [...newPosts],
        };
      case 'SET_POST':
        return {
          ...state,
          posts: [...action.data],
        };
      case 'SET_USER_ONLINE':
        return {
          ...state,
          userOnline: action.data
        }
      case 'SET_NOTIFICATION':
        return {
          ...state,
          notifications: action.data
        };
      case 'ADD_NOTIFICATION':
        const newNotifications = [action.data, ...state.notifications];
        return {
          ...state,
          notifications: newNotifications
        }
      default:
        return {};
    }
  };
export default postReducer;  