<template>
    <div class="dog">
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
}
</script>

<style lang="scss" scoped>
    .dog {
        padding: 20px;
        background-color: #eee;
        margin-bottom: 10px;
        cursor: pointer;
        box-shadow: 0 0 0 0 rgba(0, 0, 0 , 0);
        transition: box-shadow 0.3s;

        h2 {
            font-size: 18px;
            font-weight: normal;
        }

        &:hover {
            box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.3);
        }
    }
</style>
