const state = {
	token: null
};

const mutations = {
	SET_TOKEN(store, token) {
		store.token = token;
	}
};

const actions = {
	setToken({ dispatch }, token) {
		dispatch('SET_TOKEN', token);
	}
};

const getters = {
	token: state => state.token
};

export default {
	namespace: true,
	state,
	mutations,
	actions,
	getters
};
