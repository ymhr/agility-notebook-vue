<template>
	<div v-if="loading || !show">Loading...</div>
	<div class="show" v-else>
		<header>
			<v-speed-dial
				class="controls"
			>
				<v-btn
					slot="activator"
					fab
					dark
					color="orange"
				>
					<v-icon>add</v-icon>
				</v-btn>
				<v-btn
					:to="{ name: 'editShow', params: { showId: this.show.id } }"
					small
					fab
				>
					<v-icon>edit</v-icon>
				</v-btn>
				<v-btn
					:to="{ name: 'newRun', params: { showId: this.show.id } }"
					small
					fab
				>
					<v-icon>directions_run</v-icon>
				</v-btn>
			</v-speed-dial>
			<h1>
				{{show.name}}
			</h1>
			<Details :showId="this.id"/>
		</header>
		<v-flex>
			<v-container grid-list-sm fluid>
				<v-layout row wrap>
					<v-flex xs12>
						<ExpandPanel v-for="(dogs, day) in runDays" :key="day">
							<Separator slot="activator">{{day}}</Separator>
							<ExpandPanel v-for="(runs, dog) in dogs" :key="dog">
								<Separator slot="activator">{{dog}}</Separator>
								<v-flex xs12 sm6 md4 v-for="run in runs" :key="run.id">
									<Run :run="run" />
								</v-flex>
							</ExpandPanel>
						</ExpandPanel>
					</v-flex>
				</v-layout>
			</v-container>
		</v-flex>
	</div>
</template>

<script>
import Run from '@/components/runs/RunItem.vue';
import Details from '@/components/show/Details.vue';
import ExpandPanel from '@/components/ExpandPanel.vue';
import Separator from '@/components/Separator.vue';

export default {
	components: {
		Run,
		Details,
		ExpandPanel,
		Separator
	},
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
		runDays() {
			return this.$store.getters['runs/byShowByDateByDog'](this.id);
		}
	},
	mounted() {
		this.$store.dispatch('shows/loadShows', this.id);
	}
};
</script>

<style lang="scss" scoped>
	.controls {
		position: absolute;
		bottom: calc(0% - 20px);
		right: 0;
	}
	header {
		background-color: #eee;
		position: relative;
		padding: 20px;
	}

	.show /deep/ .sep {
		cursor: pointer;

		&:hover {
			background-color: #eee;
		}
	}
</style>
