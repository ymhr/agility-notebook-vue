import Vue from 'vue';
import {
	parse, format, compareAsc, isAfter
} from 'date-fns';
import { get, post } from '@/api';

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

		if (current > -1) {
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
	async loadShow({ dispatch, getters }, { id, force = false }) {
		const current = getters.byId(id);

		if (current && !force) return;

		dispatch('setLoading', true);
		const { data: show } = await get(`shows/${id}`);

		dispatch('runs/upsert', show.runs, { root: true });
		show.runs = show.runs.map(run => run.id);

		dispatch('setShow', show);
		dispatch('setLoading', false);
	},
	async update({ dispatch }, show) {
		if (!show.id) throw new Error('ID required');

		dispatch('setLoading', true);

		try {
			await post(`shows/${show.id}`, show);
			await dispatch('loadShow', { id: show.id, force: true });
			return true;
		} catch (e) {
			// eslint-disable-next-line
			console.warn(e);
			return false;
		} finally {
			dispatch('setLoading', false);
		}
	},
	async create({ dispatch }, show) {
		if (show.id) throw new Error('This should be a new show, no ID should be present');

		try {
			dispatch('setLoading', true);
			const { data } = await post('/shows', show);
			const { data: newShow } = data;
			dispatch('setShow', newShow);
			return newShow;
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
	byId: (state, getters) => id => getters.all.find(show => parseInt(show.id, 10) === parseInt(id, 10)),
	loading: state => state.loading,
	groupShowsByYear: (state, getters) => {
		const shows = getters.all;
		let years = shows.reduce((years, show) => {
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

		years = Object.entries(years).reduce((years, [year, shows]) => {
			const months = shows.reduce((months, show) => {
				const showStartDate = parse(show.startDate);
				const month = format(showStartDate, 'MMMM');

				if (!months[month]) months[month] = [];

				months[month].push(show);

				return months;
			}, {});

			years[year] = months;

			return years;
		}, {});

		return years;
	},
	getShowsForYear: (state, getters) => (year) => {
		return getters.groupShowsByYear[year];
	},
	getYears: (state, getters) => {
		return Object.keys(getters.groupShowsByYear);
	},
	isShowInPast: (state, getters) => (showId) => {
		const show = getters.byId(showId);
		const today = new Date();
		const endDate = parse(show.endDate);
		return isAfter(today, endDate);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
