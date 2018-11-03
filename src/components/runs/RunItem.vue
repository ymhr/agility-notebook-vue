<template>
	<div v-if="!loading" class="run">
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

		<div>{{dog.name}}</div>
		<div>{{handler.name}}</div>
	</div>
	<div v-else>Loading...</div>
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
		},
		dog() {
			return this.$store.getters['dogs/byId'](this.run.dogId);
		},
		handler() {
			if (this.run.handlerOverride) return this.$store.getters['handlers/byId'](this.run.handlerOverride);
			return this.$store.getters['handlers/byId'](this.dog.handlerId);
		},
		loading() {
			return this.$store.getters['dogs/loading'] || this.$store.getters['handlers/loading'];
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
		transition: all 0.3s ease;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);

		.edit {
			display: none;
		}

		&:hover {
			box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);

			.edit {
				display: block;
				float: right;
			}
		}
	}
</style>
