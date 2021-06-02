import React from 'react'
import { Container, Grid, Typography, Link, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		padding: theme.spacing(3, 0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}))

function Footer() {

	const classes = useStyles()
	return (
		<React.Fragment>
			<Container maxWidth='md' component='footer' className={classes.footer}>
				<Typography variant='body2' color='textSecondary' align='center'>
					{'Copyright © '}
					<Link color='inherit' href='/'>
						BlogmeUp
        				</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Container>
		</React.Fragment>
	)
}

export default Footer