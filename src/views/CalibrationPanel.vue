<template>
    <Card>
        <template #content>
            <GcodeButton command="$CMP" icon="angle-double-down">Release Tension</GcodeButton>
            <GcodeButton command="$ALL" icon="arrow-down-left-and-arrow-up-right-to-center">
                Retract
            </GcodeButton>
            <GcodeButton command="$EXT" icon="arrow-up-right-and-arrow-down-left-from-center">
                Extend
            </GcodeButton>
            <GcodeButton command="$TKSLK" icon="arrows-v">Slack</GcodeButton>
            <GcodeButton command="$CAL" icon="cog">Calibration</GcodeButton>
        </template>
    </Card>
</template>

<script setup lang="ts">
import GcodeButton from '../components/GcodeButton.vue';

import Card from 'primevue/card';

</script>