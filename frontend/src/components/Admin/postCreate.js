import React, { useState, useEffect } from 'react'
import axiosInstance from './axios';
import { useHistory } from 'react-router-dom';
import Categories from '../Posts/categories'
import {
	makeStyles, Container, Typography,
	Grid, Button, Link, TextField, MenuItem
} from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({

	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(3, 0, 0)
	},
	header: {
		fontWeight: 700
	},
	input: {
		display: 'none'
	}
}));

export default function PostCreate() {

	const token = localStorage.getItem('access_token')
	const categories = Categories()
	const history = useHistory();
	const initialFormData = Object.freeze({
		category: null,
		title: '',
		excerpt: '',
		content: '',
		status: 'draft'
	});

	const options = [
		{
			value: 'draft',
			label: 'Черновик',
		},
		{
			value: 'published',
			label: 'Публикация'
		}]

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
			.catch((err) => {
				alert(err)
			})
			console.log(formData)
		history.push('/admin')
		window.location.reload()
	}

	const classes = useStyles()

	return (
		<Container component="main" maxWidth='md'>

			{
				token !== null ?

					<div className={classes.paper}>
						<Typography variant="h4" className={classes.header}>
							Новая публикация
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="category"
										select
										size='small'
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
										id="title"
										size='small'
										label="Заголовок"
										name="title"
										autoComplete="title"
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="excerpt"
										size='small'
										label="О чем публикация"
										name="excerpt"
										autoComplete="excerpt"
										onChange={handleChange}

									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="content"
										size='small'
										label="Содержание"
										name="content"
										autoComplete="content"
										multiline
										rows={4}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<input
										accept="image/*"
										name='image'
										type="file"
										id="image-file"
										onChange={handleChange}
									/>
								</Grid>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="status"
									size='small'
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
							<Button
								type="submit"
								variant="contained"
								color={submit.color}
								className={classes.button}
								onClick={handleSubmit}
								disableElevation
							>
								{submit.text}
							</Button>
						</form>
					</div>
					:
					window.location.replace('/login')
			}
		</Container>
	)
}

