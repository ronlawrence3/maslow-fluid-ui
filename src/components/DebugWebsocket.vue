<template>
    <div>
        {{ ws }}
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const ws = ref(null as any);
        const store = useStore();

        onMounted(async () => {
            ws.value = JSON.stringify(await store.dispatch('connectWebSocket'));
        });

        return { ws };
    },
};
</script>
