import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './restaurant-card.scss';

const RestaurantCard = ({ image, title, description,post_id,price,capacity }) => {
	return (
		<Card className="card">
             <CardActionArea>
				<CardMedia className="media" image={image} title={title} />
				<CardContent className="text">
					<Typography className="price" component='p'>
						{price} 12
					</Typography>
                    <Typography className="capacity" component='p'>
						{capacity} 54
					</Typography>
                    <div className="secound-container">
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}titlu
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description} locatie
                        </Typography>
                    </div>
				</CardContent>
                </CardActionArea>
		</Card>
	);
};

export default RestaurantCard;