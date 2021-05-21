import React, { useEffect, useState } from 'react'
import { axiosInstance } from './axios'
import Posts from './components/Posts/posts'
import PostLoadingComponent from './components/Posts/postLoading'
import Header from './components/header'
import Footer from './components/footer'
import SearchBar from './components/searchBar'
import { Link, makeStyles, Grid, Container, Typography, Divider } from '@material-ui/core'
import { useParams } from 'react-router'
import { Social } from './components/Posts/social'


const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 700,
    padding: theme.spacing(2, 0),
    textAlign: 'center'
  },
  container: {
    padding: theme.spacing(5, 0)
  },
  toolbarTitle: {
    paddingBottom: theme.spacing(5),
    flexGrow: 1,
    fontWeight: 700
  },
}))


export default function App() {
  const classes = useStyles()
  const { slug } = useParams()
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({
    loading: true,
    posts: null
  })

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
        <Container>
          <Grid
            container
            direction="row"
            justify='flex-start'
            alignItems="center"
          >
            <Grid item xs={12} md={3}>
              <Typography
                variant='h3'
                color='inherit'
                className={classes.toolbarTitle}
              >
                <Link
                  href='/'
                  underline='none'
                  color='inherit'
                >
                  BlogmeUp
						</Link>
              </Typography>
            </Grid>
            <Grid item xs>
            <SearchBar/>
            </Grid>
          </Grid>
          <Divider />
        </Container>
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
              <Typography
                variant='h6'
                className={classes.header}
                gutterBottom
              >
                Социальные сети
            </Typography>
              <Social />
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </Container>
    </React.Fragment >
  )
}