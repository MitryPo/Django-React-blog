import React from 'react'
import {
	makeStyles, Paper, IconButton, Table, TableBody, TableHead,
	TableCell, TableContainer, TableRow, Container, Badge, Link, Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {axiosInstance} from './axios';



const useStyles = makeStyles((theme) => ({
	checkbox: {
		color: theme.palette.primary.main,
	},
	containter: {
		paddingTop: theme.spacing(12)
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
	noPosts: {
		paddingTop: theme.spacing(3),
		textAlign: 'center'
	},

}));


export default function Posts(props) {

	const { posts } = props
	const classes = useStyles()

	function handleDelete(slug) {
		axiosInstance.delete(`posts/edit/${slug}`)
			.then(() => {
				// console.log(`${res} Delete successful`)
				window.location.reload()
			})
			.catch((err) => {
				console.log(err)
			})
	}


	if (!posts || posts.length === 0) return (
		<Typography className={classes.noPosts}
		>Публикаций нет.
			<Link href='/create'
			> Cоздать публикацию
	</Link>
		</Typography>
	)

	return (
		<React.Fragment>
			<Container className={classes.containter}>
				<Paper elevation={0}>
					<TableContainer className={classes.container}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Категория</TableCell>
									<TableCell align="left">Заголовок</TableCell>
									<TableCell align="left">Статус</TableCell>
									<TableCell align="left">Изменить / Удалить</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{posts.map((post) => {
									return (
										<TableRow>
											<TableCell align="left">{post.category}</TableCell>
											<TableCell align="left" key={post.id}>
												<Link
													color="textPrimary"
													href={`/post/${post.slug}/`}
													className={classes.link}
												>
													{post.title}
												</Link>
											</TableCell>

											<TableCell align="left" sortDirection='desc'>
												<Badge
													badgeContent={post.status}
													color={post.status == 'draft' ? 'secondary' : 'primary'}
												/>
											</TableCell>
											<TableCell align="left">
												<IconButton
													href={`/edit/${post.slug}/`}
													className={classes.link}
												>
													<EditIcon />
												</IconButton >
												<IconButton
													onClick={() => handleDelete(post.slug)}
													className={classes.link}
												>
													<DeleteIcon />
												</IconButton >
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};