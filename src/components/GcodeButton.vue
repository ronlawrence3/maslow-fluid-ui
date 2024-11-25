<template>
    <Button @click="doClick">
        {{ props.label ? props.label : props.command }}
    </Button>
</template>


<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Button from 'primevue/button';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    command: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
})


const doClick = () => {
    store.dispatch('sendGrblCommand', props.command);
}


</script>