<template>
	<v-form>
		<v-container fluid>
			<v-layout row>
				<v-flex xs12>
					<Separator>Booked run</Separator>
					<div>DOG SELECTOR</div>
					<div>HANDLER SELECTOR</div>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md4>
					<v-text-field type="number" label="Class number" />
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field label="Judge" />
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
						/>
						<v-date-picker
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
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Type of special class"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-select
						:items="gradedOrCombined"
						item-text="label"
						item-value="value"
						label="Class type"
					/>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex xs12 md6>
					<v-text-field
						label="Grade"
					/>
				</v-flex>
				<v-flex xs12 md6>
					<v-text-field
						label="Grade at the time"
					/>
				</v-flex>
			</v-layout>

			<Separator>Running order for run</Separator>
			<v-layout row wrap>
				<v-flex xs12 md4>
					<v-text-field
						label="Ring number"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Running order"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						type="number"
						label="Class size"
					/>
				</v-flex>
			</v-layout>

			<Separator>After run</Separator>
			<v-layout row wrap>
				<v-flex xs12 md4>
					<v-text-field
						label="Course length"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Course time"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Winning time"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						type="number"
						label="Your place"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Faults"
					/>
				</v-flex>
				<v-flex xs12 md4>
					<v-text-field
						label="Your time"
					/>
				</v-flex>
			</v-layout>
		</v-container>
	</v-form>
</template>

<script>
import Separator from '@/components/Separator.vue';

export default {
	components: { Separator },
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
