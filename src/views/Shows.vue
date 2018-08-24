<template>
	<v-container fill-height fluid v-if="!loading">
		<v-layout row>
			<v-flex xs12>
				<YearPicker v-if="years.length" :years="years" v-model="activeYear" />
				<ShowList :months="shows"/>
			</v-flex>
			<v-btn
				color="blue"
				dark
				large
				fixed
				bottom
				right
				fab
				>
				<v-icon>add</v-icon>
			</v-btn>
		</v-layout>
	</v-container>
</template>

<script>
import ShowList from '@/components/show/list/ShowList.vue';
import YearPicker from '@/components/YearPicker.vue';

export default {
	name: 'home',
	components: { ShowList, YearPicker },
	data() {
		return {
			activeYear: null
		};
	},
	computed: {
		shows() {
			return this.$store.getters['shows/getShowsForYear'](this.activeYear);
		},
		years() {
			return this.$store.getters['shows/getYears'];
		},
		loading() {
			return this.$store.getters['shows/loading'] || !this.shows;
		}
	},
	async mounted() {
		await this.$store.dispatch('shows/loadShows');
		this.activeYear = this.years[this.years.length - 1];
	},
	methods: {
		changeYear(year) {
			this.activeYear = year;
		}
	}
};
</script>

<style lang="scss" scoped>
	.year {
		display: inline-block;
		padding: 10px;
		background-color: #eee;
		margin: 5px 5px 10px 5px;
		cursor: pointer;

		&:first-child {
			margin-left: 0;
		}

		&.active {
			outline: 3px solid black;
		}
	}
</style>
