import React from 'react'
import { Container, Typography, makeStyles, Button } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(13),
        textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        fontSize: '150px',
        fontWeight: 800,
        paddingTop: theme.spacing(13),
    },
}))


export const Page404 = () => {
    const classes = useStyles()
    return (
        <Container className={classes.container} maxWidth='md'>
            <Typography variant='h1' className={classes.title}>404</Typography>
            <Typography variant='h2'>Страница не найдена</Typography>
            <Typography variant='subtitle1'>Запрашиваемая вами страница не существует</Typography>
            <Button
                className={classes.button}
                variant='outlined'
                disableElevation
                href='/'
            >Вернуться на главную
                </Button>
        </Container>
    )
}
