<template>
	<div class="month">
		<Separator @click="toggle">{{monthName}}</Separator>
		<div v-if="open" v-for="show in shows" :key="show.id">
			<Show ref="show" :show="show" />
		</div>
	</div>
</template>

<script>
import { parse, format } from 'date-fns';
import Show from '@/components/show/list/Show.vue';
import Separator from '@/components/Separator.vue';

export default {
	components: { Show, Separator },
	props: {
		shows: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			open: true
		};
	},
	computed: {
		monthName() {
			const firstShow = this.shows[0];
			const date = parse(firstShow.startDate);
			return format(date, 'MMMM');
		}
	},
	mounted() {
		const allShowsPast = this.$refs.show.every(show => show.isInPast);
		if (allShowsPast) {
			this.open = false;
		}
	},
	methods: {
		toggle() {
			this.open = !this.open;
		}
	}
};
</script>

<style lang="scss" scoped>
	.month /deep/ .sep {
		cursor: pointer;

		&:hover {
			background-color: #eee;
		}
	}
</style>
