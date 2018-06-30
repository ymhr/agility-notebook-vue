import Vue from 'vue';

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
	upsert({ commit }, runs) {
		runs.forEach(run => commit('UPSERT_RUN', run));
	}
};

const getters = {
	all: state => state.items,
	byId: (state, getters) => id => getters.all.filter(run => run.id === id),
	byShow: (state, getters) => id => getters.all.filter(run => run.showId === id)
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
