<template>
  <div class="month">
    <ExpandPanel :initialState="!allShowsInPast">
      <template #activator="{open, icon}">
        <Separator>
          {{monthName}}
          <v-icon>{{icon}}</v-icon>
        </Separator>
      </template>
      <div v-for="show in shows" :key="show.id">
        <Show ref="show" :show="show" />
      </div>
    </ExpandPanel>
  </div>
</template>

<script>
import { parse, format } from 'date-fns';
import Show from '@/components/show/list/Show.vue';
import Separator from '@/components/Separator.vue';
import ExpandPanel from '@/components/ExpandPanel.vue';

export default {
	components: { Show, Separator, ExpandPanel },
	props: {
		shows: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			open: true
		};
	},
	computed: {
		monthName() {
			const firstShow = this.shows[0];
			const date = parse(firstShow.startDate);
			return format(date, 'MMMM');
		},
		allShowsInPast() {
			return this.shows.every(show => this.$store.getters['shows/isShowInPast'](show.id));
		}
	}
};
</script>

<style lang="scss" scoped>
  .month /deep/ .sep {
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
</style>
