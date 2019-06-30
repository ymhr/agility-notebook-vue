<template>
  <v-app>
    <div id="app">
      <v-navigation-drawer :clipped="$vuetify.breakpoint.mdAndUp" v-model="navOpen" fixed app>
        <v-list>
          <v-list-tile :to="{ name: 'home' }">
            <v-list-tile-content>
              <v-list-tile-title>Shows</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ name: 'dogs' }">
            <v-list-tile-content>Dogs</v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{ name: 'settings' }">
            <v-list-tile-content>Settings</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar :clipped-left="$vuetify.breakpoint.mdAndUp" color="primary" dark fixed app flat>
        <v-toolbar-side-icon @click.stop="toggleNav"></v-toolbar-side-icon>

        <v-toolbar-title>Agility Notebook</v-toolbar-title>
      </v-toolbar>

      <v-content>
        <router-view class="router-view" />
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
			navOpen: false
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
    font-family: "Avenir", Helvetica, Arial, sans-serif;
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
