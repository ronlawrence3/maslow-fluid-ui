<template>
    <div>
        Store data:
        <pre>
        {{ data }}
    </pre>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const data = computed(() => JSON.stringify(store.state, null, 2));

</script>
