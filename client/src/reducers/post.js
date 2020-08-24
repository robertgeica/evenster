import { POSTS_LOADED, POST_LOADED, ERROR_LOAD, ADD_POST, DELETE_POST, UPDATE_POST } from '../actions/types';

const initialState = {
  posts: [],
  currentPost: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED:
    case ADD_POST:
    case DELETE_POST:
    case UPDATE_POST:
      return {...state, posts: payload};
    
    case POST_LOADED:
    return {...state, currentPost: payload};

    case ERROR_LOAD: {
      return state;
    }
  
    default:
      return state;
  }
}