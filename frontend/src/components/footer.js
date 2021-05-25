import React from 'react'
import { Container, Grid, Typography, Link, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}))

function Copyright() {

	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				BlogmeUp
        </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const footers = [
	{
		title: 'Ваш аккаунт',
		description: [
			'Профиль',
			'Настройки',
		]
	},
	{
		title: 'О проекте',
		description: ['Команда', 'О нас', 'Контакты']
	},
	{
		title: 'Услуги',
		description: ['Реклама', 'Публикации'],
	},
	{
		title: 'Информация',
		description: ['Соглашение', 'Конфидециальность'],
	},
]

function Footer() {


	const classes = useStyles()

	return (
		<React.Fragment>
			<Container maxWidth='md' component='footer' className={classes.footer}>
				<Grid container spacing={4} justify='space-evenly'>
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant='h6' color='textPrimary' gutterBottom>
								{footer.title}
							</Typography>
							{footer.description.map((item) => (
								<Typography key={item} variant='subtitle1'>
									<Link href='#' color='textSecondary'>
										{item}
									</Link>
								</Typography>
							))}
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</React.Fragment>
	)
}

export default Footer