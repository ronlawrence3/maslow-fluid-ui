<template>
    <Card>
        <template #content>
            <GcodeButton command="$CMD" label="Commands"></GcodeButton>
            <GcodeButton command="$A" label="Alarm codes"></GcodeButton>
            <GcodeButton command="$E" label="Error codes"></GcodeButton>
            <GcodeButton command="$ALL" label="Retract all"></GcodeButton>
            <GcodeButton command="$EXT" label="Extend all"></GcodeButton>
            <GcodeButton command="$CAL" label="Start Calibration"></GcodeButton>
            <GcodeButton command="$TKSLK" label="Apply Tension"></GcodeButton>
            <GcodeButton command="$CMP" label="Release Tension"></GcodeButton>
        </template>
    </Card>
</template>

<script setup lang="ts">
import GcodeButton from './GcodeButton.vue';
import { useStore } from 'vuex';

import Card from 'primevue/card';

const store = useStore();


</script>