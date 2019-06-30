import Vue from 'vue';
import { parse, format, compareAsc } from 'date-fns';
import { post, get } from '@/api';

const state = {
	items: []
};

const mutations = {
	SET_LOADING(state, value) {
		state.loading = value;
	},
	UPSERT_RUN(state, run) {
		const runIndex = state.items.find(r => r.id === run.id);

		if (runIndex > -1) {
			Vue.set(state.items, runIndex, run);
		} else {
			state.items.push(run);
		}
	}
};

const actions = {
	loading({ commit }, mode) {
		commit('SET_LOADING', mode);
	},
	upsert({ commit }, runs) {
		if (!Array.isArray(runs)) {
			runs = [runs];
		}
		runs.forEach(run => commit('UPSERT_RUN', run));
	},
	async create({ dispatch }, run) {
		dispatch('loading', true);
		const { data } = await post(`shows/${run.showId}/runs`, run);
		dispatch('upsert', data);
		dispatch('loading', false);
	},
	async update({ dispatch }, { runId, data }) {
		dispatch('loading', true);
		try {
			await post(`shows/${data.showId}/runs/${runId}`, data);
		} catch (e) {
			console.error('Error saving run', e);
		}
		dispatch('upsert', data);
		dispatch('loading', false);
	},
	async load({ dispatch, getters, state }, { showId, runId }) {
		if (!getters.byId(runId) && !state.loading) {
			dispatch('loading', true);
			try {
				const { data } = await get(`shows/${showId}/runs/${runId}`);
				dispatch('upsert', data);
			} catch (e) {
				console.error('Error fetching run', e);
			}
		}
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.find(run => parseInt(run.id, 10) === parseInt(id, 10)),
	byShow: (state, getters) => id => getters.all.filter(
		run => parseInt(run.showId, 10) === parseInt(id, 10)
	),
	byShowByDate: (state, getters) => (id) => {
		const runs = getters.byShow(id);
		const days = runs.reduce((runs, run) => {
			const date = format(parse(run.date), 'Do MMMM');

			if (!runs[date]) runs[date] = [];

			runs[date].push(run);

			return runs;
		}, {});

		const orderedDays = Object.keys(days)
			.sort((a, b) => {
				a = parse(a);
				b = parse(b);
				return compareAsc(a, b);
			})
			.reduce((allDays, day) => {
				allDays[day] = days[day];
				return allDays;
			}, {});

		return orderedDays;
	},
	byShowByDateByDog: (state, getters) => (id) => {
		const days = getters.byShowByDate(id);
		return Object.entries(days).reduce((days, [date, runs]) => {
			const runsByDog = runs.reduce((dogs, run) => {
				if (!dogs[run.dogId]) dogs[run.dogId] = [];

				dogs[run.dogId].push(run);

				return dogs;
			}, {});

			days[date] = runsByDog;

			return days;
		}, {});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
