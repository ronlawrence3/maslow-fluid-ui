<template>
    <v-app class="container">
        <v-container fluid>
            <v-row>
                <v-col cols="6">
                    <gcode-display></gcode-display>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12">
                            <send-command></send-command>
                        </v-col>
                        <v-col cols="12">
                            <websocket-log></websocket-log>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Debugging...">
                            <v-expansion-panel-text>
                                Debugging, proving out comms:
                                <debug-store></debug-store>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script lang="ts">
import GcodeDisplay from './GcodeDisplay.vue';
import SendCommand from './SendCommand.vue';
import WebsocketLog from './WebsocketLog.vue';
import DebugStore from './DebugStore.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        GcodeDisplay,
        SendCommand,
        WebsocketLog,
        DebugStore
    }
});
</script>
