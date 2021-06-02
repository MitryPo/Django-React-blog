import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../axios';
import { useHistory } from 'react-router-dom';
import Categories from '../Posts/categories'
import {
	makeStyles, Container, Typography,
	Grid, Button, TextField, MenuItem
} from '@material-ui/core/';
import Header from '../header'


const useStyles = makeStyles((theme) => ({

	paper: {
		marginTop: theme.spacing(13),
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	header: {
		fontWeight: 500
	}
}));

export const options = [
	{
		value: 'draft',
		label: 'Черновик',
	},
	{
		value: 'published',
		label: 'Публикация'
	}]

export default function PostCreate() {

	const token = localStorage.getItem('access_token')
	const categories = Categories()
	const history = useHistory();
	const initialFormData = Object.freeze({
		category: null,
		title: '',
		excerpt: '',
		content: '',
		status: 'draft',
	});


	const [postData, updatePostData] = useState(initialFormData);
	const [postImage, setPostImage] = useState(undefined);
	const [submit, setSubmit] = useState({
		color: 'secondary',
		text: 'Сохранить черновик'
	})


	const handleChange = (e) => {
		if ([e.target.name] == 'status') {
			if ([e.target.value] == 'published') {
				setSubmit({ text: 'Опубликовать', color: 'primary' })
			} else {
				setSubmit({ text: 'Сохранить черновик', color: 'secondary' })
			}
		}
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files[0]
			})
			// console.log(e.target.files)
		} else {
			updatePostData({
				...postData,
				[e.target.name]: e.target.value
			})
		}
		// console.log(postData)
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		let formData = new FormData()
		formData.append('category', postData.category)
		formData.append('title', postData.title)
		formData.append('excerpt', postData.excerpt)
		formData.append('content', postData.content)
		formData.append('status', postData.status)
		formData.append('image', postImage.image)
		axiosInstance.post(`posts/create/`, formData)
			.then(() => {
				history.push('/admin')
				window.location.reload()
			})
			.catch((err) => {
				alert(err)
			})
		// console.log(formData)
	}

	const classes = useStyles()

	return (
		<div>
			<Header />
			<Container component='main' maxWidth='md'>
				{
					token !== null ?
						<div className={classes.paper}>
							<Typography variant="h4" className={classes.header}>
								Новая публикация
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
													label="Заголовок"
													name="title"
													autoComplete="title"
													helperText='Заголовок'
													onChange={handleChange}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													label="О чем публикация"
													name="excerpt"
													helperText='Краткое содержание'
													autoComplete="excerpt"
													onChange={handleChange}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													required
													fullWidth
													label="Содержание"
													name="content"
													autoComplete="content"
													helperText='Основная информация'
													multiline
													rows={12}
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
													variant="outlined"
													required
													fullWidth
													id="category"
													select
													label="Категория"
													name="category"
													helperText='Выберите категорию'
													onChange={handleChange}
												>
													{categories.map((category) => (
														<MenuItem key={category.id} value={category.id}
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
													label="Статус"
													name="status"
													value={postData.status}
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
													fullWidth
													variant="contained"
													color={submit.color}
													size='large'
													onClick={handleSubmit}
													disableElevation
												>
													{submit.text}
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</form>
						</div>
						:
						window.location.replace('/login')
				}
			</Container>
		</div>
	)
}

