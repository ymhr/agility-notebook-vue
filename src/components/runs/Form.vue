<template>
  <div v-if="loading">Loading...</div>
  <v-form v-else>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <Separator>Booked run</Separator>
          <DogSelector v-model="model.dogId" />
          <HandlerSelector v-model="model.handlerOverride" />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-text-field type="number" label="Class number" v-model="model.classNumber" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Judge" v-model="model.judge" />
        </v-flex>
        <v-flex xs12 md4>
          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              label="Run date"
              prepend-icon="event"
              readonly
              v-model="model.date"
            />
            <v-date-picker
              v-model="model.date"
              :max="show.endDate"
              :min="show.startDate"
              scrollable
            />
          </v-menu>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-select
            :items="classTypes"
            item-text="label"
            item-value="value"
            label="Class type"
            v-model="model.type"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            label="Type of special class"
            v-model="model.specialType"
            :disabled="model.type !== 'special'"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-select
            :items="gradedOrCombined"
            item-text="label"
            item-value="value"
            label="Graded or combined"
            v-model="model.gradeType"
          />
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field label="Grade" v-model="model.grade" />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field label="Grade at the time" v-model="model.currentGrade" />
        </v-flex>
      </v-layout>

      <Separator>Running order for run</Separator>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-text-field label="Ring number" v-model="model.ringNumber" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Running order" v-model="model.runningOrder" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field type="number" label="Class size" v-model="model.classSize" />
        </v-flex>
      </v-layout>

      <Separator>After run</Separator>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-text-field label="Course length" v-model="model.courseLength" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Course time" v-model="model.courseTime" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Winning time" v-model="model.winningTime" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field type="number" label="Your place" v-model="model.place" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Faults" v-model="model.faults" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Your time" v-model="model.runTime" />
        </v-flex>
      </v-layout>
      <v-btn block color="success" @click="submit">Save</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import Separator from '@/components/Separator.vue';
import DogSelector from '@/components/dogs/Selector.vue';
import HandlerSelector from '@/components/handlers/Selector.vue';

export default {
	components: { Separator, DogSelector, HandlerSelector },
	props: {
		run: {
			type: Object,
			default: () => ({})
		}
	},
	// data() {
	// 	return {
	// 		model: this.generateModel()
	// 	};
	// },
	computed: {
		model() {
			return this.generateModel();
		},
		classTypes() {
			return [
				{ label: 'Agility', value: 'agility' },
				{ label: 'Jumping', value: 'jumping' },
				{ label: 'Special', value: 'special' }
			];
		},
		gradedOrCombined() {
			return [
				{ label: 'Graded', value: 'graded' },
				{ label: 'Combined', value: 'combined' }
			];
		},
		showId() {
			return this.$route.params.showId;
		},
		show() {
			return this.$store.getters['shows/byId'](this.showId);
		},
		loading() {
			return this.$store.getters['shows/loading'];
		}
	},
	mounted() {
		this.$store.dispatch('shows/loadShows');
	},
	methods: {
		submit() {
			this.$emit('saved', this.model);
		},
		generateModel() {
			return {
				classNumber: this.run.classNumber || null,
				classSize: this.run.classSize || null,
				clear: this.run.clear || false,
				courseLength: this.run.courseLength || null,
				courseTime: this.run.courseTime || null,
				currentGrade: this.run.currentGrade || null,
				date: this.run.date || null,
				dogId: this.run.dogId || null,
				eliminated: this.run.eliminated || false,
				faults: this.run.faults || null,
				grade: this.run.grade || null,
				gradeType: this.run.gradeType || null,
				handlerOverride: this.run.handlerOverride || null,
				judge: this.run.judge || null,
				notes: this.run.notes || null,
				place: this.run.place || null,
				ringNumber: this.run.ringNumber || null,
				runTime: this.run.runTime || null,
				runningOrder: this.run.runningOrder || null,
				showId: this.run.showId || this.showId || null,
				specialType: this.run.specialType || null,
				type: this.run.type || null,
				winningTime: this.run.winningTime || null
			};
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
