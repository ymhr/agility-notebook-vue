<template>
	<v-container fluid fill-height>
		<v-layout row>
			<v-flex xs12>
				<h1>New</h1>
				<Form />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import Form from '@/components/show/Form.vue';

export default {
	components: { Form }
};
</script>

<style>

</style>
