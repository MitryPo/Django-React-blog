import {useEffect} from 'react'
import {axiosInstance} from '../Admin/axios'


export default function LogOut() {

    useEffect(() => {
        axiosInstance.post('/auth/token/logout/', {
            auth_token: localStorage.getItem('access_token')
    })
    localStorage.removeItem('access_token')
    axiosInstance.defaults.headers['Authorization'] = null
    window.location.replace('/')
    })
    return <div>Logout</div>
}
