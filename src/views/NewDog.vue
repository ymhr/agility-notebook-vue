<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12>
        <h1>{{title}}</h1>
        <Form :dog="dog" @saved="handleSubmission" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Form from '@/components/dogs/Form.vue';

export default {
	components: { Form },
	computed: {
		dogId() {
			return this.$route.params.id;
		},
		dog() {
			return this.$store.getters['dogs/byId'](this.dogId);
		},
		title() {
			return this.dog ? 'Edit' : 'New';
		}
	},
	async mounted() {
		await this.$store.dispatch('dogs/loadDogs');
	},
	methods: {
		async handleSubmission(dog) {
			if (this.dog) {
				this.$store.dispatch('dogs/update', dog);
			} else {
				const newDog = await this.$store.dispatch('dogs/create', dog);
				if (newDog) {
					this.$router.push({ name: 'editDog', params: { showId: newDog.id } });
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
