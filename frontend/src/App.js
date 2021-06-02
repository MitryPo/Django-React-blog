import React, { useEffect, useState } from 'react'
import { axiosInstance } from './axios'
import Posts from './components/Posts/posts'
import PostLoadingComponent from './components/Posts/postLoading'
import Header from './components/header'
import Footer from './components/footer'
import { makeStyles, Grid, CssBaseline } from '@material-ui/core'
import SearchBar from './components/searchBar'
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))


export default function App() {
  const classes = useStyles()
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({ loading: true, posts: null, pages: null })
  const [page, setPage] = useState('');
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axiosInstance
      .get(`posts/?offset=${(page * 8) - 8}`)
      .then((res) => {
        setAppState({
          posts: res.data.results,
          loading: false,
          pages: Math.ceil((res.data.count / 6) - 1)
        })
      })
  }, [page])

  return (
    <Grid
      container
      component="main"
      justify='center'
      className={classes.root}
    >
      <CssBaseline />
      <Header />
      <SearchBar />
      <Grid item xs={12} md={9} square>
        <div className={classes.paper}>
          <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
      </Grid>
      <Grid item xs={12} className={classes.paper}>
        <Pagination count={appState.pages} page={page} onChange={handleChange} variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid >
  )
}