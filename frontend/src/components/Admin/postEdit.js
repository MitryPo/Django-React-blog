import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../axios';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Categories from '../Posts/categories'
import {
	makeStyles, Container, Select, Typography,
	Grid, Button, MenuItem, CssBaseline, TextField
} from '@material-ui/core/';
import { options } from './postCreate'
import Header from '../header'


const useStyles = makeStyles((theme) => ({

	paper: {
		width: '100%',
		marginTop: theme.spacing(13),
		display: 'flex',
		flexDirection: 'column',
	},
	form: {
		marginTop: theme.spacing(3),
	},
	header: {
		fontWeight: 500
	}
}));

export default function PostEdit() {

	const initialFormData = Object.freeze({
		category: null,
		title: '',
		excerpt: '',
		content: '',
		status: null
	});

	const token = localStorage.getItem('access_token')
	const categories = Categories()
	const history = useHistory()
	const { slug } = useParams()
	const [postImage, setPostImage] = useState(undefined);
	const [formData, updateFormData] = useState(initialFormData);


	useEffect(() => {
		axiosInstance.get(`posts/edit/${slug}/`)
			.then((res) => {
				updateFormData({
					...formData,
					['category']: res.data.category,
					['title']: res.data.title,
					['excerpt']: res.data.excerpt,
					['content']: res.data.content,
					['status']: res.data.status
				})
				console.log(res.data)
			})
	}, [updateFormData, slug])

	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files[0]
			})
		}
		updateFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	async function handleSubmit(e) {
		e.preventDefault();
		await axiosInstance
			.patch(`posts/edit/${slug}/`, {
				title: formData.title.trim(),
				excerpt: formData.excerpt.trim(),
				content: formData.content.trim(),
				category: formData.category,
				image: postImage.image,
				status: formData.status
			})
			.then(() => {
				history.push('/admin')
			})
			.catch((err) => {
				alert(err)
			})
	};

	const classes = useStyles();

	return (
		<div>
			<Header />
			<Container component="main" maxWidth="md">
				{
					token !== null ?
						<div className={classes.paper}>
							<Typography variant="h4" className={classes.header}>
								Редактировать публикацию
						</Typography>
							<form className={classes.form} noValidate>
								<Grid
									container
									direction='row'
									alignItems='flex-start'
									justify='space-between'
									spacing={5}
								>
									<Grid item xs={12} md={8}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													name="title"
													autoComplete="title"
													helperText='Заголовок'
													value={formData.title}
													onChange={handleChange}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													name="excerpt"
													helperText='Краткое содержание'
													autoComplete="excerpt"
													value={formData.excerpt}
													onChange={handleChange}

												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													name="content"
													autoComplete="content"
													helperText='Основная информация'
													multiline
													rows={12}
													value={formData.content}
													onChange={handleChange}
												/>
											</Grid>
											<Grid item xs={12}>
												<input
													accept="image/*"
													name='image'
													type="file"
													
													label='Обложка публикации'
													onChange={handleChange}
												/>
												<div style={{ padding: '0.2em 0 0 0.8em' }}>
													<Typography
														color='primary'
														variant='caption'
													>Обложка для публикации
													</Typography>
												</div>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12} md={4}>
										<Grid
											container
											spacing={2}
											direction='row'
										>
											<Grid item xs={12}>
												<TextField
													select
													required
													fullWidth
													variant="outlined"
													id="category"
													// label="Категория"
													name="category"
													value={formData.category}
													helperText='Выберите категорию'
													onChange={handleChange}
												>
													{categories.map((category) => (
														<MenuItem key={category.name} value={category.id}
														>{category.name}
														</MenuItem>
													))}
												</TextField>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													id="status"
													name="status"
													value={formData.status}
													select
													helperText='Выберите статус для вашей публикации'
													onChange={handleChange}
												>
													{options.map((status, index) => (
														<MenuItem key={index} value={status.value}
														>{status.label}
														</MenuItem>
													))}
												</TextField>
											</Grid>
											<Grid item xs={12}>
												<Button
													type="submit"
													variant="contained"
													color='primary'
													size='large'
													onClick={handleSubmit}
													disableElevation
													fullWidth
												>
													Сохранить изменения
										</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</form>
						</div>
						:
						window.location.href = '/login'
				}
			</Container>
		</div>
	);
}

