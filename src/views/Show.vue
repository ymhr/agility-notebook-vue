<template>
  <div v-if="loading || !show">Loading...</div>
  <div class="show" v-else>
    <header>
      <v-speed-dial class="controls">
        <v-btn slot="activator" fab dark color="secondary">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'editShow', params: { showId: this.show.id } }" small fab>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'newRun', params: { showId: this.show.id } }" small fab>
          <v-icon>directions_run</v-icon>
        </v-btn>
      </v-speed-dial>
      <h1>{{show.name}}</h1>
      <Details :showId="this.id" />
    </header>
    <v-flex>
      <v-container grid-list-lg fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <ExpandPanel v-for="(dogs, day) in runDays" :key="day">
              <template #activator="{open, icon}">
                <Separator>
                  {{day}}
                  <v-icon>{{icon}}</v-icon>
                </Separator>
              </template>
              <ExpandPanel v-for="(runs, dogId) in dogs" :key="dogId">
                <template #activator="{open, icon}">
                  <Separator>
                    {{dogName(dogId)}}
                    <v-icon>{{icon}}</v-icon>
                  </Separator>
                </template>
                <v-layout row wrap>
                  <Run :run="run" v-for="run in runs" :key="run.id" />
                </v-layout>
              </ExpandPanel>
            </ExpandPanel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import Run from '@/components/runs/RunItem.vue';
import Details from '@/components/show/Details.vue';
import ExpandPanel from '@/components/ExpandPanel.vue';
import Separator from '@/components/Separator.vue';

export default {
	components: {
		Run,
		Details,
		ExpandPanel,
		Separator
	},
	computed: {
		id() {
			return this.$route.params.showId;
		},
		show() {
			return this.$store.getters['shows/byId'](this.id);
		},
		loading() {
			return this.$store.getters['shows/loading'];
		},
		runDays() {
			return this.$store.getters['runs/byShowByDateByDog'](this.id);
		}
	},
	mounted() {
		this.$store.dispatch('shows/loadShows', this.id);
		this.$store.dispatch('dogs/loadDogs');
		this.$store.dispatch('handlers/loadHandlers');
	},
	methods: {
		dog(id) {
			return this.$store.getters['dogs/byId'](id);
		},
		dogName(id) {
			const dog = this.dog(id);

			if (dog) return dog.name;

			return 'Unknown';
		}
	}
};
</script>

<style lang="scss" scoped>
  .controls {
    position: absolute;
    bottom: calc(0% - 20px);
    right: 0;
  }
  header {
    background-color: #eee;
    position: relative;
    padding: 20px;
  }

  .show /deep/ .sep {
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
</style>
