import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';

import PropTypes from 'prop-types';

import { loadPosts, loadPost, handleAddPost, handleDeletePost, handleUpdatePost, } from '../../actions/post';

const Posts = ({ posts, currentPost}) => {
  console.log(posts);

  useEffect(() => {
    store.dispatch(loadPosts());
    console.log('loading posts');
  }, []);

  return (
    <div>
      
    </div>
  );
};


const mapStateToProps = state => ({
  posts: state.post.posts,
  currentPost: state.post.currentPost
});


export default Posts;