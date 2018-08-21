<template>
	<header>
		<div class="title">
			<h1>Agility Notebook</h1>
		</div>
	</header>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';

export default {
	components: { Navigation }
};
</script>

<style scoped>
	.title {
		height: 100px;
		display: flex;
		align-items: center;
	}
</style>
