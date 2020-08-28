import React, { useEffect, useState, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPub } from '../../actions/pub';
import store from '../../store/store';
// import './blog-page.scss';

import '../posts/SinglePost.scss';

import CardMedia from '@material-ui/core/CardMedia';

const SinglePub = (props) => {
	useEffect(() => {
		store.dispatch(loadPub(props.match.params.id));
	}, []);

	const pub = props.currentPub;
	const { additionalPersonnel, additionalServices } = pub;

  let checklist = [];

	const handleReset = (e) => {
		e.preventDefault();
		checklist = [];
	};


	const handleChange = (name, price) => {
		
    let newObj = { name, price };
    console.log('new obj', newObj);

		checklist.push(newObj);

	console.log(checklist);
	};
console.log('out', checklist);

	// console.log(pub.additionalPersonnel);
	// console.log(pub.additionalServices);

	const renderAdditional = () => {
		if (additionalPersonnel == undefined || additionalServices == undefined) {
			console.log('empty');
		} else {
			if (additionalPersonnel.length > 0) {
				return (
					<form className="aditional">
						<h3>Additional Personnel</h3>
						<div className="personal">
							{additionalPersonnel.map((pers) => (
								<div key={pers._id} className="aditional-card">
									<input type="checkbox" name={`${pers.workerType}`} value={`${pers.price}`} />
									<label htmlFor={`${pers.workerType}`}>worker: {pers.workerType}</label>
									<label htmlFor={`${pers.workerType}`}>${pers.price}</label>
								</div>
							))}
						</div>

						<h3>Additional Services </h3>
						<div className="servicii">
							{additionalServices.map((serv) => (
								<div key={serv._id} className="aditional-card">
									<input
										type="checkbox"
										name={`${serv.serviceType}`}
										value={`${serv.price}`}
										onClick={() => handleChange(serv.serviceType, serv.price)}
									/>
									<label htmlFor={`${serv.serviceType}`}>service: {serv.serviceType}</label>
									<label htmlFor={`${serv.serviceType}`}>${serv.price}</label>
								</div>
							))}
						</div>

						<button onClick={e => handleReset(e)}> Reset </button>
					</form>
				);
			}
		}
	};
	return (
		<div key={pub._id} className="pub">
			<img src={`/${pub.pubImage}`} alt={`${pub.pubImage}`} className="Image" />
			<div className="pub-container">
				<div className="pub-details">
					<h3>{pub.pubName}</h3>
					<p>{pub.pubAdress}</p>
					<p>Price:{pub.rentPrice}</p>
					<p>Capacity:{pub.pubCapacity}</p>
				</div>

				{renderAdditional()}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs,
	currentPub: state.pub.currentPub
});

export default connect(mapStateToProps, { loadPub })(SinglePub);
