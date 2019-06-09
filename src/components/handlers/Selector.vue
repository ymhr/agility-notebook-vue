<template>
  <v-layout row>
    <v-flex xs10>
      <v-select
        label="Handler"
        prepend-icon="person"
        :items="handlers"
        item-text="name"
        item-value="id"
        :clearable="true"
        :value="value"
        @input="selected"
      />
    </v-flex>
    <v-flex xs2>
      <v-btn outline>Edit handlers</v-btn>
    </v-flex>
  </v-layout>
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
		handlers() {
			return this.$store.getters['handlers/all'];
		}
	},
	mounted() {
		this.$store.dispatch('handlers/loadHandlers');
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
