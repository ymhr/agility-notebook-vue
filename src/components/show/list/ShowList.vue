<template>
	<div>
		<Month v-for="month in monthNames" :key="month" :shows="months[month]"/>
	</div>
</template>

<script>
import Month from '@/components/show/list/Month.vue';

export default {
	components: { Month },
	props: {
		months: {
			type: Object,
			required: true
		}
	},
	computed: {
		monthNames() {
			return Object.keys(this.months);
		}
	}
};
</script>

<style>

</style>
