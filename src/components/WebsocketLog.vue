<template>
    <div class="scrolling-textarea">
        <v-textarea v-model="text" :rows="20" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { CommandResult, TimeSequencedLine } from '../store/modules/fluidWebsocket';

export default defineComponent({
    setup() {
        const store = useStore();

        const text = computed(() => {
            console.log('computed', store);
            return store.state.websocket.commandHistory
              .map(
                (commandHistory:CommandResult) =>
                  commandHistory.response
                    .map((tl:TimeSequencedLine)=> tl.line).join('\n')).join('\n');
        })
        return {
          text
        }
    },
    watch: {
        text: () => {
            setTimeout(() => {
                const textarea = document.querySelector('.scrolling-textarea textarea');
                console.log('text changed', textarea?.scrollHeight);
                if (textarea) {
                    textarea.scrollTo(0, textarea.scrollHeight + 50);
             }
            }, 50);
        }
    },
    methods: {
    },
});

</script>

<style scoped>
.scrolling-textarea textarea {
    padding: 0.5rem;
    border: none;
    resize: vertical;
    width: 600px;
    background-color: darkslategray;
}

.scrolling-textarea textarea::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrolling-textarea textarea::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>