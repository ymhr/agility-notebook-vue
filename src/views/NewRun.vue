<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12>
        <h1>{{title}}</h1>
        <Form @saved="save" :run="run"/>
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
		run() {
			return this.$store.getters['runs/byId'](this.runId);
		},
		title() {
			return this.run ? 'Edit' : 'New';
		}
	},
	methods: {
		save(data) {
			if (!this.run) {
				console.log('create', data);
				this.$store.dispatch('runs/create', data);
			} else {
				console.log('update', data);
			}
		}
	}
};
</script>

<style>
</style>
