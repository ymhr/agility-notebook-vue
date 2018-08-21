<template>
    <div class="run">
        <h2>{{run.date}}</h2>
    </div>
</template>

<script>
export default {
    props: {
        run: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .run {
        padding: 20px;
        background-color: #eee;
    }
</style>
