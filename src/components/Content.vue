<script setup>

const props = defineProps({
    // create a prop to handle either a vue component or an html element
    component: {
        type: [Object, String],
        required: true
    },
});

</script>

<template>

    <div class="content">
        <component :is="component" />
    </div>

</template>