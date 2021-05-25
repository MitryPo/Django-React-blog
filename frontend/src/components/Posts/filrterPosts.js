import React, { useEffect, useState } from 'react'
import {axiosInstance} from '../../axios'
import Posts from './posts'
import PostLoadingComponent from './postLoading'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link, makeStyles, Grid, Container, Typography } from '@material-ui/core'
import { useParams } from 'react-router'
import {SideBar} from './sideBar'


const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 700,
    paddingTop: theme.spacing(2)
  },
  container: {
    paddingTop: theme.spacing(5)
  }
}))


export default function FilterPosts() {
  const classes = useStyles()
  const {slug} = useParams()
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({
    loading: true,
    posts: null
  })

  useEffect(() => {
    axiosInstance
    .get(`/posts/?category__slug=${slug}`)
      .then((res) => {
        setAppState({
          posts: res.data,
          loading: false
        })
      })
  }, [])

  return (
    <React.Fragment>
      <Header />
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justify='flex-start'
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item xs={12} md={10}>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
          </Grid>
          <Grid item xs={12} md={2}>
            <SideBar/>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </React.Fragment>
  )
}