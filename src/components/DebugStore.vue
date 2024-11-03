<template>
    <div>
        Store data:
        <pre>
        {{ data }}
    </pre>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const data = computed(() => JSON.stringify(store.state, null, 2));

        return { data };
    },
};
</script>
