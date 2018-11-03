<template>
	<v-container fluid fill-height>
		<v-layout row>
			<v-flex xs12>
				<h1>New</h1>
				<Form @saved="save"/>
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
		}
	},
	methods: {
		save(data) {
			if(!this.run) {
				console.log('create', data);
				this.$store.dispatch('runs/create', data);
			} else {
				console.log('update');
			}
		}
	}
};
</script>

<style>

</style>
