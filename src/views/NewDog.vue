<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12>
        <h1>New</h1>
        <Form @saved="createNewShow" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Form from '@/components/show/Form.vue';

export default {
	components: { Form },
	methods: {
		async createNewShow(show) {
			const newShow = await this.$store.dispatch('shows/create', show);
			this.$router.push({ name: 'show', params: { showId: newShow.id } });
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
