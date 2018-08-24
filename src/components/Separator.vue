<template>
	<div class="sep" @click="$emit('click')">
		<span><slot /></span>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
	.sep {
		text-transform: uppercase;
		display: flex;
		align-items: center;

		&:before, &:after {
			content: '';
			display: block;
			border-top: 3px solid #ccc;
			width: 100%;
		}

		span {
			padding: 10px;
			font-size: 18px;
		}
	}
</style>
