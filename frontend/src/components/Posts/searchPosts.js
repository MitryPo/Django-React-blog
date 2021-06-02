import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../axios'
import PostLoadingComponent from './postLoading'
import { makeStyles, Grid, CssBaseline } from '@material-ui/core'
import Posts from './posts'
import Header from '../header'
import Footer from '../footer'
import SearchBar from '../searchBar'
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))


export default function Search() {
  const classes = useStyles()
  const [page, setPage] = useState('');
  const PostLoading = PostLoadingComponent(Posts)
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [appState, setAppState] = useState({
    search: '',
    posts: [],
    loading: true,
  })

  useEffect(() => {
    axiosInstance.get(`posts/search/${window.location.search}`)
      .then((res) => {
        setAppState({
          posts: res.data.results,
          loading: false
        })
      })
  }, [])


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
    </Grid>
  )
}
