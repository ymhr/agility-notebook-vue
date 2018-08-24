<template>
	<ItemDetails :item="show" :properties="detailsToShow" />
</template>

<script>
import ItemDetails from '@/components/ItemDetails.vue';

export default {
	components: { ItemDetails },
	props: {
		showId: {
			type: [Number, String],
			required: true
		}
	},
	computed: {
		show() {
			return this.$store.getters['shows/byId'](this.showId);
		},
		detailsToShow() {
			return {
				runs: {
					count: true,
					label: 'Runs'
				},
				bookingPlatform: {
					label: 'Booking platform'
				},
				booked: {
					label: 'Booked'
				},
				paid: {
					label: 'Paid'
				},
				hotelNeeded: {
					label: 'Hotel needed'
				},
				hotelBooked: {
					label: 'Hotel booked'
				},
				holidayNeeded: {
					label: 'Holiday needed'
				},
				holidayBooked: {
					label: 'Holiday booked'
				},
				campingNeeded: {
					label: 'Camping needed'
				},
				campingBooked: {
					label: 'Camping booked'
				},
				campingConfirmed: {
					label: 'Camping confirmed'
				}
			};
		}
	}
};
</script>

<style>

</style>
