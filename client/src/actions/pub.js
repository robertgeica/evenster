import axios from 'axios';
import { PUBS_LOADED, PUB_LOADED, ADD_PUB, DELETE_PUB, UPDATE_PUB, ERROR_LOAD } from './types';


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
  console.log('add pub', newPub);
  try {
    const pubs = await axios.post('/pub', newPub);

    dispatch({
      type: ADD_PUB,
      payload: [ pubs ]
    });
    console.log('added pub', [pubs]);
    dispatch(loadPubs());
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
    console.log(error);
  }
}

// delete a pub
export const handleDeletePub = id => async dispatch => {

  try {
    const res = await axios.delete('/pub/' + id);

    dispatch({
      type: DELETE_PUB,
      payload: [res.data]
    });
    dispatch(loadPubs());
    console.log('deleted pub', res.data);
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
}

// edit a pub
export const handleUpdatePub = (id, newPub) => async dispatch => {
  const res = await axios.get('/pub/' + id);
  const data = res.data;

  try {
    await axios.put('/pub/' + id, newPub);
    dispatch({
      type: UPDATE_PUB,
      payload: [ data ]
    });
    dispatch(loadPubs());
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    })
  }
}


// add personnel
export const handleAddPersonnel = (id, personnel) => async dispatch => {
  const res = await axios.get('/pub/' + id);
  const data = res.data;

  const newData = data;

  newData.additionalPersonnel = [...newData.additionalPersonnel, personnel];

  await axios.put('/pub/' + id, newData);

  try {
    dispatch({
      type: ADD_PUB,
      payload: [ newData ]
    });
    dispatch(loadPubs());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
}

// add services
export const handleAddService = (id, service) => async dispatch => {
  const res = await axios.get('/pub/' + id);
  const data = res.data;

  const newData = data;

  newData.additionalServices = [...newData.additionalServices, service];

  await axios.put('/pub/' + id, newData);

  try {
    dispatch({
      type: ADD_PUB,
      payload: [ newData ]
    });
    dispatch(loadPubs());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
}

// delete personnel
export const handleDeletePersonnel = (id, workerId) => async dispatch => {

  try {
    const res = await axios.get('/pub/' + id);
    const newData = res.data;
    const additionalPersonnel = newData.additionalPersonnel;

    const newArray = additionalPersonnel.filter((value, index, arr) => {
      return value._id !== workerId
    })

    newData.additionalPersonnel = newArray;
    await axios.put('/pub/' + id, newData);

    dispatch({
      type: DELETE_PUB,
      payload: [newData]
    });
    dispatch(loadPubs());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }

}

// delete service
export const handleDeleteService = (id, serviceId) => async dispatch => {

  try {
    const res = await axios.get('/pub/' + id);
    const newData = res.data;
    const additionalServices = newData.additionalServices;

    const newArray = additionalServices.filter((value, index, arr) => {
      return value._id !== serviceId
    })

    newData.additionalServices = newArray;
    await axios.put('/pub/' + id, newData);

    dispatch({
      type: DELETE_PUB,
      payload: [newData]
    });
    dispatch(loadPubs());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }

}

// edit personnel
export const handleEditPersonnel = (id, workerId, newWorker) => async dispatch => {

  try {
    const res = await axios.get('/pub/' + id);
    const newData = res.data;
    const additionalPersonnel = newData.additionalPersonnel;

    let index = additionalPersonnel.findIndex(obj => obj._id === workerId);

    additionalPersonnel[index] = newWorker;

    await axios.put('/pub/' + id, newData);

    dispatch({
      type: UPDATE_PUB,
      payload: [ newData ]
    });
    dispatch(loadPubs());
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    })
  }
}

// edit service
export const handleEditService = (id, serviceId, newService) => async dispatch => {
  console.log(newService);
  try {
    const res = await axios.get('/pub/' + id);
    const newData = res.data;
    const additionalServices = newData.additionalServices;

    let index = additionalServices.findIndex(obj => obj._id === serviceId);

    additionalServices[index] = newService;

    await axios.put('/pub/' + id, newData);

    dispatch({
      type: UPDATE_PUB,
      payload: [ newData ]
    });
    dispatch(loadPubs());
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    })
  }
}