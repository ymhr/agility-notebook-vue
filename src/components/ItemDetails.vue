<template>
	<div>
		<div v-for="name in propertyNames" :key="name" class="value-wrapper">
			<div class="value">
				<strong>{{getPropertyLabel(name)}}</strong>:
				<span v-if="getPropertyValue(name) === true">
					<v-icon>done</v-icon>
				</span>
				<span v-else-if="getPropertyValue(name) === false">
					<v-icon>clear</v-icon>
				</span>
				<span v-else>
					{{getPropertyValue(name)}}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		properties: {
			type: Object,
			required: true
		}
	},
	computed: {
		propertyNames() {
			return Object.keys(this.properties);
		}
	},
	methods: {
		getPropertyMeta(name) {
			return this.properties[name];
		},
		getPropertyValue(name) {
			const meta = this.getPropertyMeta(name);

			if (meta.count) {
				if (this.item[name]) {
					return this.item[name].length;
				}
				return 0;
			}

			return this.item[name];
		},
		getPropertyLabel(name) {
			const meta = this.getPropertyMeta(name);
			return meta.label || name;
		}
	}
};
</script>

<style lang="scss" scoped>
	.value-wrapper {
		display: inline-block;

		.value {
			margin:5px;
			padding: 5px;
			background-color: #eee;
		}
	}
</style>
