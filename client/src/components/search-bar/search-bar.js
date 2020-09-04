import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';

// import RestaurantCard from './restaurant-card/restaurant-card';
import PubCard from '../pubs/PubCard';


import { loadPubs, sortedPubs } from '../../actions/pub';

import './search-bar.scss';

const SearchBar = ({ pubs }) => {
	useEffect(() => {
		store.dispatch(loadPubs());
		// console.log('loading pubs');
	}, []);

	const [ searchBy, setSearchBy ] = useState({
	});
	const handleChange = (text) => (e) => {
		setSearchBy({ ...searchBy, [text]: e.target.value.toLowerCase() });
		console.log(searchBy);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let sPubs = [];
		console.log('submited');

		pubs.map((pub) => {
			
			if( pub.pubName.toLowerCase().includes(searchBy.name)){
			

				sPubs.push(pub);
				store.dispatch(sortedPubs(sPubs));
		
			
		}else if(pub.pubAdress.toLowerCase().includes(searchBy.city)){
			sPubs.push(pub);
			store.dispatch(sortedPubs(sPubs));
		}else if(pub.pubCapacity >= searchBy.capacity&&parseInt(pub.pubCapacity) < parseInt(searchBy.capacity)+100){
			sPubs.push(pub);
			store.dispatch(sortedPubs(sPubs));
		}
		
		else{store.dispatch(sortedPubs(sPubs))}
		});
	};

	return (
		<div className="restaurants">
			<form className="search-bar">
				<div className="input-container">
					<label htmlFor="search">Looking For</label>
					<input name="search" type="text" value={searchBy.name===undefined?"":`${searchBy.name}`} onChange={handleChange('name')} />
				</div>

				<div className="input-container">
					<label htmlFor="search">City</label>
					<input name="search" type="text" value={searchBy.city==undefined?"":`${searchBy.city}`} onChange={handleChange('city')} />
				</div>

				<div className="input-container">
					<label htmlFor="search">Capacity</label>
					<input name="search" type="text" value={searchBy.capacity==undefined?"":`${searchBy.capacity}`} onChange={handleChange('capacity')} />
				</div>

				<div className="search-buttons">
					<button className="button" onClick={(e) => handleSubmit(e)}>
						<FontAwesomeIcon icon={faSearch} />
					</button>

					<button className="button" onClick={(e) =>{e.preventDefault();setSearchBy({}); store.dispatch(loadPubs())}}>
						<FontAwesomeIcon icon={faSync} />
					</button>
				</div>
			</form>
		</div>
	);
};



const mapStateToProps = (state) => ({
	pubs: state.pub.pubs
});

export default connect(mapStateToProps)(SearchBar);
