<template>
    <Button @click="doClick">
        <template v-if="props.icon">
            <i :class="`pi pi-${props.icon}`"></i>
        </template>
        <template v-if="!props.icon">
            <i class="pi pi-dot"></i>
        </template>
        <template v-if="props.label">
            {{ props.label ? props.label : props.command }}
        </template>
        <template v-if="!props.label">
            <slot></slot>
        </template>
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
    icon: {
        type: String,
        default: ''
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