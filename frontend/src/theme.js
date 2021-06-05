import { createMuiTheme } from '@material-ui/core/styles'
import { grey, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({

    palette: {
        primary: {
            main: grey[700],
        },
        secondary: {
            main: red['A700'],
        }
    },
});
