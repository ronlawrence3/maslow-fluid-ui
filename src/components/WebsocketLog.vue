<template>
    <div class="scrolling-textarea">
        <Textarea v-model="text" rows="20" />
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { CommandResult, TimeSequencedLine } from '../store/modules/fluidWebsocket';
import Textarea from 'primevue/textarea';


const store = useStore();

const text = computed(() => {
    return store.state.websocket.commandHistory
        .map(
            (commandHistory: CommandResult) =>
                commandHistory.command.line + '\n' + commandHistory.response
                    .map((tl: TimeSequencedLine) => tl.line).join('\n')).join('\n');
});

watch(text, () => {
    setTimeout(() => {
        const textarea = document.querySelector('.scrolling-textarea textarea');
        console.log('text changed', textarea?.scrollHeight);
        if (textarea) {
            textarea.scrollTo(0, textarea.scrollHeight + 50);
        }
    }, 50);
})
</script>

<style scoped>
.scrolling-textarea textarea {
    padding: 0.5rem;
    border: none;
    resize: vertical;
    width: 100%;
    background-color: lightcyan;
}

.scrolling-textarea textarea::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrolling-textarea textarea::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>