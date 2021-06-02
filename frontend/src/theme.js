import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, grey, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({

    typography: {
        // subtitle1: {
        //     fontSize: 12,
        // },
        // body1: {
        //     fontWeight: 500,
        // },
    },
    palette: {
        primary: {
            main: grey[700],
        },
        secondary: {
            main: red['A700'],
        }
    },
});
