import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import {
	AppBar, IconButton, Toolbar, Menu, Tab, Tabs, MenuItem, Avatar, Button
} from '@material-ui/core'
import Categories from './Posts/categories'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles((theme) => ({

	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		alignItems: 'center'
	},
	logIn: {
		margin: theme.spacing(0, 2),
	},
	avatar: {
		margin: theme.spacing(1),
		height: theme.spacing(4),
		width: theme.spacing(4)
	}
}))


function Header() {
	const token = localStorage.getItem('access_token')
	const classes = useStyles()
	const {slug} = useParams()
	const categories = Categories()
	const [anchorEl, setAnchorEl] = useState(null);
	const [value, setValue] = useState(0);

	const handleFilter = (slug) => {
		console.log(slug)
	}

	const handleChange = (event, newValue) => {
		console.log(value)
		setValue(newValue)
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


	return (
		<React.Fragment>
			<AppBar
				position="static"
				color='inherit'
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleChange}
						aria-label="disabled tabs example"
					>
						<Tab href='/' label='Главная' />
						{categories.map((category) => (
							<Tab
								key={category.id}
								label={category.name} 
								/>
						))}
					</Tabs>
					{/* <Link href='/create'> */}
					{/* <AddCircleIcon fontSize='large'/> */}
					<Button
						color='primary'
						variant='contained'
						size='small'
						disableElevation
						href='/create'
					>Новая публикация
					</Button>
					{/* </Link> */}
					{
						token !== null ?
							<IconButton>
								<Avatar
									onClick={handleClick}
									className={classes.avatar}
								>
								</Avatar>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>Профиль</MenuItem>
									<MenuItem onClick={() => window.location.assign('/admin/')}>Мои публикации</MenuItem>
									<MenuItem onClick={() => window.location.replace('/logout/')}>Выйти</MenuItem>
								</Menu>
							</IconButton> 
							:
							<Button
								className={classes.logIn}
								href='/login'
								variant='contained'
								size='small'
								disableElevation
							>Войти
					</Button>
					}
				</Toolbar>

			</AppBar>

		</React.Fragment>
	)
}

export default Header