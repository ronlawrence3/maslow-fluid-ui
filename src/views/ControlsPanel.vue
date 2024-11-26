<template>
    <Card>
        <template #content>
            <GcodeButton command="$CMD" icon="list">Commands</GcodeButton>
            <GcodeButton command="$A" icon="exclamation-circle">Alarm codes</GcodeButton>
            <GcodeButton command="$E" icon="exclamation-triangle">Error codes</GcodeButton>
            <GcodeButton command="$CMP" icon="angle-double-down">Release Tension</GcodeButton>
            <GcodeButton command="$TKSLK" icon="arrows-v">Take Slack</GcodeButton>
        </template>
    </Card>
</template>

<script setup lang="ts">
import GcodeButton from '../components/GcodeButton.vue';
import { useStore } from 'vuex';

import Card from 'primevue/card';

const store = useStore();


</script>