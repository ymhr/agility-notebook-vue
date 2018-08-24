<template>
	<div>
		<div class="show" :class="{open: expanded, past: isInPast}" @click="goToShow">
			<v-layout row>
				<v-flex xs11>
					<h2>{{show.name}}</h2>
					<div class="dates">
						<span class="start">{{startDate}}</span> - <span class="end">{{endDate}}</span>
					</div>
				</v-flex>

				<v-flex xs1 justify-center align-center>
					<div class="expand" @click.stop.prevent="expand">
						<v-icon right>{{icon}}</v-icon>
					</div>
				</v-flex>
			</v-layout>
		</div>

		<div class="details" v-if="expanded">
			<v-layout row>
				<v-flex xs12>
					<ItemDetails :item="show" :properties="detailsToShow" />
				</v-flex>
			</v-layout>
		</div>
	</div>
</template>

<script>
import { parse, format } from 'date-fns';
import ItemDetails from '@/components/ItemDetails.vue';

export default {
	components: { ItemDetails },
	props: {
		show: {
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
		icon() {
			return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
		},
		startDate() {
			return format(parse(this.show.startDate), 'Do MMM YYYY');
		},
		endDate() {
			return format(parse(this.show.endDate), 'Do MMM YYYY');
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
		},
		isInPast() {
			return this.$store.getters['shows/isShowInPast'](this.show.id);
		}
	},
	methods: {
		expand() {
			this.expanded = !this.expanded;
		},
		goToShow() {
			this.$router.push({ name: 'show', params: { showId: this.show.id } });
		}
	}
};
</script>

 <style lang="scss" scoped>
	.show {
		padding: 20px;
		background-color: #eee;
		margin-bottom: 10px;
		cursor: pointer;

		&.past {
			transition: opacity 0.3s;
			opacity: 0.5;

			&:hover {
				opacity: 1;
			}
		}

		h2 {
			font-size: 18px;
			font-weight: normal;
		}

		&.open {
			margin-bottom: 0;
		}

		.expand {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100;
			cursor: pointer;
			height: 100%;
		}
	}

	.details {
		padding: 20px;
		background-color: transparent;
		margin-bottom: 10px;
	}
</style>
