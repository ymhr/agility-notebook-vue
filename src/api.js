import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.agilitynotebook.com/'
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

const get = (url, params) => instance.get(url, params);
const post = (url, params) => instance.post(url, params);

export { instance, get, post };
