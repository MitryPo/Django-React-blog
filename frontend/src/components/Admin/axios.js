import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8000/api';


const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: 'Token ' + localStorage.getItem('access_token'),
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	// function (error) {

	// 	if (typeof error.response === 'undefined') {
	// 		alert(
	// 			'Произошла ошибка.' +
	// 			' Проверьте соединение с интернетом или повторите запрос позже. '
	// 		);
	// 	}
	// 	else{
	// 		window.location.replace('login/');
	// 	}
	// }
);
export default axiosInstance;