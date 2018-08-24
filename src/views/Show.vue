<template>
	<div v-if="loading || !show">Loading...</div>
	<v-flex v-else>
		<div class="controls">
			<v-btn
				:to="{ name: 'editShow', params: { showId: this.show.id } }"
				outline
				small
				fab
			>
				<v-icon>edit</v-icon>
			</v-btn>
		</div>
		<h1>
			{{show.name}}
		</h1>
		<Details :showId="this.id"/>
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
import Details from '@/components/show/Details.vue';

export default {
	components: { Run, Details },
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
	.controls {
		float: right;
	}
</style>
