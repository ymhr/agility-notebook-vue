import Vue from 'vue';
import { parse, format, compareAsc } from 'date-fns';
import { get } from '@/api';

const state = {
	items: [],
	loading: true
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
	byId: (state, getters) => id => getters.all.find(show => parseInt(show.id, 10) === parseInt(id, 10)),
	loading: state => state.loading,
	groupShowsByYear: (state, getters) => {
		const shows = getters.all;
		const years = shows.reduce((years, show) => {
			const year = format(parse(show.startDate), 'YYYY');

			if (!years[year]) years[year] = [];

			years[year].push(show);

			years[year].sort((a, b) => {
				const aDate = parse(a.startDate);
				const bDate = parse(b.startDate);
				return compareAsc(aDate, bDate);
			});

			return years;
		}, {});

		return years;
	},
	getShowsForYear: (state, getters) => (year) => {
		return getters.groupShowsByYear[year];
	},
	getYears: (state, getters) => {
		return Object.keys(getters.groupShowsByYear);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
