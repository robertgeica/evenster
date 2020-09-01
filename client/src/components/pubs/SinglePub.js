import React, { useEffect, useState, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPub } from '../../actions/pub';
import store from '../../store/store';
// import './blog-page.scss';

import '../posts/SinglePost.scss';

import CardMedia from '@material-ui/core/CardMedia';
import { useRadioGroup } from '@material-ui/core';
import ContactForm from '../contact-form/ContactForm';
import Footer from '../footer/footer'

const SinglePub = (props) => {
	useEffect(() => {
		store.dispatch(loadPub(props.match.params.id));
	}, []);

	const pub = props.currentPub;
	const { additionalPersonnel, additionalServices } = pub;

	const [ checkList, setCheckList ] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCheckList({ ...checkList, [name]: value });
	};

	// console.log(pub.additionalPersonnel);
	// console.log(pub.additionalServices);

	const renderAdditional = () => {
		if (additionalPersonnel == undefined || additionalServices == undefined) {
			console.log('empty');
		} else {
			if (additionalPersonnel.length > 0) {
				return (
					<form className="aditional">
						<h4>Additional Personnel</h4>
						<div className="personal">
							{additionalPersonnel.map((pers) => (
								<div key={pers._id} className="aditional-card">
									<h5 for={`${pers.workerType}`}>{pers.workerType}</h5>
									<label className="price" for={`${pers.workerType}`}>
										RON{pers.price}
									</label>
									<div className="quantity">
										<label for={`${pers.workerType}`}>Quantity: </label>
										<br />
										<input
											type="number"
											className="input-aditional"
											name={`${pers.workerType}`}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</div>
							))}
						</div>

						<h4>Additional Services </h4>
						<div className="servicii">
							{additionalServices.map((serv) => (
								<div key={serv._id} className="aditional-card">
									<h4 for={`${serv.serviceType}`}>{serv.serviceType}</h4>
									<label className="price" for={`${serv.serviceType}`}>
										RON{serv.price}
									</label>
									<div className="quantity">
										<label for={`${serv.serviceType}`}>Quantity: </label>
										<input
											type="text"
											className="input-aditional"
											name={`${serv.serviceType}`}
											onChange={(e) => handleChange(e)}
										/>
									</div>
								</div>
							))}
						</div>
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
					<p>Price: RON{pub.rentPrice}</p>
					<p>Capacity: {pub.pubCapacity}</p>
				</div>

				{renderAdditional()}
			</div>
      
			<ContactForm selected={checkList} />

      <Footer/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs,
	currentPub: state.pub.currentPub
});

export default connect(mapStateToProps, { loadPub })(SinglePub);
