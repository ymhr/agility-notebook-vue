<template>
	<v-form @submit.prevent="submit">
		<v-text-field
			v-model="model.name"
			label="Name"
		/>
		<v-text-field
			v-model="model.postcode"
			label="Postcode"
		/>
		<v-text-field
			v-model="model.bookingPlatform"
			label="Booking platform"
		/>
		<v-layout row>
			<v-flex sm4 xs12>
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
						v-model="model.startDate"
						label="Start date"
						prepend-icon="event"
						readonly
					/>
					<v-date-picker
						v-model="model.startDate"
						:min="model.endDate"
						scrollable
					/>
				</v-menu>
			</v-flex>
			<v-flex sm4 xs12>
				<v-menu
					:close-on-content-click="false"
					v-model="dates.endDate"
					:nudge-right="40"
					lazy
					transition="scale-transition"
					offset-y
					full-width
					min-width="290px"
				>
					<v-text-field
						slot="activator"
						v-model="model.endDate"
						label="End date"
						prepend-icon="event"
						readonly
					/>
					<v-date-picker
						v-model="model.endDate"
						:min="model.startDate"
						scrollable
					/>
				</v-menu>
			</v-flex>
			<v-flex sm4 xs12>
				<v-menu
					:close-on-content-click="false"
					v-model="dates.closingDate"
					:nudge-right="40"
					lazy
					transition="scale-transition"
					offset-y
					full-width
					min-width="290px"
				>
					<v-text-field
						slot="activator"
						v-model="model.closingDate"
						label="Closing date"
						prepend-icon="event"
						readonly
					/>
					<v-date-picker
						v-model="model.closingDate"
						:min="model.startDate"
						:max="model.endDate"
						scrollable
					/>
				</v-menu>
			</v-flex>
		</v-layout>

		<v-layout row>
			<v-flex xs6 sm2>
				<v-checkbox
					label="Booked?"
					v-model="model.booked"
				/>
			</v-flex>
			<v-flex xs6 sm2>
				<v-checkbox
					label="Paid?"
					v-model="model.paid"
				/>
			</v-flex>
		</v-layout>

		<v-layout row>
			<v-flex xs6 sm2>
				<v-checkbox
					label="Hotel needed?"
					v-model="model.hotelNeeded"
				/>
			</v-flex>
			<v-flex xs6 sm2>
				<v-checkbox
					v-if="model.hotelNeeded"
					label="Hotel booked?"
					v-model="model.hotelBooked"
				/>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs6 sm2>
				<v-checkbox
					label="Holiday needed?"
					v-model="model.holidayNeeded"
				/>
			</v-flex>
			<v-flex xs6>
				<v-checkbox
					v-if="model.holidayNeeded"
					label="Holiday booked?"
					v-model="model.holidayBooked"
				/>
			</v-flex>
		</v-layout>

		<v-layout row>
			<v-flex xs4 sm2>
				<v-checkbox
					label="Camping needed?"
					v-model="model.campingRequired"
				/>
			</v-flex>
			<v-flex xs4 sm2>
				<v-checkbox
					v-if="model.campingRequired"
					label="Camping booked?"
					v-model="model.campingBooked"
				/>
			</v-flex>
			<v-flex xs4>
				<v-checkbox
					v-if="model.campingBooked"
					label="Camping confirmed?"
					v-model="model.campingConfirmed"
				/>
			</v-flex>
		</v-layout>

		<v-textarea
			v-model="model.notes"
			label="Notes"
			auto-grow
		/>

		<v-btn block color="success" dark @click="submit">Save</v-btn>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			dates: {
				startDate: false,
				endDate: false,
				closingDate: false
			},
			model: {
				name: '',
				postcode: '',
				notes: '',
				startDate: '',
				endDate: '',
				closingDate: '',
				booked: false,
				paid: false,
				hotelNeeded: false,
				hotelBooked: false,
				holidayNeeded: false,
				holidayBooked: false,
				campingRequired: false,
				campingBooked: false,
				campingConfirmed: false,
				bookingPlatform: ''
			}
		};
	},
	methods: {
		submit() {
			this.$emit('saved', this.model);
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
