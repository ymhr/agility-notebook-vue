<template>
  <v-flex md3 v-if="!loading">
    <v-card class="run" hover flat>
      <v-card-title primary-title v-if="title">
        <div>
          <h2 class="title">{{title}}</h2>
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{handler.name}} ran {{dog.name}}</div>
          <div></div>
        </div>
        <ExpandPanel ref="details" :initialState="false">
          <strong>Ring Details</strong>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Running Order</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.runningOrder}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Ring number</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.ringNumber}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Class Size</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.classSize}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Judge</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.judge}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Course Type</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.courseType}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Class Number</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.classNumber}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Course Time</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.courseTime}}</v-list-tile-content>
            </v-list-tile>
          </v-list>

          <strong>Your run</strong>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Your place</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.place}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Grade at the time</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.currentGrade}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Your time</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.time}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Faults</v-list-tile-content>
              <v-list-tile-content class="align-end">{{run.faults}}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </ExpandPanel>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" fab small flat :to="{name: 'editRun', params: { runId: id }}">
          <v-icon small>edit</v-icon>
        </v-btn>
        <v-btn absolute bottom right fab small color="secondary" class="expand" @click="expand">
          <v-icon v-if="expanded">keyboard_arrow_up</v-icon>
          <v-icon v-else>keyboard_arrow_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  <div v-else>Loading...</div>
</template>

<script>
import Rosette from '@/components/Rosette.vue';
import ExpandPanel from '@/components/ExpandPanel.vue';
import { parse, format } from 'date-fns';

export default {
	components: { Rosette, ExpandPanel },
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
			if (!dog) return { name: 'Unknown' };
			return dog;
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
			this.$refs.details.toggle();
		}
	}
};
</script>

<style lang="scss" scoped>
  .run {
    border: 2px solid rgba(0, 0, 0, 0.2) !important;
  }

  .expand {
    /* position: absolute; */
  }
</style>
