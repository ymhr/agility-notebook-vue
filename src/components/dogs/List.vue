<template>
  <v-layout row>
    <v-flex xs12>
      <Item v-for="dog in dogs" :key="dog.id" :dog="dog">{{dog.name}}</Item>
    </v-flex>
  </v-layout>
</template>

<script>
import Item from '@/components/dogs/ListItem.vue';

export default {
	components: { Item },
	computed: {
		dogs() {
			return this.$store.getters['dogs/all'];
		}
	}
};
</script>

<style>
</style>
