<template>
  <v-layout row>
    <v-flex xs11>
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
    <v-flex xs1>
      <v-btn small outline fab color="grey">
        <v-icon>edit</v-icon>
      </v-btn>
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
