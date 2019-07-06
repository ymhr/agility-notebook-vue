<template>
  <div class="dog">
    <v-btn
      class="edit-button"
      color="secondary"
      fab
      absolute
      right
      small
      :to="{name: 'editDog', params: {id: dog.id}}"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <h2>{{dog.name}}</h2>
    <ItemDetails :item="dog" :properties="{ grade: { label: 'Grade' } }" />
  </div>
</template>

<script>
import ItemDetails from '@/components/ItemDetails.vue';

export default {
	components: { ItemDetails },
	props: {
		dog: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
  .dog {
    position: relative;
    padding: 20px;
    background-color: #eee;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s;

    h2 {
      font-size: 18px;
      font-weight: normal;
    }

    &:hover {
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }

  .edit-button {
    float: right;
  }
</style>
