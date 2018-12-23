<template>
  <div>{{id}}</div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return { id: 'Failed' };
    },
    async asyncData({ params }) {
        return { id: params.id };
    }
};
</script>

<style scoped>
</style>