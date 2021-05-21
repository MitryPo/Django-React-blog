import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Grid, Link } from '@material-ui/core'

export const Social = () => {
    return (
        <Grid container direction='row' justify='space-around' alignItems='flex-start'>
            <Grid item>
                <Link href='https://ru-ru.facebook.com/'><FacebookIcon fontSize='large' /></Link>
            </Grid>
            <Grid item>
                <Link href='https://www.instagram.com/?hl=ru'><InstagramIcon fontSize='large' /></Link>
            </Grid>
            <Grid item>
                <Link href='https://twitter.com/'><TwitterIcon fontSize='large' /></Link>
            </Grid>
            <Grid item>
                <Link href='https://www.pinterest.ru/'><PinterestIcon fontSize='large' /></Link>
            </Grid>
        </Grid>
    )
}
