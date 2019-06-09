<template>
  <v-select
    label="Dog"
    prepend-icon="pets"
    :items="dogs"
    item-text="label"
    item-value="id"
    :value="value"
    @input="selected"
  >
    <template slot="item" slot-scope="{ parent, item, tile }">
      <strong>{{item.name}}</strong>&nbsp;
      <em>(Grade: {{item.grade}})</em>
    </template>

    <template slot="selection" slot-scope="{ item }">{{item.name}}</template>
  </v-select>
</template>

<script>
export default {
	props: {
		value: {
			type: [String, Number],
			default: null
		}
	},
	computed: {
		dogs() {
			return this.$store.getters['dogs/all'];
		}
	},
	mounted() {
		this.$store.dispatch('dogs/loadDogs');
	},
	methods: {
		selected(e) {
			this.$emit('input', e);
		}
	}
};
</script>

<style>
</style>
