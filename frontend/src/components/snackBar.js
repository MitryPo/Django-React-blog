import React, { useState, useEffect } from 'react'
import { makeStyles, Snackbar, Typography, Grid, Button, Container, TextField } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

export default function SnackBar({open, message, severity}) {
   
    return (
        <div>
            <Snackbar 
			open={open} 
			autoHideDuration={6000} 
			>
				<MuiAlert
					severity={severity}
					variant='filled'
				> {message}
				</MuiAlert>
			</Snackbar>
        </div>
    )
}
