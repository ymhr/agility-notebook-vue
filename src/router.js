import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import Shows from '@/views/Shows.vue';
import Login from '@/views/Login.vue';
import Show from '@/views/Show.vue';
import EditShow from '@/views/EditShow.vue';
import NewShow from '@/views/NewShow.vue';
import NewRun from '@/views/NewRun.vue';
import Dogs from '@/views/Dogs.vue';

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
			component: Shows
		},
		{
			path: '/show/new',
			name: 'newShow',
			component: NewShow
		},
		{
			path: '/show/:showId/edit',
			name: 'editShow',
			component: EditShow
		},
		{
			path: '/show/:showId',
			name: 'show',
			component: Show
		},
		{
			path: '/show/:showId/run/new',
			name: 'newRun',
			component: NewRun
		},
		{
			path: '/show/:showId/run/:runId',
			name: 'editRun',
			component: NewRun
		},
		{
			path: '/dogs',
			name: 'dogs',
			component: Dogs
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
