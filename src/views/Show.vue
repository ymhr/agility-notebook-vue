<template>
	<div v-if="loading || !show">Loading...</div>
	<v-flex v-else>
		<h1>{{show.name}}</h1>
		<v-container grid-list-sm fluid>
			<v-layout row wrap>
				<v-flex v-for="run in runs" :key="run.id" xs4>
					<Run :run="run" />
				</v-flex>
			</v-layout>
		</v-container>
	</v-flex>
</template>

<script>
import Run from '@/components/runs/RunItem.vue';

export default {
	components: { Run },
	computed: {
		id() {
			return this.$route.params.showId;
		},
		show() {
			return this.$store.getters['shows/byId'](this.id);
		},
		loading() {
			return this.$store.getters['shows/loading'];
		},
		runs() {
			return this.$store.getters['runs/byShow'](this.id);
		}
	},
	mounted() {
		this.$store.dispatch('shows/loadShows', this.id);
	}
};
</script>

<style lang="css" scoped>

</style>
