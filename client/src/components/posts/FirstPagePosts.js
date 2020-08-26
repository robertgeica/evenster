import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/store';
import PropTypes from 'prop-types';
import PostCard from './PostCard';

import { loadPosts } from '../../actions/post';

import './fp-posts.scss';

const FirstPagePosts = ({ posts }) => {
	const [ loading, setLoading ] = useState(undefined);

	const getImages = async () => {
		const res = await axios.get('/upload');
		setLoading(false);
	};

	useEffect(() => {
		store.dispatch(loadPosts());
		getImages();
		// console.log('loading posts');
	}, []);
	// <h2>Check last posts</h2>

	return (
		<div className="fp-posts-container">
    <h2>Current Posts </h2>
		<div className="posts">
			{posts.map((post) => (
				<PostCard
						key={post._id}
            image={post.image}
            title={post.title}
            description={post.description}
            post_id={post._id}
          />
			))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	currentPost: state.post.currentPost
});

export default connect(mapStateToProps)(FirstPagePosts);
