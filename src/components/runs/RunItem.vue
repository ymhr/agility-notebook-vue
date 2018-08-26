<template>
	<div class="run">
		<v-btn
			class="edit"
			small
			fab
			absolute
			top
			right
		>
			<v-icon>edit</v-icon>
		</v-btn>

		<h2>{{title}}</h2>
		<h3>{{date}}</h3>

		<div>DOG</div>
		<div>HANDLER</div>
	</div>
</template>

<script>
import Rosette from '@/components/Rosette.vue';
import { parse, format } from 'date-fns';

export default {
	components: { Rosette },
	props: {
		run: {
			type: Object,
			required: true
		}
	},
	computed: {
		title() {
			return [
				this.run.classNumber ? `Class #${this.run.classNumber}` : null,
				this.run.type,
				this.run.gradeType,
				this.run.grade ? `Grade ${this.run.grade}` : null
			]
				.filter(item => item)
				.join(', ');
		},
		date() {
			return format(parse(this.run.date), 'Do MMMM YYYY');
		}
	}
};
</script>

<style lang="scss" scoped>
	.run {
		padding: 20px;
		background-color: #eee;
		margin-bottom: 20px;
		position: relative;

		.edit {
			display: none;
		}

		&:hover .edit {
			display: block;
			float: right;
		}
	}
</style>
