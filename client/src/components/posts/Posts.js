import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';
import Modal from 'react-modal';

import PropTypes from 'prop-types';
import './post.scss';

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

  const handleOpenModal = () => { setToggleModal(true); }
  const handleCloseModal = () => { setToggleModal(false); }
  const handleOpenEdit = () => { setToggleEdit(true); }
  const handleCloseEdit = () => { setToggleEdit(false); }


	useEffect(() => {
		store.dispatch(loadPosts());
		// console.log('loading posts');
	}, []);

	return (
		<div>
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
				<input type="text" name="content" placeholder="content" />
			</form>

				<button className="button" onClick={() => 
          { 
            store.dispatch(handleAddPost(post));
            handleCloseModal();
          }
        }>
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
				<input type="text" name="image" placeholder="image" />
				<input type="text" name="title" placeholder="title" />
				<input type="text" name="description" placeholder="description" />
				<input type="text" name="content" placeholder="content" />
			</form>

				<button className="button" onClick={() => 
          { 
            store.dispatch(handleUpdatePost(updateId, post));
            handleCloseEdit();
          }
        }>
					Edit
				</button>
			</Modal>

			

			<button onClick={handleOpenModal}>Add post</button>

			{posts.map((post) => (
				<div key={post._id} className="post">
					<p>img url: {post.image}</p>
					<p>title: {post.title}</p>
					<p>description: {post.description}</p>
					<p>content: {post.content}</p>
          <p>id: {post._id} </p>
					<button onClick={() => store.dispatch(handleDeletePost(post._id))}>Delete</button>

					<button onClick={() => {
            handleOpenEdit();
            setUpdateId(post._id);
            }
          }>Edit</button>
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
