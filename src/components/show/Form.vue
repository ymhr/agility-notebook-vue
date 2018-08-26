<template>
	<v-form @submit.prevent="submit">
		<input type="hidden" v-model="model.id">
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
						:max="model.startDate"
						scrollable
					/>
				</v-menu>
			</v-flex>
		</v-layout>

		<v-layout row>
			<v-flex xs6 sm2>
				<v-checkbox
					label="Booked?"
					v-model="model.bookedIn"
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
	props: {
		show: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			dates: {
				startDate: false,
				endDate: false,
				closingDate: false
			},
			model: this.generateModel()
		};
	},
	watch: {
		show() {
			this.model = this.generateModel();
		}
	},
	methods: {
		submit() {
			this.$emit('saved', this.model);
		},
		generateModel() {
			return {
				id: this.show.id || undefined,
				name: this.show.name || '',
				postcode: this.show.postcode || '',
				notes: this.show.notes || '',
				startDate: this.show.startDate || '',
				endDate: this.show.endDate || '',
				closingDate: this.show.closingDate || '',
				bookedIn: this.show.bookedIn || false,
				paid: this.show.paid || false,
				hotelNeeded: this.show.hotelNeeded || false,
				hotelBooked: this.show.hotelBooked || false,
				holidayNeeded: this.show.holidayNeeded || false,
				holidayBooked: this.show.holidayBooked || false,
				campingRequired: this.show.campingRequired || false,
				campingBooked: this.show.campingBooked || false,
				campingConfirmed: this.show.campingConfirmed || false,
				bookingPlatform: this.show.bookingPlatform || ''
			};
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
