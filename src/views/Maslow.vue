<template>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <div style="flex: 1; display: flex;">
            <div style="flex: 1;">
                <GcodeDisplay></GcodeDisplay>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1;">
                    <ControlsPanel></ControlsPanel>
                </div>
                <div style="flex: 1;">
                    <SendCommand></SendCommand>
                </div>
                <div style="flex: 1;">
                    <WebsocketLog></WebsocketLog>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GcodeDisplay from './GcodeDisplay.vue';
import SendCommand from '../components/SendCommand.vue';
import WebsocketLog from '../components/WebsocketLog.vue';
import ControlsPanel from './ControlsPanel.vue';

</script>
