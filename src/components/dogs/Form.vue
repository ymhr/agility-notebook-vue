<template>
  <v-form @submit.prevent="submit">
    <v-container fluid>
      <input type="hidden" v-model="model.id" />
      <v-text-field v-model="model.name" label="Name" />
      <v-layout row wrap>
        <v-flex md6 xs12>
          <v-text-field v-model="model.officialName" label="KC Name" />
        </v-flex>
        <v-flex md6 xs12>
          <v-menu
            :close-on-content-click="false"
            v-model="dates.startDate"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="model.dateOfBirth"
              label="Date of birth"
              prepend-icon="event"
              readonly
            />
            <v-date-picker v-model="model.dateOfBirth" scrollable />
          </v-menu>
        </v-flex>
      </v-layout>
      <HandlerSelector v-model="model.handlerId" />

      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-text-field type="number" label="Grade" v-model="model.grade" />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Breed" v-model="model.breed" />
        </v-flex>
        <v-flex xs12 md4>
          <v-select
            label="Sex"
            :items="[{text: 'Dog', value: 'dog'}, {text: 'Bitch', value: 'bitch'}]"
            v-model="model.sex"
          />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6 sm6>
          <v-select
            label="Height"
            :items="[
              {text: 'Small', value: 'small'},
              {text: 'Medium', value: 'medium'},
              {text: 'Large', value: 'Large'}
            ]"
            v-model="model.height"
          />
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field label="KC Number" v-model="model.registeredNumber" />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6 sm2>
          <v-checkbox label="Lower height" v-model="model.lowerHeight" />
        </v-flex>
        <v-flex xs6 sm2>
          <v-checkbox label="Not for competition" v-model="model.notForCompetition" />
        </v-flex>
      </v-layout>

      <v-textarea v-model="model.notes" label="Notes" auto-grow />

      <v-btn block color="success" dark @click="submit">Save</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import HandlerSelector from '@/components/handlers/Selector.vue';

export default {
	components: { HandlerSelector },
	props: {
		dog: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			dates: {
				dateOfBirth: false
			},
			model: this.generateModel()
		};
	},
	watch: {
		dog() {
			this.model = this.generateModel();
		}
	},
	methods: {
		submit() {
			this.$emit('saved', this.model);
		},
		generateModel() {
			return {
				id: this.dog.id || undefined,
				name: this.dog.name || '',
				officialName: this.dog.officialName || '',
				handlerId: this.dog.handlerId || null,
				dateOfBirth: this.dog.dateOfBirth || '',
				grade: this.dog.grade || '',
				breed: this.dog.breed || '',
				sex: this.dog.sex || '',
				height: this.dog.height || '',
				lowerHeight: this.dog.lowerHeight || false,
				registeredNumber: this.dog.registeredNumber || '',
				notForCompetition: this.dog.notForCompetition || false,
				notes: this.dog.notes || ''
			};
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
