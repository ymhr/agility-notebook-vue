<template>
	<v-navigation-drawer permanent>
		<v-toolbar flat>
			<v-list>
				<v-list-tile-title>
					Agility Notebook
				</v-list-tile-title>
			</v-list>
		</v-toolbar>

		<v-divider />

		<v-list dense>
			<v-list-tile>...</v-list-tile>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {

};
</script>


<style lang="scss" scoped>
	nav ul {
		padding: 0;
		margin: 0;
		list-style: none;
		width: 100%;
		background-color: #ccc;

		li {
			display: inline-block;
			padding: 10px;
		}
	}
</style>
