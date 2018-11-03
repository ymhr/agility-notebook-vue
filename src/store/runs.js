import Vue from 'vue';
import { parse, format, compareAsc } from 'date-fns';
import { post } from '@/api';

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
		runs.forEach(run => commit('UPSERT_RUN', run));
	},
	async create({ dispatch }, run) {
		dispatch('loading', true);
		const { data } = await post(`shows/${run.showId}/runs`, run);
		dispatch('upsert', data);
		dispatch('loading', false);
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.find(run => run.id === id),
	byShow: (state, getters) => id => getters.all.filter(run => parseInt(run.showId, 10) === parseInt(id, 10)),
	byShowByDate: (state, getters) => (id) => {
		const runs = getters.byShow(id);
		const days = runs.reduce((runs, run) => {
			const date = format(parse(run.date), 'Do MMMM');

			if (!runs[date]) runs[date] = [];

			runs[date].push(run);

			return runs;
		}, {});

		const orderedDays = Object.keys(days).sort((a, b) => {
			a = parse(a);
			b = parse(b);
			return compareAsc(a, b);
		})
			.reverse() // sorting asc/desc no difference, reverse???
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
