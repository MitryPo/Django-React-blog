import React, { useEffect, useState } from 'react'
import {axiosInstance} from '../../axios'
import Posts from './posts'
import PostLoadingComponent from './postLoading'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { makeStyles, Grid, CssBaseline } from '@material-ui/core'
import { useParams } from 'react-router'
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


export default function FilterPosts() {
  const classes = useStyles()
  const {slug} = useParams()
  const PostLoading = PostLoadingComponent(Posts)
  const [page, setPage] = useState('');
  const [appState, setAppState] = useState({
    loading: true,
    posts: null
  })
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
    axiosInstance
    .get(`/posts/?category__slug=${slug}`)
      .then((res) => {
        setAppState({
          posts: res.data.results,
          loading: false
        })
      })
  }, [slug])

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