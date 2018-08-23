<template>
	<div class="year-picker">
		<v-menu bottom left>
			<div class="active" slot="activator">
				{{active}}
			</div>

			<v-list>
				<v-list-tile v-for="year in years" :key="year">
					<v-list-tile-title>{{year}}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	props: {
		years: {
			type: Array,
			required: true
		},
		active: {
			type: String
		}
	},
	data() {
		return {
			menuOpen: false
		};
	}
};
</script>

<style>

</style>
