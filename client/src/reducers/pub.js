import { PUBS_LOADED, PUB_LOADED, ADD_PUB, DELETE_PUB, UPDATE_PUB, ERROR_LOAD } from '../actions/types';

const initialState = {
  pubs: [],
  currentPub: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case PUBS_LOADED:
    case ADD_PUB:
    case DELETE_PUB:
    case UPDATE_PUB:
      return {...state, pubs: payload};
    
    case PUB_LOADED:
      return {...state, currentPub: payload};
    case ERROR_LOAD:
      return state;

    default:
      return state;
  }
}