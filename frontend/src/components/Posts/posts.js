import React, { useState, useEffect } from 'react'
import {
	makeStyles, Card, CardContent, CardMedia, Grid, Typography,
	Container, Link, GridList, GridListTile
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	cardMedia: {
		paddingTop: '55%',
		margin: theme.spacing(0,2,0,0)
	},
	link: {
		margin: theme.spacing(1, 1.5)
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700]
	},
	cardContent: {
		padding: 0
	},
	postTitle: {
		fontSize: '18px',
		fontWeight: 600,
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '15px',
		textAlign: 'left',
		margnBottom: theme.spacing(2)
	},
	noPosts: {
		textAlign: 'center'
	}
}))


export default function Posts(props) {

	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
	const { posts } = props
	const classes = useStyles()
	if (!posts || posts.length === 0)
		return (
			<Typography
				className={classes.noPosts}
			>Публикаций нет. 
			<Link href='/create'
			> Cоздать публикацию
	</Link>
			</Typography>
		)
	return (
		<React.Fragment>
			<Container>
				<GridList>
					{posts.map((post, index) => (
						<GridListTile
							key={index}
							cols={index % 3 === 0 ? 2 : 1}
							rows='auto'
						>
							<Card className={classes.card} elevation={0}>
								<Link
									color='textPrimary'
									href={`/post/${post.slug}`}
									className={classes.link}
								>
									<CardMedia
										className={classes.cardMedia}
										image='https://source.unsplash.com/random'
										title='Image title'
									/>
								</Link>
								<CardContent className={classes.cardContent}>
									<Typography
										gutterBottom
										variant='h6'
										className={classes.postTitle}
									>
										{post.title.substr(0, 45)}
									</Typography>

									<Typography variant="body2" className={classes.postText}>
										{index % 3 === 0 ?
											`${post.excerpt.substr(0, 100).trim()}...`
											:
											`${post.excerpt.substr(0, 50).trim()}...`
										}
									</Typography>
									<Typography variant="caption" color="textSecondary">
										{post.category} &bull; {` ${new Date(post.published).toLocaleDateString("ru-RU", options)}`}
									</Typography>
								</CardContent>
							</Card>
						</GridListTile>
					)
					)}
				</GridList>
			</Container>
		</React.Fragment>
	)
}
