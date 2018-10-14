<template>
	<v-form>
		<v-container fluid>
			<v-layout row>
				<v-flex xs12>
					<Separator>Booked run</Separator>
					<DogSelector v-model="model.dog" />
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
					<v-text-field
						label="Grade"
						v-model="model.grade"
					/>
				</v-flex>
				<v-flex xs12 md6>
					<v-text-field
						label="Grade at the time"
						v-model="model.currentGrade"
					/>
				</v-flex>
			</v-layout>

			<Separator>Running order for run</Separator>
			<v-layout row wrap>
				<v-flex xs12 md4>
					<v-text-field
						label="Ring number"
						v-model="model.ringNumber"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Running order"
						v-model="model.runningOrder"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						type="number"
						label="Class size"
						v-model="model.classSize"
					/>
				</v-flex>
			</v-layout>

			<Separator>After run</Separator>
			<v-layout row wrap>
				<v-flex xs12 md4>
					<v-text-field
						label="Course length"
						v-model="model.courseLength"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Course time"
						v-model="model.courseTime"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Winning time"
						v-model="model.winningTime"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						type="number"
						label="Your place"
						v-model="model.place"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Faults"
						v-model="model.faults"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Your time"
						v-model="model.runTime"
					/>
				</v-flex>
			</v-layout>
			<v-btn block color="success">Save</v-btn>
		</v-container>
	</v-form>
</template>

<script>
import Separator from '@/components/Separator.vue';
import DogSelector from '@/components/dogs/Selector.vue';
import HandlerSelector from '@/components/handlers/Selector.vue';

export default {
	components: { Separator, DogSelector, HandlerSelector },
	data() {
		return {
			model: {
				classNumber: null,
				classSize: null,
				clear: false,
				courseLength: null,
				courseTime: null,
				currentGrade: null,
				date: null,
				dogId: null,
				eliminated: false,
				faults: null,
				grade: null,
				gradeType: null,
				handlerOverride: null,
				judge: null,
				notes: null,
				place: null,
				ringNumber: null,
				runTime: null,
				runningOrder: null,
				showId: null,
				specialType: null,
				type: null,
				winningTime: null
			}
		};
	},
	computed: {
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
				{ label: 'Jumping', value: 'jumping' }
			]
		}
	}
};
</script>

<style lang="scss" scoped>
	.form {
		padding: 20px;
	}
</style>
