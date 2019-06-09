import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
	theme: {
		primary: colors.orange.lighten1,
		secondary: colors.deepOrange.base,
		accent: colors.blue.base,
		error: colors.red.base,
		warning: colors.amber.base,
		info: colors.blueGrey.base,
		success: colors.green.base
	}
});
