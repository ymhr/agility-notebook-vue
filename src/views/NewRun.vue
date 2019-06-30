<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12>
        <h1>{{title}}</h1>
        <Form @saved="save" :run="run" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Form from '@/components/runs/Form.vue';

export default {
	components: { Form },
	computed: {
		runId() {
			return this.$route.params.runId;
		},
		showId() {
			return this.$route.params.showId;
		},
		run() {
			return this.$store.getters['runs/byId'](this.runId);
		},
		title() {
			return this.run ? 'Edit' : 'New';
		}
	},
	async mounted() {
		await this.$store.dispatch('runs/load', { runId: this.runId, showId: this.showId });
	},
	methods: {
		save(data) {
			if (!this.run) {
				console.log('create', data);
				this.$store.dispatch('runs/create', data);
			} else {
				console.log('update', data);
				this.$store.dispatch('runs/update', { runId: this.runId, data });
			}
		}
	}
};
</script>

<style>
</style>
