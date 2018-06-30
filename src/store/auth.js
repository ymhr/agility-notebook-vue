const state = {
	token: null
};

const mutations = {
	SET_TOKEN(store, token) {
		store.token = token;
	}
};

const actions = {
	setToken({ commit }, token) {
		localStorage.setItem('token', token);
		commit('SET_TOKEN', token);
	}
};

const getters = {
	token: state => state.token
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
