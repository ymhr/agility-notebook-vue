import Vue from 'vue';
import { get } from '@/api';

const state = {
	items: [],
	loading: false
};

const mutations = {
	SET_LOADING(state, value) {
		state.loading = value;
	},
	SET_SHOWS(state, shows) {
		Vue.set(state, 'items', shows);
	},
	SET_SHOW(state, show) {
		const current = state.items.findIndex(item => item.id === show.id);

		if (current < -1) {
			Vue.set(state.items, current, show);
		} else {
			state.items.push(show);
		}
	}
};

const actions = {
	setLoading({ commit }, value) {
		commit('SET_LOADING', value);
	},
	setShows({ commit }, shows) {
		commit('SET_SHOWS', shows);
	},
	setShow({ commit }, show) {
		commit('SET_SHOW', show);
	},
	async loadShows({ dispatch, getters }) {
		if (getters.all.length) return;

		dispatch('setLoading', true);
		const { data: shows } = await get('shows');

		shows.map((show) => {
			const { runs } = show;
			dispatch('runs/upsert', runs, { root: true });
			show.runs = runs.map(run => run.id);
			return show;
		});

		dispatch('setShows', shows);
		dispatch('setLoading', false);
	},
	async loadShow({ dispatch, getters }, id) {

		const current = getters.byId(id);

		if (current) return;

		dispatch('setLoading', true);
		const { data: show } = await get(`shows/${id}`);

		dispatch('runs/upsert', show.runs, { root: true });
		show.runs = show.runs.map(run => run.id);

		dispatch('setShow', show);
		dispatch('setLoading', false);
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.find((show) => {
		return parseInt(show.id, 10) === parseInt(id, 10);
	}),
	loading: state => state.loading
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
