import React from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';


export default function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />
        return (
            <Container>
                <Skeleton variant="rect" width="100%">
                    <div style={{ paddingTop: '55%' }} />
                </Skeleton>
                <Skeleton width="100%">
                    <Typography>.</Typography>
                </Skeleton>
                <Skeleton width="100%">
                    <Typography>.</Typography>
                </Skeleton>
                <Grid container
                    spacing={3}
                    direction='row'
                    justify='flex-start'
                    alignItems='flex-start'
                >
                    <Grid item xs>
                        <Skeleton variant="rect" width="100%">
                            <div style={{ paddingTop: '55%' }} />
                        </Skeleton>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Grid>
                    <Grid item xs>
                        <Skeleton variant="rect" width="100%">
                            <div style={{ paddingTop: '55%' }} />
                        </Skeleton>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
