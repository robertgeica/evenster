import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import Modal from 'react-modal';
import FileUpload from '../fileUpload/FileUpload';

import PropTypes from 'prop-types';
import './post.scss';

import axios from 'axios';

import { loadPosts, loadPost, handleAddPost, handleDeletePost, handleUpdatePost } from '../../actions/post';

const Posts = ({ posts, currentPost }) => {
	const [ post, setPost ] = useState({});
	const [ toggleModal, setToggleModal ] = useState(undefined);
	const [ toggleEdit, setToggleEdit ] = useState(undefined);
	const [ updateId, setUpdateId ] = useState(undefined);

	const onChange = (e) => {
		const image = e.target.parentNode.childNodes[0].value;
		const title = e.target.parentNode.childNodes[1].value;
		const description = e.target.parentNode.childNodes[2].value;
		const content = e.target.parentNode.childNodes[3].value;

		const newPost = {
			image,
			title,
			description,
			content
		};

		setPost(newPost);
	};

	const handleOpenModal = () => {
		setToggleModal(true);
	};
	const handleCloseModal = () => {
		setToggleModal(false);
	};
	const handleOpenEdit = () => {
		setToggleEdit(true);
	};
	const handleCloseEdit = () => {
		setToggleEdit(false);
	};

  const [loading, setLoading] = useState(undefined);

	const getImages = async () => {
		const res = await axios.get('/upload');
    setLoading(false);
	};

	useEffect(() => {
		store.dispatch(loadPosts());
		getImages();
		// console.log('loading posts');
	}, []);


	return (
		<div className="post-container">
			<FileUpload />

			<Modal
				isOpen={!!toggleModal}
				onRequestClose={handleCloseModal}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChange}>
					<input type="text" name="image" placeholder="image" />
					<input type="text" name="title" placeholder="title" />
					<input type="text" name="description" placeholder="description" />
					<textarea id="content" type="text" name="content" placeholder="content" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddPost(post));
						handleCloseModal();
					}}
				>
					Add
				</button>
			</Modal>

			<Modal
				isOpen={!!toggleEdit}
				onRequestClose={handleCloseEdit}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChange}>
					<input type="text" defaultValue={post.image} name="image" placeholder="image" />
					<input type="text" defaultValue={post.title} name="title" placeholder="title" />
					<input type="text" defaultValue={post.description} name="description" placeholder="description" />
					<textarea id="content" defaultValue={post.content} name="content" placeholder="content" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleUpdatePost(updateId, post));
						handleCloseEdit();
					}}
				>
					Edit post
				</button>
			</Modal>

			<button className="button" onClick={handleOpenModal}>
				Add post
			</button>

			{posts.map((post) => (
				<div key={post._id} className="post">
					{loading == false && `/${post.image}` && <img src={`/${post.image}`} alt={`${post.image}`} />}

					<h3 id="title">title: {post.title}</h3>
					<h4 id="description">description: {post.description}</h4>
					<p id="content">content: {post.content}</p>
					<p>id: {post._id} </p>
					<div className="action-buttons">
						<button className="button" onClick={() => store.dispatch(handleDeletePost(post._id))}>
							Delete
						</button>

						<button
							className="button"
							onClick={() => {
								handleOpenEdit();
								setUpdateId(post._id);
								setPost(post);
							}}
						>
							Edit
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	currentPost: state.post.currentPost
});

export default connect(mapStateToProps)(Posts);
