import React, { useState, useEffect } from 'react'
import {
	makeStyles, Card, CardContent, CardMedia, Grid, Typography,
	Container, Link
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardMedia: {
		paddingTop: '55%',
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
		fontSize: '20px',
		textAlign: 'left',
		fontWeight: 700
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '15px',
		textAlign: 'left',
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
		<Grid container spacing={3}>
			{posts.map((post, index) => (
				<Grid
					item
					key={index}
					md={index % 4 == 0? 12 : 4}
					sm={12}
					xs={12}
				>
					<Card elevation={0}>
						<Link
							color='textPrimary'
							href={`/post/${post.slug}`}
							className={classes.link}
						>
							<CardMedia
								className={classes.cardMedia}
								image={post.image}
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
				</Grid>
			)
			)}
		</Grid>
	)
}
