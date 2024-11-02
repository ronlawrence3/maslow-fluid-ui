<template>
    <div class="scrolling-textarea">
        <textarea v-model="text" :rows="20" />
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const text = computed(() => store.state.websocket.data.join('\n'));

        return { text };
    },
};
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