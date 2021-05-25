import React, { useEffect, useState } from 'react'
import { axiosInstance } from './axios'
import Posts from './components/Posts/posts'
import PostLoadingComponent from './components/Posts/postLoading'
import Header from './components/header'
import Footer from './components/footer'
import { Link, makeStyles, Grid, Container, Typography, Divider } from '@material-ui/core'
import { useParams } from 'react-router'
import { SideBar } from './components/Posts/sideBar'


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5)
  },
}))


export default function App() {
  const classes = useStyles()
  const { slug } = useParams()
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({loading: true, posts: null})

  useEffect(() => {
    axiosInstance
      .get(`posts/`)
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
    </React.Fragment >
  )
}