<template>
  <v-container fluid fill-height>
    <v-btn fab dark fixed bottom right color="orange" :to="{name: 'newDog'}">
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout row>
      <v-flex xs12>
        <List />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import List from '@/components/dogs/List.vue';

export default {
	components: { List },
	mounted() {
		this.$store.dispatch('dogs/loadDogs');
	}
};
</script>

<style lang="scss" scoped>
</style>
