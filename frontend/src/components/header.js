import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import {
  AppBar, Grid, Link, Toolbar, Divider, List, useTheme,
  ListItem, ListItemIcon, ListItemText, Drawer,
  IconButton, Typography
} from '@material-ui/core'
import Categories from './Posts/categories'
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';


const drawerWidth = '100%';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  appBar: {
    padding: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex'
  },
  mainLink: {
    textDecoration: 'underline',
  },
  link: {
    textAlign: 'center'
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 700
  },
}))


function Header() {
  const token = localStorage.getItem('access_token')
  const classes = useStyles()
  const categories = Categories()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }
  const theme = useTheme();
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
            spacing={1}
            alignItems='center'
            justify='space-between'
          >
            <Grid item>
              <Typography
                variant='h4'
                color='inherit'
                className={classes.toolbarTitle}
              ><Link color='textPrimary' href='/'>
                  BlogmeUp</Link>
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar >
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          <Divider />
          {categories.map((category, index) => (
            <ListItem
              button
              key={index}
              onClick={() => window.location.assign(`/category/${category.slug}`)}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
          <Divider />
          {
            token !== null ?
              <div>
                <ListItem button onClick={() => window.location.assign('/create')}>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                  <ListItemText primary='Создать публикацию' />
                </ListItem>
                <ListItem button onClick={() => window.location.assign('/profile')}>
                  <ListItemIcon><SettingsIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Профиль' />
                </ListItem>
                <ListItem button onClick={() => window.location.assign('/my-posts')}>
                  <ListItemIcon><MessageOutlinedIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Мои публикации' />
                </ListItem>
                <ListItem button onClick={() => window.location.assign('/logout')}>
                  <ListItemIcon><ExitToAppIcon color='primary' /></ListItemIcon>
                  <ListItemText primary='Выйти' />
                </ListItem>
              </div>
              :
              <ListItem button onClick={() => window.location.assign('/login')}>
                <ListItemIcon><InputIcon color='primary' /></ListItemIcon>
                <ListItemText primary='Войти' />
              </ListItem>
          }
        </List>
      </Drawer>
    </React.Fragment >
  )
}

export default Header