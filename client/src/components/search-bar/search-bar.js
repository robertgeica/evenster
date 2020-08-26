import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';

// import RestaurantCard from './restaurant-card/restaurant-card';
import PubCard from '../pubs/PubCard';

import image from '../../assets/unnamed.jpg';

import { loadPubs, sortedPubs } from '../../actions/pub';

import './search-bar.scss';

const SearchBar = ({ pubs }) => {
	useEffect(() => {
		store.dispatch(loadPubs());
		// console.log('loading pubs');
	}, []);

	const [ searchBy, setSearchBy ] = useState({});
	const handleChange = (text) => (e) => {
		setSearchBy({ ...searchBy, [text]: e.target.value });
		console.log(searchBy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let sPubs = [];
		console.log('submited');

		pubs.map((pub) => {
			console.log();

			if (pub.pubName == searchBy.name ||
				pub.pubCapacity == searchBy.capacity || 
				pub.pubAdress.includes(searchBy.city)) {

				sPubs.push(pub);
				store.dispatch(sortedPubs(sPubs));
				setSearchBy({});
			}
			
			
		});
	};

	return (
		<div className="restaurants">
			<form className="search-bar">
				<div className="input-container">
					<label htmlFor="search">Looking For</label>
					<input name="search" type="text" onChange={handleChange('name')} />
				</div>

				<div className="input-container">
					<label htmlFor="search">City</label>
					<input name="search" type="text" onChange={handleChange('city')} />
				</div>

				<div className="input-container">
					<label htmlFor="search">Capacity</label>
					<input name="search" type="text" onChange={handleChange('capacity')} />
				</div>

				<button className="button" onClick={(e) => handleSubmit(e)}>
					<FontAwesomeIcon icon={faSearch} />
				</button>

				<button className="button" onClick={() => store.dispatch(loadPubs())}>
					<FontAwesomeIcon icon={faSync} />
				</button>
			</form>
		</div>
	);
};



const mapStateToProps = (state) => ({
	pubs: state.pub.pubs
});

export default connect(mapStateToProps)(SearchBar);
