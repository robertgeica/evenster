import React, { useEffect, useState, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPost } from '../../actions/post';
import store from '../../store/store';
// import './blog-page.scss';

import CardMedia from '@material-ui/core/CardMedia';
import Footer from '../footer/footer'

import './SinglePost.scss'


const SinglePost = (props) => {
	useEffect(() => {
		store.dispatch(loadPost(props.match.params.id));
	}, []);

	const post = props.currentPost;
  	console.log('post is', post);


	return (
		<div key={post._id} className="post">
      <img src={`/${post.image}`} className="Image" alt={`${post.image}`} />
		{console.log(post.date)}
	  <div className="text">
	  		{post.date == undefined ? null : 
            	<span >{post.date.slice(0, 9)}</span>
            }
			<h3> {post.title}</h3>
			<p className='description'> {post.description}</p>
			<p> {post.content}</p>
	  </div>

			<Footer/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	currentPost: state.post.currentPost
});


export default connect(mapStateToProps, { loadPost })(SinglePost);