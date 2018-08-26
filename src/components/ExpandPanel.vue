<template>
	<div>
		<div @click="toggle" class="test">
			<slot name="activator" />
		</div>
		<div v-if="open">
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			open: true
		};
	},
	methods: {
		toggle() {
			this.open = !this.open;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
