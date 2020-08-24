const express = require('express');
const router = express.Router();
const Pub = require('../../models/Pub');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /pub
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const pub = await Pub.find(query);

		// console.log(req.body);

		res.send(pub);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /pub/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const pub = await Pub.findById(id);

		if (pub.userId !== req.user.id) {
			console.log('not allowed to see this pub');
		}

		res.json(pub);
	} catch (error) {
		res.status(400).send('Error getting the pub.');
	}
});

// @route           POST /pub
// @description     Add Pub
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let pub = await new Pub(req.body);
		pub.userId = req.user.id;
		pub.save();

		res.status(200).json({ pub: ' added new pub! ' });
	} catch (error) {
		res.status(400).send('Adding new pub failed.');
	}
});

// @route           DELETE /pub/:id
// @description     Delete pub
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const pub = await Pub.findOne({ _id: id, userId });

		if (pub.userId !== userId) {
			console.log('not allowed to delete pub');
		}

		const pubs = await Pub.findByIdAndRemove({ _id: id });
		res.send(pub);
	} catch (error) {
		res.status(400).send('error deleting pub');
	}
});

// @route           PUT /pub/:id
// @description     Update pub
router.put('/:id', auth, async (req, res) => {
	// console.log(req.body);

	try {
		let pub = await Pub.findById(req.params.id);
  
		if (pub.userId !== req.user.id) {
			console.log('not allowed to delete pub');
		}

		if (!pub) res.status(404).send('no pub available for update');

		pub.pubName = req.body.pubName;
		pub.adress = req.body.adress;
		pub.rentPrice = req.body.rentPrice;
		pub.capacity = req.body.capacity;
		pub.additionalPersonnel = req.body.additionalPersonnel;
    pub.additionalServices = req.body.additionalServices;

		await pub.save();
		res.json('pub updated successfully');
	} catch (error) {
		res.status(400).send('error editing pub');
	}
});

module.exports = router;