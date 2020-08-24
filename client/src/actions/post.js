import axios from 'axios';
import { POSTS_LOADED, POST_LOADED, ERROR_LOAD, ADD_POST, DELETE_POST, UPDATE_POST } from './types';

// load all posts
export const loadPosts = () => async dispatch => {

  try {
    const res = await axios.get('/post');

    dispatch({
      type: POSTS_LOADED,
      payload: res.data
    });
    console.log('posts loaded', res.data);
  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
    console.log('error loading all posts');
  }
};

// load a single post - id
export const loadPost = (id) => async dispatch => {

  try {
    const res = await axios.get('/post/' + id);

    dispatch({
      type: POST_LOADED,
      payload: res.data
    });
    console.log('single pot loaded', res.data);
    
  } catch (error) {
    dispatch({
      type: POST_LOADED
    });
    console.log('error loading a single post');
  }
};


// add a new post
export const handleAddPost = (newPost) => async dispatch => {
  try {
    const posts = await axios.post('/post', newPost);
    console.log(newPost);
    dispatch({
      type: ADD_POST,
      payload: [ posts ]
    });
    console.log('added new post', [posts]);
    dispatch(loadPosts());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
    console.log(error);
  }
};

// delete a post - id
export const handleDeletePost = id => async dispatch => {
  try {
    const res = await axios.delete('/post/' + id);
    console.log(res);
    
    dispatch({
      type: DELETE_POST,
      payload: [res.data]
    });
    dispatch(loadPosts());

    console.log('deleted post', res.data);

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    });
  }
};

// edit a post - id
export const handleUpdatePost = (id, newPost) => async dispatch => {
  const res = await axios.get('/post/' + id);
  const data = res.data;

  try {
    await axios.put('/post/' + id, newPost);

    dispatch({
      type: UPDATE_POST,
      payload: [ data ]
    });
    dispatch(loadPosts());

  } catch (error) {
    dispatch({
      type: ERROR_LOAD
    })
  }
}