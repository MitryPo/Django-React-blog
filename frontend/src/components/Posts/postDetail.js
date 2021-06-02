import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../../axios'
import { useParams } from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'
import UserChip from '../Admin/chip'

import {
	Divider, makeStyles, Container,
	Paper, Grid, Link, Typography,
} from '@material-ui/core'
import Image from 'material-ui-image';


const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	paper: {
		margin: theme.spacing(13, 2),
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		fontWeight: 700,
		fontSize: '3rem'
	},
	image: {
		margin: theme.spacing(4, 0)
	},
	content: {
		whiteSpace: 'pre-wrap',
		fontSize: '1.2rem'
	},
	excerpt: {
		margin: theme.spacing(1, 0),
		fontSize: '1.2rem'
	}
}))

export default function PostDetail() {

	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
	const { slug } = useParams()
	const classes = useStyles()
	const [data, setData] = useState({ posts: [] })
	useEffect(() => {
		axiosInstance.get(`/posts/detail/${slug}/`).then((res) => {
			setData({ posts: res.data })
			// console.log(res.data)
		})
	}, [setData, slug])

	return (
		<div className={classes.paper}>
			<Grid
				container
				component="main"
				className={classes.root}
				justify='center'
			>
				<Header />
				<Grid item xs={12} md={9}>
					<Typography
						variant='h3'
						color='textPrimary'
						className={classes.header}
					>
						{data.posts.title}
					</Typography>
					<Divider />
					<Typography
						variant='h6'
						paragraph
						className={classes.excerpt}
					>
						{data.posts.excerpt}
					</Typography>
					<Grid
						className={classes.userdata}
						container
						direction='row'
						justify='flex-start'
						alignItems='center'
						spacing={1}
					>
						<Grid item>
							<UserChip
								author={data.posts.author}
							>
							</UserChip>
						</Grid>
						<Grid item>
							<Typography
								variant='caption'
								color='textSecondary'
							>
								{data.posts.category} &bull; {` ${new Date(data.posts.published).toLocaleDateString("ru-RU", options)}`}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={9} className={classes.image}>
					<Image
						src={data.posts.image}
						onClick={() => console.log('onClick')}
						aspectRatio={(16 / 9)}
						disableSpinner
					/>
				</Grid>
				<Grid item xs={12} md={9}>
					<Typography
						className={classes.content}
						variant='h6'
						paragraph
					>
						{data.posts.content}
					</Typography>
				</Grid>
				<Footer />
			</Grid>
		</div>
	)
}
