import Vue from 'vue';
import { get, post } from '@/api';

const state = {
	items: [],
	loading: true
};

const mutations = {
	SET_LOADING(state, value) {
		state.loading = value;
	},
	SET_DOGS(state, dogs) {
		Vue.set(state, 'items', dogs);
	},
	SET_DOG(state, dog) {
		const current = state.items.findIndex(item => item.id === dog.id);

		if (current > -1) {
			Vue.set(state.items, current, dog);
		} else {
			state.items.push(dog);
		}
	}
};

const actions = {
	setLoading({ commit }, value) {
		commit('SET_LOADING', value);
	},
	setDogs({ commit }, dogs) {
		commit('SET_DOGS', dogs);
	},
	setDog({ commit }, dog) {
		commit('SET_DOG', dog);
	},
	async loadDogs({ dispatch, getters }) {
		if (getters.all.length) return;

		dispatch('setLoading', true);
		const { data: dogs } = await get('dogs');

		dispatch('setDogs', dogs);
		dispatch('setLoading', false);
	},
	async loadDog({ dispatch, getters }, { id, force = false }) {
		const current = getters.byId(id);

		if (current && !force) return;

		dispatch('setLoading', true);
		const { data: dog } = await get(`dogs/${id}`);

		dispatch('setDog', dog);
		dispatch('setLoading', false);
	},
	async update({ dispatch }, dog) {
		if (!dog.id) throw new Error('ID required');

		dispatch('setLoading', true);

		try {
			await post(`dogs/${dog.id}`, dog);
			await dispatch('loadDog', { id: dog.id, force: true });
			return true;
		} catch (e) {
			// eslint-disable-next-line
			console.warn(e);
			return false;
		} finally {
			dispatch('setLoading', false);
		}
	},
	async create({ dispatch }, dog) {
		if (dog.id) {
			throw new Error(
				'This should be a new dog, no ID should be present'
			);
		}

		try {
			dispatch('setLoading', true);
			const { data } = await post('/dogs', dog);
			const { data: newDog } = data;
			dispatch('setDog', newDog);
			return newDog;
		} catch (e) {
			// eslint-disable-next-line
			console.warn(e);
			return false;
		} finally {
			dispatch('setLoading', false);
		}
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.find(dog => parseInt(dog.id, 10) === parseInt(id, 10)),
	loading: state => state.loading
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
