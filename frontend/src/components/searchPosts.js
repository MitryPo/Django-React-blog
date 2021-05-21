import React, { useState, useEffect } from 'react'
import {axiosInstance} from './../axios'
import PostLoadingComponent from './Posts/postLoading'
import { Link, makeStyles, Grid, Container, Typography } from '@material-ui/core'
import Posts from './Posts/posts'
import Header from './header'
import Footer from './footer'


const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 700,
    paddingTop: theme.spacing(2)
  },
  container: {
    paddingTop: theme.spacing(5)
  }
}))


export default function Search() {
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({
    search: '',
    posts: [],
    loading: true,
  })

  useEffect(() => {
    axiosInstance.get(`posts/search/${window.location.search}`)
      .then((res) => {
        setAppState({
          posts: res.data,
          loading: false
        })
      })
    axiosInstance.get('api/categories/')
      .then((res) => {
        setCategories(res.data)
      })
  }, [setAppState])


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
            <Typography
              variant='h5'
              className={classes.header}
              gutterBottom
            >
              Категории
            </Typography>
            {categories.map((category, index) => (
              <Typography
                variant='body1'
                gutterBottom
              >
                <Link key={index} href={`/category/${category.slug}`}
                >{category.name}
                </Link>
              </Typography>
            ))}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </React.Fragment>
  )
}
