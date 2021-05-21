import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../axios'
import { useParams } from 'react-router-dom'
import Header from '../header'
import Footer from '../footer'

import {
    Box, Divider, makeStyles, Container,
    Paper, Grid, Link, Typography
} from '@material-ui/core'
import Image from 'material-ui-image';


const useStyles = makeStyles((theme) => ({
    sidebar: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[300],
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        marginTop: theme.spacing(8)
    },
    header: {
        fontWeight: 700
    },
}))

export default function PostDetail() {

    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    const { slug } = useParams()
    const classes = useStyles()
    const [data, setData] = useState({ posts: [] })
    useEffect(() => {
        axiosInstance.get(`posts/detail/${slug}/`).then((res) => {
            setData({ posts: res.data })
            // console.log(res.data)
        })
    }, [setData, slug])

    return (
        <div>
            <Header />
            <Container component='main' maxWidth='xl'>
                <div className={classes.paper}>
                    <Container>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start"
                            spacing={4}
                        >
                            <Grid item xs={12} md={8}>
                                <Typography
                                    variant='h4'
                                    color='textPrimary'
                                    className={classes.header}
                                >
                                    {data.posts.title}
                                </Typography>
                                <Divider />
                                <Typography
                                    variant='caption'
                                    color='textSecondary'
                                    paragraph
                                >
                                    {` ${new Date(data.posts.published).toLocaleDateString("ru-RU", options)}`}
                                    <Link
                                        underline='none'
                                        href='/user/'
                                    >{` ${data.posts.author}`}
                                    </Link>
                                </Typography>
                                <Typography
                                    variant='body1'
                                    paragraph
                                >
                                    {data.posts.content}
                                </Typography>
                                <Image
                                src={data.posts.image}
                                onClick={() => console.log('onClick')}
                                aspectRatio={(16 / 9)}
                                disableSpinner
                            />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper
                                    elevation={0}
                                    className={classes.sidebar}>
                                    <Typography
                                        variant='h6'
                                        gutterBottom
                                        className={classes.header}
                                    >
                                        О чем статья?
                                </Typography>
                                    <Typography
                                        variant='body2'
                                        paragraph
                                    >
                                        {data.posts.excerpt}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
