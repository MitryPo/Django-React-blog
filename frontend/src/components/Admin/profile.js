import React, { useState, useEffect } from 'react'
import { makeStyles, Snackbar, Avatar, Typography, Grid, Button, Container, TextField } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import axiosInstance from './axios';
import Header from '../header'
import Footer from '../footer'
import { useParams } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


export default function Profile() {

  const initialFormData = Object.freeze({
    username: '',
    email: '',
  });

  const { slug } = useParams()
  const classes = useStyles()
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
    severity: ''
  })
  const [formData, updateFormData] = useState(initialFormData);

  const handleClose = () => {
    setSnackBar({ open: false })
  }

  useEffect(() => {
    axiosInstance.get(`user/account/`)
      .then((res) => {
        updateFormData({
          ...formData,
          ['username']: res.data.user_name,
          ['email']: res.data.email,
        })
        console.log(res.data)
      })
  }, [updateFormData, slug])

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axiosInstance
      .patch(`user/account/`, {
        user_name: formData.username.trim(),
        email: formData.email.trim(),
      })
      .then(() => {
        setSnackBar({
          open: true,
          message: 'Сохранено успешно',
          severity: 'success'
        })
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: `Ошибка при отправкe данных. ${err}`,
          severity: 'error'
        })
      })
  };

  return (
    <div>
      <Header />
      <Container maxWidth='xs'>
        <Snackbar
          open={snackBar.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity={snackBar.severity}
            variant='filled'
          > {snackBar.message}
          </MuiAlert>
        </Snackbar>

        <div className={classes.paper}>
          <Avatar />
          <Typography component="h1" variant="h5">
            Личные данные
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              value={formData.username}
              helperText='Имя пользователя'
              name="username"
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              helperText='Email адрес'
              name="email"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              className={classes.submit}
              disableElevation
            >
              Сохранить
          </Button>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
