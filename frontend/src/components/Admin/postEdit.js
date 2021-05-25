import React, { useState, useEffect } from 'react'
import axiosInstance from './axios';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Categories from '../Posts/categories'
import {
	makeStyles, Container, Select, Typography,
	Grid, Button, MenuItem, CssBaseline, TextField
} from '@material-ui/core/';
import { options } from './postCreate'


const useStyles = makeStyles((theme) => ({

	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(3, 0, 2),
	},
	header: {
		fontWeight: 700
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
	const [formData, updateFormData] = useState(initialFormData);


	useEffect(() => {
		axiosInstance.get(`posts/detail/${slug}/`)
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
				status: formData.status
			})
			.then((res) => {
				history.push('/admin')
			})
			.catch((err) => {
				alert(err)
			})
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="md">
			{
				token !== null ?

					<div className={classes.paper}>
						<Typography variant="h4" className={classes.header}>
							Редактировать публикацию
						</Typography>
						<form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										select
										required
										fullWidth
										variant="outlined"
										id="category"
										size='small'
										label="Категория"
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
										value={formData.title}
										id="title"
										size='small'
										name="title"
										autoComplete="title"
                    					helperText='Заголовок'
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										value={formData.excerpt}
										variant="outlined"
										id="excerpt"
										size='small'
										name="excerpt"
                    					helperText='Краткое описание'
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
										value={formData.content}
										name="content"
										autoComplete="content"
                    					helperText='Основная информация'
										multiline
										rows={4}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="status"
										size='small'
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
							</Grid>
							<Button
								type="submit"
								variant="contained"
								color='primary'
								size='small'
								onClick={handleSubmit}
								className={classes.button}
								disableElevation
							>
								Сохранить изменения
							</Button>
						</form>
					</div>
					:
					window.location.href = '/login'
			}
		</Container>
	);
}

