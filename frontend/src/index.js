import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles'
import Register from './components/Auth/register'
import Login from './components/Auth/login'
import LogOut from './components/Auth/logout'
import PostDetail from './components/Posts/postDetail'
import FilterPosts from './components/Posts/filrterPosts'
import Search from './components/Posts/searchPosts'
import PostCreate from './components/Admin/postCreate'
import PostEdit from './components/Admin/postEdit'
import Profile from './components/Admin/profile'
import Admin from './components/Admin/admin'
import { Page404 } from './components/Page404'
import {theme} from './theme'


const routing = (
  <MuiThemeProvider theme={theme}>
    <Router>
      <React.StrictMode>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/register/' component={Register} />
          <Route path='/category/:slug' component={FilterPosts} />
          <Route path='/login/' component={Login} />
          <Route path='/logout/' component={LogOut} />
          <Route path='/my-posts/' component={Admin} />
          <Route path='/profile/' component={Profile} />
          <Route path='/create/' component={PostCreate} />
          <Route path='/edit/:slug/' component={PostEdit} />
          <Route path='/post/:slug/' component={PostDetail} />
          <Route path="/search/" component={Search} />
          <Route component={Page404} />
        </Switch>
      </React.StrictMode>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(routing, document.getElementById('root'))