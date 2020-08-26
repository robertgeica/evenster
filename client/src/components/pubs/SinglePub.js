import React, { useEffect, useState, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPub } from '../../actions/pub';
import store from '../../store/store';
// import './blog-page.scss';

import CardMedia from '@material-ui/core/CardMedia';

const SinglePub = (props) => {
	useEffect(() => {
		store.dispatch(loadPub(props.match.params.id));
	}, []);

	const pub = props.currentPub;
	const { additionalPersonnel, additionalServices } = pub;

	// console.log(pub.additionalPersonnel);
	// console.log(pub.additionalServices);

	const renderAdditional = () => {
		if (additionalPersonnel == undefined || additionalServices == undefined) {
			console.log('empty');
		} else {
			if (additionalPersonnel.length > 0) {
				return (
					<div>
						<h3>Additional Personnel</h3>
						{additionalPersonnel.map((pers) => (
							<Fragment key={pers._id}>
								<p>worker: {pers.workerType}</p>
								<p>${pers.price}</p>
							</Fragment>
						))}
						<h3>Additional Services </h3>
						{additionalServices.map((serv) => (
							<Fragment key={serv._id}>
								<p>service: {serv.serviceType}</p>
								<p>${serv.price}</p>
							</Fragment>
						))}
					</div>
				);
			}

		}
	};
	return (
		<div key={pub._id} className="pub">
			<img src={`/${pub.pubImage}`} alt={`${pub.pubImage}`} />
			<p>Name: {pub.pubName}</p>
			<p>Adress: {pub.pubAdress}</p>
			<p>Rent Price: {pub.rentPrice}</p>
			<p>Crt capacity: {pub.pubCapacity}</p>

			{renderAdditional()}
		</div>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs,
	currentPub: state.pub.currentPub
});

export default connect(mapStateToProps, { loadPub })(SinglePub);
