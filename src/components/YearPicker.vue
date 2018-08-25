<template>
	<div class="year-picker">
		<v-menu bottom left>
			<div class="active" slot="activator">
				{{value}}
			</div>

			<v-list>
				<v-list-tile v-for="year in sortedYears" :key="year">
					<v-list-tile-title @click="changeYear(year)">{{year}}</v-list-tile-title>
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
		value: {
			type: String
		}
	},
	data() {
		return {
			menuOpen: false
		};
	},
	computed: {
		sortedYears() {
			// eslint-disable-next-line
			return [...this.years].sort().reverse();
		}
	},
	methods: {
		changeYear(year) {
			this.$emit('input', year);
		}
	}
};
</script>

<style lang="scss" scoped>
	.active {
		background-color: #eee;
		border: 3px solid black;
		padding: 10px;
		margin-bottom: 20px;
	}
</style>
