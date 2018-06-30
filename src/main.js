// import '@babel/polyfill'
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import './plugins/vuetify';

Vue.config.productionTip = false;

// Check for the users token
const token = localStorage.getItem('token');

if (token) {
	store.dispatch('auth/setToken', token);
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
