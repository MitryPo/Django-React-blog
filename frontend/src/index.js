import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Register from './components/Auth/register'
import Login from './components/Auth/login'
import LogOut from './components/Auth/logout'
import PostDetail from './components/Posts/postDetail'
import FilterPosts from './components/Posts/filrterPosts'
import Search from './components/searchPosts'
import PostCreate from './components/Admin/postCreate'
import PostEdit from './components/Admin/postEdit'
import Admin from './components/Admin/admin'
import { blue, blueGrey, red, green } from '@material-ui/core/colors';



const theme = createMuiTheme({

  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: red['A700'],
    }
  },
});


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
          <Route path='/admin/' component={Admin} />
          <Route path='/create/' component={PostCreate} />
          <Route path='/edit/:slug/' component={PostEdit} />
          <Route path='/post/:slug/' component={PostDetail} />
          <Route path="/search/" component={Search} />
        </Switch>
      </React.StrictMode>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(routing, document.getElementById('root'))