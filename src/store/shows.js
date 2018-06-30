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
	}
};

const actions = {
	setLoading({ commit }, value) {
		commit('SET_LOADING', value);
	},
	setShows({ commit }, shows) {
		commit('SET_SHOWS', shows);
	},
	async loadShows({ dispatch }) {
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
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.filter(show => show.id === id)
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
