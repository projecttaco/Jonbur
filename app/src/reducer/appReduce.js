const todos = (state = [], action) => {
    switch (action.type) {
      case ADD_TODO:
        return add(state, action);
      case REMOVE_TODO:
        return remove(state, action);
      case EDIT_TODO:
        return edit(state, action);
      case GET_ALL_TODO:
        return action.data;
      default:
        return state;
    }
  };