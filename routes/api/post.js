const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /post
// @description     Test route
router.get('/', async (req, res) => {
	try {
		const query = { userId: req.body.id };
		const post = await Post.find(query);

		console.log(req.body);

		res.send(post);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /post/:id
// @description     Test route
router.get('/:id', async (req, res) => {
	try {
		let id = await req.params.id;
		const post = await Post.findById(id);

		
		res.json(post);
	} catch (error) {
		res.status(400).send('Error getting the post.');
	}
});


// @route           POST /post
// @description     Add Post
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let post = await new Post(req.body);
		post.userId = req.user.id;
		post.save();

		res.status(200).json({ post: ' added new post! ' });
	} catch (error) {
		res.status(400).send('Adding new post failed.');
	}
});

// @route           DELETE /post/:id
// @description     Delete Post
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const post = await Post.findOne({ _id: id, userId });


		const posts = await Post.findByIdAndRemove({ _id: id });
		res.send(post);
	} catch (error) {
		res.status(400).send('error deleting post');
	}
});

// @route           PUT /post/:id
// @description     Update post
router.put('/:id', auth, async (req, res) => {
	// console.log(req.body);

	try {
		let post = await Post.findById(req.params.id);

		if (post.userId !== req.user.id) {
			console.log('not allowed to delete post');
		}

		if (!post) res.status(404).send('no post available for update');
		console.log('asd');

		post.image = req.body.image;
		post.title = req.body.title;
		post.description = req.body.description;
		post.content = req.body.content;

		await post.save();
		res.json('post updated successfully');
	} catch (error) {
		res.status(400).send('error editing post');
	}
});



module.exports = router;