<template>
	<div class="shows">
		<ShowItem v-for="show in shows" :key="show.id" :show="show" />
	</div>
</template>

<script>
import ShowItem from '@/components/show/ListItem.vue';

export default {
	name: 'home',
	components: { ShowItem },
	mounted() {
		this.$store.dispatch('shows/loadShows');
	},
	computed: {
		shows() {
			return this.$store.getters['shows/all'];
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
