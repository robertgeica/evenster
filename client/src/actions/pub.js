import axios from 'axios';
import { PUBS_LOADED, PUB_LOADED, ADD_PUB, DELETE_PUB, ERROR_LOAD } from './types';


// load all pubs
export const loadPubs = () => async dispatch => {

  try {
    const res = await axios.get('/pub');
    dispatch({
      type: PUBS_LOADED,
      payload: res.data
    });
    console.log('pubs loaded', res.data);
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
};

// load a pub by id
export const loadPub = (id) => async dispatch => {

  try {
    const res = await axios.get('/pub/' + id);

    dispatch({
      type: PUB_LOADED,
      payload: res.data
    });
    console.log('pubs loaded', res.data);
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
};

// add a pub
export const handleAddPub = (newPub) => async dispatch => {

  try {
    const pubs = await axios.post('/pub', newPub);

    dispatch({
      type: ADD_PUB,
      type: [ pubs ]
    });
    dispatch(loadPubs());
    console.log('added pub', [pubs]);
  } catch (error) {
    
  }
}

// delete a pub
export const handleDeletePub = id => async dispatch => {

  try {
    const res = await axios.delete('/post/' + id);

    dispatch({
      type: DELETE_PUB,
      payload: [res.data]
    });
    dispatch(loadPubs());
    dispatch(loadPubs());
    console.log('deleted pub', res.data);
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    })
  }
}