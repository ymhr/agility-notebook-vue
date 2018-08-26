<template>
	<div class="rosette">
		<div class="content">
			<slot />
		</div>
		<div class="tail"></div>
	</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
	.rosette {
		border-radius: 1000px;
		transition: all 0.3s;
		background-color: #fff;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3px solid red;

		.content {
			font-size: 20px;
		}

		&:hover {
			transform: scale(1.2) rotate(30deg);
		}
	}
</style>
