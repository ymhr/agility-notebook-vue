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
	SET_HANDLERS(state, handlers) {
		Vue.set(state, 'items', handlers);
	},
	SET_HANDLER(state, handler) {
		const current = state.items.findIndex(item => item.id === handler.id);

		if (current > -1) {
			Vue.set(state.items, current, handler);
		} else {
			state.items.push(handler);
		}
	}
};

const actions = {
	setLoading({ commit }, value) {
		commit('SET_LOADING', value);
	},
	setHandlers({ commit }, handlers) {
		commit('SET_HANDLERS', handlers);
	},
	setHandler({ commit }, handler) {
		commit('SET_HANDLER', handler);
	},
	async loadHandlers({ dispatch, getters }) {
		if (getters.all.length) return;

		dispatch('setLoading', true);
		const { data: handlers } = await get('handlers');

		dispatch('setHandlers', handlers);
		dispatch('setLoading', false);
	},
	async update({ dispatch }, handler) {
		if (!handler.id) throw new Error('ID required');

		dispatch('setLoading', true);

		try {
			await post(`handlers/${handler.id}`, handler);
			await dispatch('loadHandler', { id: handler.id, force: true });
			return true;
		} catch (e) {
			// eslint-disable-next-line
			console.warn(e);
			return false;
		} finally {
			dispatch('setLoading', false);
		}
	},
	async create({ dispatch }, handler) {
		if (handler.id) throw new Error('This should be a new handler, no ID should be present');

		try {
			dispatch('setLoading', true);
			const { data } = await post('/handlers', handler);
			const { data: newHandler } = data;
			dispatch('setHandler', newHandler);
			return newHandler;
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
	byId: (state, getters) => id => getters.all.find(handler => parseInt(handler.id, 10) === parseInt(id, 10)),
	loading: state => state.loading
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
