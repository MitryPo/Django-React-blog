import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import {
  AppBar, Grid, Container, Divider, Link, IconButton, Toolbar, Menu, Tab, Tabs, MenuItem, Avatar, Button, Typography
} from '@material-ui/core'
import Categories from './Posts/categories'
import SearchBar from '../components/searchBar'
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles((theme) => ({

  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  container: {
    paddingTop: theme.spacing(13)
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4)
  },
  mainLink: {
    textDecoration: 'underline'
  },
  toolbarTitle: {
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    fontWeight: 700
  },
}))


function Header() {
  const token = localStorage.getItem('access_token')
  const classes = useStyles()
  const { slug } = useParams()
  const categories = Categories()
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <AppBar
        color='inherit'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <Grid
            container
            direction='row'
            spacing={2}
            alignItems='center'
            justify='space-around'
          >
            <Grid item>
              <Typography variant='overline' className={classes.mainLink}>
                <Link color='textPrimary' href='/'>Главная</Link>
              </Typography>
            </Grid>
            {categories.map((category) => (
              <Grid item>
                <Typography variant='overline'>
                  <Link
                    color='textPrimary'
                    href={`/category/${category.slug}`}
                    key={category.id}
                  >{category.name}
                  </Link>
                </Typography>
              </Grid>
            ))}
            <Grid item>
              <IconButton
                href='/create'
                color='primary'
              >
                <AddCircleIcon fontSize='large' />
              </IconButton>
            </Grid>
            {
              token !== null ?
                <Grid item>
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
                      <MenuItem onClick={() => window.location.assign('/profile/') }>Профиль</MenuItem>
                      <MenuItem onClick={() => window.location.assign('/admin/')}>Мои публикации</MenuItem>
                      <MenuItem color='secondary' onClick={() => window.location.replace('/logout/')}>Выйти</MenuItem>
                    </Menu>
                  </IconButton>
                </Grid>
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
          </Grid>
        </Toolbar>

      </AppBar >
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} md={3}>
            <Typography
              variant='h3'
              color='inherit'
              className={classes.toolbarTitle}
            >
              BlogmeUp
              </Typography>
          </Grid>
          <Grid xs={12} md={7}>
            <SearchBar />
          </Grid>
        </Grid>
        <Divider />
      </Container>
    </React.Fragment >
  )
}

export default Header