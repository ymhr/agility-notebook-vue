<template>
  <v-flex ref="card" md3 v-if="!loading">
    <v-card class="run" hover @click="expand" flat>
      <v-card-title primary-title v-if="title">
        <div>
          <h2 class="title">{{title}}</h2>
          <h3 class="subheading">{{date}}</h3>
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{dog.name}}</div>
          <div>{{handler.name}}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" small flat block :to="{name: 'editRun', params: { runId: id }}">
          <v-icon small>edit</v-icon>Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  <div v-else>Loading...</div>
</template>

<script>
import Rosette from '@/components/Rosette.vue';
import { parse, format } from 'date-fns';

export default {
	components: { Rosette },
	props: {
		run: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			expanded: false
		};
	},
	computed: {
		id() {
			return this.run.id;
		},
		title() {
			return [
				this.run.classNumber ? `Class #${this.run.classNumber}` : null,
				this.run.type,
				this.run.gradeType,
				this.run.grade ? `Grade ${this.run.grade}` : null
			]
				.filter(item => item)
				.join(', ');
		},
		date() {
			return format(parse(this.run.date), 'Do MMMM YYYY');
		},
		dog() {
			const dog = this.$store.getters['dogs/byId'](this.run.dogId);
			if (!dog) return 'Unknown';
			return dog.name;
		},
		handler() {
			if (this.run.handlerOverride) return this.$store.getters['handlers/byId'](this.run.handlerOverride);
			return this.$store.getters['handlers/byId'](this.dog.handlerId) || {};
		},
		loading() {
			return this.$store.getters['dogs/loading'] || this.$store.getters['handlers/loading'];
		}
	},
	methods: {
		expand() {
			this.expanded = !this.expanded;
		}
	}
};
</script>

<style lang="scss" scoped>
  .run {
    border: 2px solid rgba(0, 0, 0, 0.2);
  }
</style>
