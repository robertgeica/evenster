import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/store';

import { loadPub } from '../../actions/pub';

const PubCard = ({ pub, image, name, adress, rentPrice, capacity, additionalPersonnel, additionalServices, pub_id }) => {
	// console.log(pub_id);
	return (
		<Link
			onClick={() => {
				store.dispatch(loadPub(pub_id));
			}}
			to={`/pubs/${pub_id}`}
		>
			<Card className="card">
				<CardActionArea>
					<CardMedia className="media" image={image} />
					<CardContent className="text">
						<div className="secound-container">
							<Typography gutterBottom variant="h5" component="h2">
								{name}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{adress}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

const mapStateToProps = (state) => ({
	pubs: state.pub.pubs,
	currentPub: state.pub.currentPub
});

export default connect(mapStateToProps)(PubCard);
