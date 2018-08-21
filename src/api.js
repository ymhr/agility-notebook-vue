import axios from 'axios';
import store from '@/store/index';

const instance = axios.create({
	baseURL: 'https://api.agilitynotebook.com/'
});

instance.interceptors.request.use((config) => {
	const token = store.getters['auth/token'];
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

const get = (url, params) => instance.get(url, params);
const post = (url, params) => instance.post(url, params);

export {
	instance,
	get,
	post
};
