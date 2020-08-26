import React, { useEffect, useState, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPost } from '../../actions/post';
import store from '../../store/store';
// import './blog-page.scss';

import CardMedia from '@material-ui/core/CardMedia';



const SinglePost = (props) => {
	useEffect(() => {
		store.dispatch(loadPost(props.match.params.id));
	}, []);

	const post = props.currentPost;

  console.log('post is', post);

	return (
		<div key={post._id} className="post">

      <img src={`/${post.image}`} alt={`${post.image}`} />
			<p>Data: {post.date}</p>
			<p>Titlu: {post.title}</p>
			<p>Descriere: {post.description}</p>
			<p>Content: {post.content}</p>


		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	currentPost: state.post.currentPost
});


export default connect(mapStateToProps, { loadPost })(SinglePost);