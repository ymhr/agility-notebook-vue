<template>
  <v-app>
	<div id="app">
		<v-navigation-drawer
			:clipped="$vuetify.breakpoint.mdAndUp"
			v-model="navOpen"
			fixed
			app
		>
			<v-list>
				<v-list-tile>
					<v-list-tile-content>Shows</v-list-tile-content>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-content>Dogs</v-list-tile-content>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-content>Settings</v-list-tile-content>
				</v-list-tile>
			</v-list>

		</v-navigation-drawer>

		<v-toolbar
			:clipped-left="$vuetify.breakpoint.mdAndUp"
			dark
			fixed
			app
		>
			<v-toolbar-side-icon @click.stop="toggleNav"></v-toolbar-side-icon>
			<v-toolbar-title>Agility Notebook</v-toolbar-title>
		</v-toolbar>

		<v-content>
			<v-container fluid fill-height>
				<v-layout>
					<router-view/>
				</v-layout>
			</v-container>
		</v-content>

	</div>
  </v-app>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';

export default {
	components: { Navigation },
	data() {
		return {
			navOpen: this.$vuetify.breakpoint.mdAndUp
		};
	},
	methods: {
		toggleNav() {
			this.navOpen = !this.navOpen;
		}
	}
};
</script>


<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
