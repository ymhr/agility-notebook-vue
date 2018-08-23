<template>
	<div>
		<div class="show" :class="{open: expanded}" @click="goToShow">
			<v-layout row>
				<v-flex xs11>
					<h2>{{show.name}}</h2>
				</v-flex>

				<v-flex xs1 justify-center align-center>
					<div class="expand" @click.stop.prevent="expand">
						<v-icon right>{{icon}}</v-icon>
					</div>
				</v-flex>
			</v-layout>
		</div>

		<div class="details" v-if="expanded">
			<v-layout row>
				<v-flex xs12>
					test
				</v-flex>
			</v-layout>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			expanded: false
		};
	},
	computed: {
		icon() {
			return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
		}
	},
	methods: {
		expand() {
			this.expanded = !this.expanded;
		},
		goToShow() {
			this.$router.push({ name: 'show', params: { showId: this.show.id } });
		}
	}
};
</script>

 <style lang="scss" scoped>
	.show {
		padding: 20px;
		background-color: #eee;
		margin-bottom: 10px;

		h2 {
			font-size: 18px;
			font-weight: normal;
		}

		&.open {
			margin-bottom: 0;
		}

		.expand {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100;
			cursor: pointer;
		}
	}

	.details {
		padding: 20px;
		background-color: transparent;
		margin-bottom: 10px;
	}
</style>
