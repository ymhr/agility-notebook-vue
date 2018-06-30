const state = {
	token: null
};

const mutations = {
	SET_TOKEN(store, token) {
		store.token = token;
	}
};

const actions = {};

const getters = {};

export default {
	namespace: true,
	state,
	mutations,
	actions,
	getters
};
