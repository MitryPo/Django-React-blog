import {useEffect} from 'react'
import axiosInstance from '../Admin/axios'
import {useHistory} from 'react-router-dom'


export default function LogOut() {
    const history = useHistory()

    useEffect(() => {
        axiosInstance.post('auth/token/logout/', {
            refresh_token: localStorage.getItem('access_token')
    })
    localStorage.removeItem('access_token')
    axiosInstance.defaults.headers['Authorization'] = null
    history.push('/')
    })
    return <div>Logout</div>
}
