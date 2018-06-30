import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			name: 'home',
			component: Home
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.query.token) {
		store.dispatch('auth/setToken', to.query.token);
		return next('/');
	}

	const token = store.getters['auth/token'];

	if (to.name !== 'login' && !token) {
		return next({ name: 'login' });
	}

	return next();
});

export default router;
