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

import { loadPost } from '../../actions/post';
import '../search-bar/restaurant-card/restaurant-card.scss';

const PostCard = ({ image, title, description, post_id }) => {
	return (
		<Card className="card">
			<Link
				onClick={() => {
					store.dispatch(loadPost(post_id));
				}}
				to={`/posts/${post_id}`}
			>
				<CardActionArea>
					<CardMedia className="media" image={image} />
					<CardContent className="text">
						<div className="secound-container">
							<Typography gutterBottom variant="h5" component="h2">
								{title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{description}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	currentPost: state.post.currentPost
});

export default connect(mapStateToProps)(PostCard);
