import React from 'react'
import { Grid, Container, Typography, CircularProgress } from '@material-ui/core'


export default function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />
        return (
            <Container style={{paddingTop: '3em', textAlign: 'center'}}>
                <CircularProgress />
            </Container>
        )
    }
}
