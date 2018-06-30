<template>
	<div>
		{{show.name}}
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Object,
			required: true
		}
	}
};
</script>

<style>

</style>
