<template>
	<v-container fluid fill-height>
		<v-layout row>
			<v-flex xs12>
				<h1>Edit</h1>
				<Form @saved="updateShow" :show="show"/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import Form from '@/components/show/Form.vue';

export default {
	components: { Form },
	computed: {
		showId() {
			return this.$route.params.showId;
		},
		show() {
			return this.$store.getters['shows/byId'](this.showId);
		}
	},
	mounted() {
		this.$store.dispatch('shows/loadShows');
	},
	methods: {
		async updateShow(show) {
			await this.$store.dispatch('shows/update', show);
			this.$router.push({ name: 'show', params: { showId: show.id } });
		}
	}
};
</script>

<style>

</style>
