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
        <!-- <div style="flex: 1;">
            <Accordion>
                <AccordionPanel>
                    <AccordionHeader>
                        Debugging, proving out comms:
                    </AccordionHeader>
                    <AccordionContent>
                        <debug-store></debug-store>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import GcodeDisplay from './GcodeDisplay.vue';
import SendCommand from './SendCommand.vue';
import WebsocketLog from './WebsocketLog.vue';
import ControlsPanel from './ControlsPanel.vue';
// import DebugStore from './DebugStore.vue';
// import Button from 'primevue/button'
// import Accordion from 'primevue/accordion';
// import AccordionPanel from 'primevue/accordionpanel';
// import AccordionHeader from 'primevue/accordionheader';
// import AccordionContent from 'primevue/accordioncontent';

</script>
