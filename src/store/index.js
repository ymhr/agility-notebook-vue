import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/auth';
import shows from '@/store/shows';
import runs from '@/store/runs';
import dogs from '@/store/dogs';
import handlers from '@/store/handlers';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		shows,
		runs,
		dogs,
		handlers
	}
});
