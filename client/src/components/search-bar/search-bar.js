import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import RestaurantCard from './restaurant-card/restaurant-card';
import PubCard from '../pubs/PubCard';

import image from '../../assets/unnamed.jpg';

import { loadPubs } from '../../actions/pub';

import './search-bar.scss';

const SearchBar = ({ pubs }) => {

  useEffect(() => {
		store.dispatch(loadPubs());
		// console.log('loading pubs');
	}, []);


	return (
		<div className="restaurants">
			<form className="search-bar">
				<div className="input-container">
					<label htmlFor="search">Looking For</label>
					<input name="search" type="text" />
				</div>

				<div className="input-container">
					<label htmlFor="search">City</label>
					<input name="search" type="text" />
				</div>

				<div className="input-container">
					<label htmlFor="search">When</label>
					<input name="search" type="text" />
				</div>

				<button className="button">
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</form>

		</div>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs
});

export default connect(mapStateToProps)(SearchBar);

