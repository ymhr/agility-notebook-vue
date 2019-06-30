<template>
  <div>
    <div @click="toggle">
      <slot name="activator" v-bind="{ open, icon }" />
    </div>
    <transition name="slide" @enter="enter" @afterEnter="afterEnter" @leave="leave">
      <div v-if="open" class="expand-container">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
	props: {
		initialState: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			open: this.initialState
		};
	},
	computed: {
		icon() {
			return this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
		}
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
		enter(element) {
			// https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
			const { width } = getComputedStyle(element);
			element.style.width = width;
			element.style.position = 'absolute';
			element.style.visibility = 'hidden';
			element.style.height = 'auto';

			const { height } = getComputedStyle(element);

			element.style.width = null;
			element.style.position = null;
			element.style.visibility = null;
			element.style.height = 0;

			// eslint-disable-next-line
			getComputedStyle(element).height;

			setTimeout(() => {
				element.style.height = height;
			});
		},
		afterEnter(element) {
			element.style.height = 'auto';
		},
		leave(element) {
			const { height } = getComputedStyle(element);
			element.style.height = height;

			// eslint-disable-next-line
			getComputedStyle(element).height;

			setTimeout(() => {
				element.style.height = 0;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
  * {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
    overflow: hidden;
  }

  .slide-enter,
  .slide-leave-to {
    height: 0;
  }
</style>
